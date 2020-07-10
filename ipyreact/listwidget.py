from ipyreact import Widget


class ListWidget(Widget):

    def __init__(self, widgetlist):
        props = {
            "widgetlist": [a_widget.widget_id for a_widget in widgetlist]
        }
        super().__init__("listwidget", props=props)
