from ipykernel.comm import Comm
from traitlets import HasTraits, Dict, observe


class Widget(HasTraits):

    state = Dict(default_value={})

    def __init__(self, name: str,  children=[]):
        self.widget_id = name
        self.target_name = f"{self.widget_id}_comm"
        self.props = {}
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

    @observe('state')
    def state_change(self, change):
        data = {"state": change['new'], "props": self.props}
        self.communication.send(data)

    def send_updates(self):
        data = {"state": self.state, "props": self.props}
        self.communication.send(data)

    def _ipython_display_(self, **kwargs):
        self.setcommunication(render="cell")
