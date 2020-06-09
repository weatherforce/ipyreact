const promise = import('base/js/namespace')

class WidgetRegister {
  registerWidget (widgetname, widget) {
    this[widgetname] = widget
  }
}

export const register = new WidgetRegister()

window.register = register

export const load_ipython_extension = () => {
  promise.then(Jupyter => {
    console.log('This is the manager speaking: Go back to work')
  })
}
