from ipyreact import Widget


class AppLayout(Widget):

    def __init__(self, top_widget, left_widget, right_widget):
        props = {
            "topWidget": top_widget.widget_id,
            "leftWidget": left_widget.widget_id,
            "rightWidget": right_widget.widget_id
        }
        super().__init__("applayout", props=props)
