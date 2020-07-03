from ipykernel.comm import Comm
from traitlets import HasTraits, Dict, observe


class Widget(HasTraits):

    state = Dict(default_value={})

    def __init__(self, name: str, props=None):
        self.widget_id = name
        self.target_name = f"{self.widget_id}_comm"
        if not props:
            self.props = {}
        else:
            self.props = props

        self.set_communication()

    def process_children(self):
        return [a_child.widget_id for a_child in self.children]

    def set_communication(self, render="default"):
        data = {"state": self.state,
                "props": self.props,
                "render": render,
                "children": self.process_children()
                }
        self.communication = Comm(target_name=self.target_name, data=data)
        self.communication.on_msg(self._received)

    def _received(self, msg):
        if self.state != msg['content']['data']['state']:
            self.state = msg["content"]["data"]["state"]

    @observe('state')
    def state_change(self, change):
        if change['new'] != change['old']:
            data = {"state": change['new'], "props": self.props}
            self.communication.send(data)

    def send_updates(self):
        data = {"state": self.state, "props": self.props}
        self.communication.send(data)

    def _ipython_display_(self, **kwargs):
        self.set_communication(render="cell")
