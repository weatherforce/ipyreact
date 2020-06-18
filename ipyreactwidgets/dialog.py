from ipyreactwidgets import Widget


class Dialog(Widget):

    def __init__(self, title, content):
        super().__init__("dialog")
        self.state = {"open": False, "title": title, "content": content}
