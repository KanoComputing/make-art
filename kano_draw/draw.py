from kano.webapp import WebApp

class Draw(WebApp):
    def __init__(self, load_path=''):
        super(Draw, self).__init__()

        self._index = "http://localhost:8000"
        if load_path:
            self._index = '{}/localLoad/{}'.format(self._index,
                                                   load_path.strip('/'))

        self._title = "Draw"
        self._app_icon = '/usr/share/icons/Kano/88x88/apps/kano-draw.png'

        self._decoration = False
        self._maximized = True

        # Enable developer extras to allow error reporting to work
        self._inspector = True
