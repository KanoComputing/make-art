from kano.webapp import WebApp

class Draw(WebApp):
    def __init__(self):
        super(Draw, self).__init__()

        self._index = "http://localhost:8000"
        self._title = "Draw with code"

        self._decoration = False
        self._maximized = True
