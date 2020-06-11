from ipyreactwidgets import Widget


class Dialog(Widget):

    def __init__(self):
        super().__init__("dialog")
        self.state = {"open": False}
