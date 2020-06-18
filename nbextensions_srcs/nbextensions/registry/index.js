let promise = import("base/js/namespace")

class WidgetRegistry{

	registerWidget(widgetName, widget){
		this[widgetName] = widget	
	}
}

export const widgetRegistry = new WidgetRegistry();

window.widgetRegistry = widgetRegistry;

export const load_ipython_extension = () =>{
	promise.then( Jupyter => {
	})
}
