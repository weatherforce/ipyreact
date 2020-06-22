from ipyreactwidgets import Widget


class Dialog(Widget):

    def __init__(self, title, content):
        super().__init__("dialog")
        self.state["open"] = False
        self.state["title"] = title,
        self.state["content"] = content
