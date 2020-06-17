let promise = import("base/js/namespace")

class WidgetRegistry{

	registerWidget(widgetname, widget){
		this[widgetname] = widget	
	}
}

export const widgetRegistry = new WidgetRegistry();

window.widgetRegistry = widgetRegistry;

export const load_ipython_extension = () =>{
	promise.then( Jupyter => {
	})
}
