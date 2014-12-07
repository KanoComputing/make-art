from flask import Flask, Response, request, send_from_directory
import json
import os
import time

from kano.utils import ensure_dir
from kano_profile.badges import save_app_state_variable_with_dialog, \
    calculate_xp
from kano_profile.apps import load_app_state_variable
from kano_world.share import upload_share


APP_NAME = 'kano-draw'
CHALLENGE_DIR = os.path.expanduser('~/Draw-content')
WALLPAPER_DIR = os.path.join(CHALLENGE_DIR, 'wallpapers')

ensure_dir(CHALLENGE_DIR)
ensure_dir(WALLPAPER_DIR)


def _get_static_dir():
    bin_path = os.path.abspath(os.path.dirname(__file__))

    if bin_path.startswith('/usr'):
        return '/usr/share/kano-draw'
    else:
        return os.path.abspath(os.path.join(bin_path, '../www'))

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

    filepath = os.path.join(CHALLENGE_DIR, filename + '.draw')
    img_path = os.path.join(CHALLENGE_DIR, filename + '.png')

    with open(filepath, 'w') as f:
        f.write(
            json.dumps({
                'filename': filename,
                'description': desc,
                'code' : code
            })
        )

    with open(img_path, 'wb') as f:
        f.write(image)

    return (filename, filepath)


server = Flask(__name__, static_folder=_get_static_dir(), static_url_path='/')


@server.route('/')
def root():
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

@server.route("/challenge/local/wallpaper/<path:filename>", methods=['POST'])
def save_wallpaper(filename):
    data = json.loads(request.data)

    imgs = {
        '1024': _get_image_from_str(data['image_1024']),
        '4-3': _get_image_from_str(data['image_4_3']),
        '16-9': _get_image_from_str(data['image_16_9'])
    }

    img_path = os.path.join(WALLPAPER_DIR,
        '{filename}-{{ratio}}.png'.format(filename=filename))

    for ratio, img_data in imgs.iteritems():
        with open(img_path.format(ratio=ratio), 'wb') as f:
            f.write(img_data)

    return ''

@server.route("/challenge/web/<path:filename>", methods=['POST'])
def share(filename):
    data = json.loads(request.data)

    filename, filepath = _save(data)
    upload_share(filepath, filename, APP_NAME)

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


@server.route('/progress/<int:level>', methods=['POST'])
def _save_level(level):
    old_xp = calculate_xp()

    value = int(level) - 1

    save_app_state_variable_with_dialog(APP_NAME, 'level', value)
    new_xp = calculate_xp()

    return str(new_xp - old_xp)

@server.route('/progress', methods=['GET'])
def _load_level():
    value = load_app_state_variable(APP_NAME, 'level')
    # If every challenge is unlocked, value is 999

    if value is not None:
        return str(value + 1)
    else:
        _save_level(1)
        return Response('1')


@server.errorhandler(404)
def page_not_found(err):
    err_msg = 'Cannot find file {}'.format(request.path)

    return err_msg, 404


def start():
    server.run(port=8000)
    time.sleep(2)
