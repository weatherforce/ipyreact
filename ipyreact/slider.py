from ipyreact import Widget


class Slider(Widget):

    def __init__(self):
        super().__init__("slider")
        self.state = {"value": 0}
