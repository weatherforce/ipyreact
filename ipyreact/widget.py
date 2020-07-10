from ipykernel.comm import Comm
from traitlets import HasTraits, Dict, observe


class Widget(HasTraits):
    """Widget"""

    state = Dict(default_value={})

    def __init__(self, name: str, props=None):
        """__init__
        :param name: used for communication
        :type name: str
        :param props: passed to React component as props
        """
        self.widget_id = name
        self.target_name = f"{self.widget_id}_comm"
        if not props:
            self.props = {}
        else:
            self.props = props

        self.set_communication()

    def set_communication(self, render="default"):
        """set_communication
        Creates the communication channel between python and ReactJs.
        define if the widget is rendered directly in cell or inside another
        widget.
        :param render: if set to cell, it renders the react component
        directly under the code cell at evalutaion
        """
        data = {"state": self.state,
                "props": self.props,
                "render": render,
                }
        self.communication = Comm(target_name=self.target_name, data=data)
        self.communication.on_msg(self._received)

    def _received(self, msg):
        """_received
        A callback triggered when a msg is received from Js side.
        :param msg: the msg object
        """
        if self.state != msg['content']['data']['state']:
            self.state = msg["content"]["data"]["state"]

    @observe('state')
    def state_change(self, change):
        """state_change
        A callback triggered at state change. It allows automatic updates of
        Js side.
        :param change: a dictionnary containing old state and new state
        """
        if change['new'] != change['old']:
            data = {"state": change['new'], "props": self.props}
            self.communication.send(data)

    def send_updates(self):
        """send_updates
        send updates to js side.
        """
        data = {"state": self.state, "props": self.props}
        self.communication.send(data)

    def _ipython_display_(self, **kwargs):
        """_ipython_display_
        Called at Widget evaluation. Permit the rendering in cell
        :param **kwargs:
        """
        self.set_communication(render="cell")
