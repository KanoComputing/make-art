from flask import Flask, Response, request, send_from_directory
import json
import os
import time

from kano.utils import ensure_dir
from kano_profile.badges import save_app_state_variable_with_dialog, \
    calculate_xp
from kano_profile.apps import load_app_state_variable


APP_NAME = 'kano-draw'
CHALLENGE_DIR = os.path.expanduser('~/Draw-content')

ensure_dir(CHALLENGE_DIR)


def _get_static_dir():
    bin_path = os.path.abspath(os.path.dirname(__file__))

    if bin_path.startswith('/usr'):
        return '/usr/share/kano-draw'
    else:
        return os.path.abspath(os.path.join(bin_path, '../www'))


server = Flask(__name__, static_folder=_get_static_dir(), static_url_path='/')


@server.route('/')
def root():
    return server.send_static_file('index.html')

@server.route('/<path:path>')
def static_proxy(path):
    # send_static_file will guess the correct MIME type
    return server.send_static_file(path)

@server.route("/challenge/local", methods=['POST'])
def save_challenge():
    data = json.loads(request.data)
    filename = data['filename']
    content = data['content']

    filepath = os.path.join(CHALLENGE_DIR, filename + '.draw')

    with open(filepath, 'w') as f:
        f.write(content)

    return 200

@server.route('/challenge/local/<path:filename>', methods=['GET'])
def load_challenge(filename):
    print 'looking for', CHALLENGE_DIR, filename
    return send_from_directory(CHALLENGE_DIR, filename + '.draw',
                               as_attachment=True)

@server.route('/progress/<int:level>', methods=['POST'])
def _save_level(level):
    print 'saving level'
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
