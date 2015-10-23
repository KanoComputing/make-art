# server.py
#
# Copyright (C) 2014-2015 Kano Computing Ltd.
# License: http://www.gnu.org/licenses/gpl-2.0.txt GNU GPL v2
#

from flask import Flask, Response, request, send_from_directory
import json
import os
import time
import logging
import shutil

from kano.utils import ensure_dir
from kano_profile.badges import save_app_state_variable_with_dialog, \
    calculate_xp
from kano_profile.apps import load_app_state_variable
from kano_profile.badges import increment_app_state_variable_with_dialog
from kano_world.functions import login_using_token
from kano_world.share import upload_share
from kano.network import is_internet
from kano.utils import play_sound
from kano.logging import logger


APP_NAME = 'kano-draw'
PARENT_PID = None

CHALLENGE_DIR = os.path.expanduser('~/Draw-content')
WALLPAPER_DIR = os.path.join(CHALLENGE_DIR, 'wallpapers')
STATIC_ASSET_DIR = os.path.join(os.path.expanduser('~'),
                                '.make-art-assets')

ensure_dir(CHALLENGE_DIR)
ensure_dir(WALLPAPER_DIR)
ensure_dir(STATIC_ASSET_DIR)


def _copy_package_assets():
    # Use abs paths for both src and dest for subsequent replacements to work
    src_dir = os.path.abspath(_get_package_static_dir())
    dest_dir = os.path.abspath(STATIC_ASSET_DIR)

    # First Clear this cache
    for existing_file in os.listdir(dest_dir):
        cur_file = os.path.abspath(os.path.join(dest_dir, existing_file))
        if os.path.islink(cur_file):
            os.unlink(cur_file)
        else:
            if os.path.isdir(cur_file):
                shutil.rmtree(cur_file)
            else:
                os.remove(cur_file)

    # Now copy the static assets
    for root_d, dirs, files in os.walk(src_dir):
        # Firstly create the dirs
        dest_root = root_d.replace(src_dir, dest_dir)
        for dir_n in dirs:
            new_dir = os.path.join(dest_root, dir_n)
            os.mkdir(new_dir)
        # Now deal with the files
        for file_n in files:
            src_file = os.path.join(root_d, file_n)
            new_file = os.path.join(dest_root, file_n)
            shutil.copy(src_file, new_file)
    logger.info('Successfully copied over static assets')


def _get_package_static_dir():
    bin_path = os.path.abspath(os.path.dirname(__file__))

    if bin_path.startswith('/usr'):
        return '/usr/share/kano-draw'
    else:
        return os.path.abspath(os.path.join(bin_path, '../www'))


def _get_co_assets():
    from kano_content.api import ContentManager

    cm = ContentManager.from_local()

    co_index = {}

    for co in cm.list_local_objects(spec='make-art-assets'):
        co_files = co.get_data('').get_content()
        if len(co_files) != 2:
            logger.warning(
                'Count of files other than 2 in co[{}], skipping'.format(
                    co.get_data('').get_dir()
                )
            )
            continue

        # Check whether the first file is the index
        index_no = _get_co_index_apply_order(co_files[0])
        if index_no is not None:
            co_index[index_no] = co_files[1]
        else:
            # It wasn't the first one, go for the second one
            index_no = _get_co_index_apply_order(co_files[1])
            if index_no is not None:
                co_index[index_no] = co_files[0]
            else:
                err_msg = 'None of the files contained in co have apply index'
                logger.error(err_msg)
                continue

    return co_index


def _apply_co_packages(dest_dir):
    import tarfile

    co_index = _get_co_assets()

    for order in sorted(co_index.iterkeys()):
        tar_file = co_index[order]
        # First try to open the file
        try:
            tarball = tarfile.open(tar_file)
        except (IOError, OSError) as exc:
            err_msg = "Couldn't open file '{}', [{}]".format(tar_file, exc)
            logger.error(err_msg)
            continue
        except tarfile.ReadError as exc:
            err_msg = 'Error parsing tarfile "{}", [{}]'.format(tar_file, exc)
            logger.error(err_msg)
            continue
        else:
            # Now try to extract the files one by one
            with tarball:
                for tarred_file in tarball:
                    try:
                        tarball.extract(tarred_file, path=dest_dir)
                    except IOError as exc:
                        # This is to guard against weird tar behaviour when
                        # trying to ovewrite symlinks
                        bad_filename = os.path.join(dest_dir, tarred_file.name)
                        if os.path.islink(bad_filename):
                            logger.debug(
                                'Remove link and ovewrite "{}"'.format(
                                    bad_filename)
                            )
                            os.remove(os.path.join(dest_dir, tarred_file.name))
                            tarball.extract(tarred_file, path=dest_dir)


def _get_co_index_apply_order(fname):
    index_no = None
    # Files names have absolute path
    if os.path.basename(fname) == 'index.json':
        try:
            index_fh = open(fname)
        except (IOError, OSError) as exc:
            err_msg = 'Error opening file "{}". [{}]'.format(
                fname,
                exc
            )
            logger.error(err_msg)
        else:
            with index_fh:
                try:
                    ind_data = json.load(index_fh)
                    index_no = ind_data['apply_order']
                except KeyError as exc:
                    err_msg = ("JSON in '{}' doesn't contain right key: "
                               "[{}]").format(fname, exc)
                    logger.error(err_msg)
                except ValueError as exc:
                    err_msg = 'File "{}" is not a valid JSON: [{}]'.format(
                        fname,
                        exc
                    )
                    logger.error(err_msg)
    return index_no


def _get_static_dir():
    return STATIC_ASSET_DIR


def _get_image_from_str(img_str):
    import base64

    image_b64 = img_str.split(',')[-1]
    image_data = base64.b64decode(image_b64)

    return image_data


def _save(data):
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


_copy_package_assets()
_apply_co_packages(STATIC_ASSET_DIR)
server = Flask(__name__, static_folder=_get_static_dir(), static_url_path='/')
server_logger = logging.getLogger('werkzeug')
server_logger.setLevel(logging.ERROR)


@server.route('/')
# Redirect a localLoad back to index for routing in Angular
@server.route('/localLoad/<path:path>')
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

    success, _ = login_using_token()
    if not success:
        os.system('kano-login 3')
        success, _ = login_using_token()
        if not success:
            return 'Cannot login'

    data = json.loads(request.data)
    filename, filepath = _save(data)
    success, msg = upload_share(filepath, filename, APP_NAME)

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

    # Send signal to parent to initiate shutdown
    os.kill(PARENT_PID, signal.SIGINT)


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
    print os.path.realpath(os.path.join(_get_static_dir(), filename))
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
