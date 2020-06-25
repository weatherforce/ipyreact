from traitlets import HasTraits, Dict, observe


class Widget(HasTraits):

    state = Dict(default_value={})

    def __init__(self, name: str):
        self.widget_id = name

    def __repr__(self):
        return self.widget_id

    @observe('state')
    def state_change(self, change):
        print(change['new'])
