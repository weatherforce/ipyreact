from ipyreact import Widget


class Button(Widget):

    def __init__(self, label):
        props = {"label": label}
        super().__init__('button', props=props)
        self.state = {"value": False}
