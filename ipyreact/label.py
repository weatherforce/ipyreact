from ipyreact import Widget

# Example initialisation is 'Label("My new, nice label")'
# See example ipynb in examples folder for running example
class Label(Widget):

    def __init__(self, content):
        super().__init__("label")
        self.state["content"] = content
