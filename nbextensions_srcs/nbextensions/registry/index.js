let promise = import("base/js/namespace")

class WidgetRegistry{

	registerWidget(widgetname, widget){
		this[widgetname] = widget	
	}
}

export const registry = new WidgetRegistry();

window.registry = registry;

export const load_ipython_extension = () =>{
	promise.then( Jupyter => {
	})
}
