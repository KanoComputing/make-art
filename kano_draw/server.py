# server.py
#
# Copyright (C) 2014-2015 Kano Computing Ltd.
# License: http://www.gnu.org/licenses/gpl-2.0.txt GNU GPL v2
#

import json
import os
import time
import logging

from flask import Flask, Response, request, send_from_directory

from kano_profile.apps import load_app_state_variable
from kano_profile.badges import increment_app_state_variable_with_dialog, \
    save_app_state_variable_with_dialog, calculate_xp
from kano_world.share_helpers import login_and_share
from kano.network import is_internet
from kano.utils.audio import play_sound
from kano.utils.file_operations import ensure_dir
from kano.logging import logger


APP_NAME = 'kano-draw'
PARENT_PID = None

CHALLENGE_DIR = os.path.expanduser('~/Draw-content')
WALLPAPER_DIR = os.path.join(CHALLENGE_DIR, 'wallpapers')
STATIC_ASSET_DIR = os.path.join(os.path.expanduser('~'),
                                '.make-art-assets')

# Create the directories if necessary
ensure_dir(CHALLENGE_DIR)
ensure_dir(WALLPAPER_DIR)
ensure_dir(STATIC_ASSET_DIR)

def _get_static_dir():
    '''
    Returns directory where http server content is located
    '''
    return '/usr/share/kano-draw'


def _get_image_from_str(img_str):
    '''
    Returns a base64 encoded data of the img_str image file.
    '''
    import base64

    image_b64 = img_str.split(',')[-1]
    image_data = base64.b64decode(image_b64)

    return image_data


def _save(data):
    '''
    Save the current creation in the user home directory
    '''
    filename = data['filename']
    try:
        desc = data['description']
    except KeyError:
        desc = ''
    code = data['code']
    image = _get_image_from_str(data['image'])

    filepath = os.path.join(CHALLENGE_DIR, '{}.draw'.format(filename))
    json_path = os.path.join(CHALLENGE_DIR, '{}.json'.format(filename))
    img_path = os.path.join(CHALLENGE_DIR, '{}.png'.format(filename))

    with open(filepath, 'w') as f:
        f.write(code)

    with open(json_path, 'w') as f:
        f.write(
            json.dumps({
                'filename': filename,
                'description': desc
            })
        )

    with open(img_path, 'wb') as f:
        f.write(image)

    return (filename, filepath)


# Start the http server now

server = Flask(__name__, static_folder=_get_static_dir(), static_url_path='/')
server_logger = logging.getLogger('werkzeug')
server_logger.setLevel(logging.ERROR)


# Server backend methods

@server.route('/')
# Return the homepage for pages routed through Angular
@server.route('/localLoad/<path:path>')
@server.route('/challenges')
@server.route('/playground')
def root(path=None):
    return server.send_static_file('index.html')


@server.route('/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return server.send_static_file(path)


@server.route("/challenge/local/<path:filename>", methods=['POST'])
def save_challenge(filename):
    data = json.loads(request.data)

    _save(data)

    return ''


@server.route("/challenge/local/<path:path>", methods=['GET'])
def load_challenge(path):
    directory, filename = os.path.split(path)

    return send_from_directory('/{}'.format(directory),
                               filename,
                               as_attachment=True)


@server.route("/challenge/local/wallpaper/<path:filename>", methods=['POST'])
def save_wallpaper(filename):
    data = json.loads(request.data)

    imgs = {
        '1024': _get_image_from_str(data['image_1024']),
        '4-3': _get_image_from_str(data['image_4_3']),
        '16-9': _get_image_from_str(data['image_16_9'])
    }

    img_path = os.path.join(
        WALLPAPER_DIR,
        '{filename}-{{ratio}}.png'.format(filename=filename)
    )

    for ratio, img_data in imgs.iteritems():
        with open(img_path.format(ratio=ratio), 'wb') as f:
            f.write(img_data)

    return ''


@server.route("/challenge/web/<path:filename>", methods=['POST'])
def share(filename):
    # TODO: Move this connection handling into a function in Kano Utils
    import subprocess

    if not is_internet():
        subprocess.call(['sudo', 'kano-settings', '4'])

    if not is_internet():
        return 'You have no internet'

    data = json.loads(request.data)
    filename, filepath = _save(data)
    success, msg = login_and_share(filepath, filename, APP_NAME)

    if not success:
        return msg

    increment_app_state_variable_with_dialog(APP_NAME, 'shared', 1)

    return ''


@server.route('/challenge/web', methods=['GET'])
def load_share():
    # TODO: Import kano-share python module and use return code instead
    import subprocess

    p = subprocess.Popen(["kano-share", APP_NAME],
                         stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE)

    for line in p.stdout:
        path = line.split('File Path: ')[-1]
        if len(line) == len(path):
            continue

        path = path.replace('$HOME', os.path.expanduser('~')).rstrip('\n')
        directory, _, filename = path.rpartition('/')

        return send_from_directory(directory, filename, as_attachment=True)


@server.route('/progress/<world>/<int:challengeNo>', methods=['POST'])
def _save_level(world, challengeNo):

    old_xp = calculate_xp()
    needsToSave = False

    groups = load_app_state_variable(APP_NAME, 'groups')

    # We might need to load the worlds file here so that we're sure that
    # no one is abusing the API from the OS
    if groups is None:
        groups = {}

    if world in groups:
        if groups[world]['challengeNo'] < challengeNo:
            groups[world]['challengeNo'] = challengeNo
            needsToSave = True

    else:
        groups[world] = {'challengeNo': challengeNo}
        needsToSave = True

    if needsToSave:
        save_app_state_variable_with_dialog(APP_NAME, 'groups', groups)

    new_xp = calculate_xp()
    return str(new_xp - old_xp)


@server.route('/progress', methods=['GET'])
def _load_level():
    value = {
        'groups': load_app_state_variable(APP_NAME, 'groups'),
        'challenge': load_app_state_variable(APP_NAME, 'challenge')
    }
    # Previously we used to save the progress as "level"
    level = load_app_state_variable(APP_NAME, 'level')
    if value['groups'] is None:
        value['groups'] = {}

    # Replace the Challege var here.
    if level > value['challenge']:
        value['challenge'] = level

    value = json.dumps(value)

    return Response(value, content_type='application/json')


@server.route('/lines-of-code', methods=['POST'])
def _increment_lines_of_code():
    data = json.loads(request.data)
    new_lines = data['newLines']

    increment_app_state_variable_with_dialog(
        APP_NAME, 'lines_of_code', new_lines
    )

    return ''


@server.route('/shutdown', methods=['POST'])
def _shutdown():
    '''
    Obtain the entry point to stop the http server.
    We do not kill the parent launcher proces (kano-draw)
    because he is keeping an eye on both the http and ui processes.
    '''
    import signal

    try:
        server_shutdown = request.environ.get('werkzeug.server.shutdown')
        if server_shutdown is not None:
            logger.info('Will attempt to shutdown the server')
            server_shutdown()
    except Exception as exc:
        logger.error(
            'Error while trying to shut down the server: [{}]'.format(exc)
        )

    return ''


@server.route('/browsemore', methods=['POST'])
def _browsemore():
    from kano import run_bg

    run_bg("chromium http://world.kano.me/shares/kano-draw")


@server.errorhandler(404)
def page_not_found(err):
    err_msg = 'Cannot find file {}'.format(request.path)

    return err_msg, 404


@server.route('/play_sound/<path:filename>', methods=['POST'])
def play_sounds(filename):
    sound_file = os.path.realpath(os.path.join(_get_static_dir(), filename))
    play_sound(sound_file)

    return ''


def start(parent_pid=None):
    """
    The server process will receive any requests to shutdown but
    the app that runs this as a daemon will be unaware of this
    request so store the PID of the parent.
    """
    global PARENT_PID
    PARENT_PID = parent_pid

    # Run the server
    try:
        server.run(port=8000)
    except EnvironmentError as exc:
        if exc.errno == 98:
            logger.error('Another server is running bound at our port')
            _shutdown()
    time.sleep(2)
