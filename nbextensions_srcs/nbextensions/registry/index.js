const promise = import('base/js/namespace')

/**
 * WidgetRegistry act as a mapper to reactComponent and enable the layout feature .
 */
class WidgetRegistry {
  registerWidget (widgetName, widget) {
    this[widgetName] = widget
  }
}

export const widgetRegistry = new WidgetRegistry()

window.IpyReactWidgetRegistry = widgetRegistry

export const load_ipython_extension = () => {
  promise.then(Jupyter => {
  })
}
