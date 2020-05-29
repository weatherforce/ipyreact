from ipykernel.comm import Comm


class Widget:

    def __init__(self, state: dict, props: dict, children=[]):
        self.widget_id = "widget"
        self.target_name = "widget_comm"
        self.state = state
        self.props = props
        self.children = children
        self.setcommunication()

    def processChildren(self):
        return [a_child.widget_id for a_child in self.children]

    def setcommunication(self, render="default"):
        data = {"state": self.state,
                "props": self.props,
                "render": render,
                "children": self.processChildren()
                }
        self.communication = Comm(target_name=self.target_name, data=data)
        self.communication.on_msg(self._received)

    def _received(self, msg):
        self.state = msg["content"]["data"]["state"]
        self.send_updates()

    def send_updates(self):
        data = {"state": self.state, "props": self.props}
        self.communication.send(data)

    def __repr__(self):
        self.setcommunication(render="cell")
        return f"<Widget target_name=${self.target_name} state=${self.state}\
            props=${self.props}>"
