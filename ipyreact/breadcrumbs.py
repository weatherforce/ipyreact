from ipyreact import Widget


class BreadCrumbs(Widget):

    def __init__(self, pathlist: list):
        super().__init__("breadcrumbs")
        self.state["pathlist"] = pathlist
