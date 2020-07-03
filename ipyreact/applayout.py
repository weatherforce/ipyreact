from ipyreact import Widget


class AppLayout(Widget):

    def __init__(self, top_widget):
        props = {"topWidget": top_widget.widget_id}
        super().__init__("applayout", props=props)
