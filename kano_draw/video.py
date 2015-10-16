# video.py
#
# Copyright (C) 2015 Kano Computing Ltd.
# License: http://www.gnu.org/licenses/gpl-2.0.txt GNU GPLv2
#

import os

from kano_profile.apps import load_app_state_variable
from kano_draw.server import APP_NAME

VIDEO_PATH = '/usr/share/kano-media/videos/art.mp4'


def play_intro():
    # Skip the intro in case the user progressed level 1
    has_progressed = False

    groups = load_app_state_variable(APP_NAME, 'groups')
    if groups is not None and isinstance(groups, dict):
        for group in groups.itervalues():
            if 'challengeNo' in group and group['challengeNo'] > 0:
                has_progressed = True
                break
    else:
        level = load_app_state_variable(APP_NAME, 'level')
        if level > 0:
            has_progressed = True

    if not has_progressed:
        try:
            from kano_video.logic.player import play_video
            # stop the splash screen before the video starts
            os.system('/usr/bin/kano-stop-splash')
            play_video(localfile=VIDEO_PATH)
        except ImportError:
            pass
