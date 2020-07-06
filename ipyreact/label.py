from ipyreact import Widget


class Label(Widget):

    def __init__(self):
        super().__init__("label")
        self.state = {"value": 0}
