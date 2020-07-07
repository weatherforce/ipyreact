from ipyreact import Widget


class InputField(Widget):

    def __init__(self, input_type="text"):
        props = {"type": input_type}
        super().__init__("inputfield", props=props)
        self.state = {"value": 0}
