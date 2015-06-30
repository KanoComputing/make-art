# video.py
#
# Copyright (C) 2015 Kano Computing Ltd.
# License: http://www.gnu.org/licenses/gpl-2.0.txt GNU GPLv2
#

import os

from kano_profile.apps import load_app_state_variable
from kano_draw.server import APP_NAME

VIDEO_PATH = '/usr/share/kano-media/videos/monkey.mkv'


def play_intro():
    level = load_app_state_variable(APP_NAME, 'level')
    # Skip the intro in case the user progressed past level 1
    if level > 0:
        return

    try:
        from kano_video.logic.player import play_video
        # stop the splash screen before the video starts
        os.system('/usr/bin/kano-stop-splash')
        play_video(localfile=VIDEO_PATH)
    except ImportError:
        pass
