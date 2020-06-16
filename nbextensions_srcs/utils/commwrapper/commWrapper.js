import React from 'react'
import ReactDOM from 'react-dom'

let promise = import('base/js/namespace')

const registry = window.registry 

export const CommWrapper = (target_name, component) => {
				promise.then(Jupyter=>{
			Jupyter.notebook.kernel.comm_manager.registry_target(target_name, function(comm, msg){
				const reactComponent = React.createElement(
					component,
					{comm: comm, state: msg.content.data.state, children: msg.content.data.children},
					null );

				switch(msg.content.data.render){
					case "cell":
						render_in_cell(Jupyter, reactComponent, msg); break;
					default:
						return render_in_parent(reactComponent, msg);
				}
			})
		})
	}

const render_in_cell = (Jupyter, reactComponent, msg) => {
	const cell = Jupyter.notebook.get_msg_cell(msg.parent_header.msg_id)
	if(cell.output_area.selector[0]){
		const output = cell.output_area.selector[0].getElementsByClassName('output')[0] 
		const subarea = create_subarea(output)
        ReactDOM.render(reactComponent, subarea)
	}
}

const create_subarea = (output) =>{
	const area = document.createElement('div')
	area.classList.add('output_area')
	output.appendChild(area)

	const prompt = document.createElement('div')
	prompt.classList.add('prompt')
	prompt.classList.add('prompt_output')
	area.appendChild(prompt)


	const subarea = document.createElement('div')
	subarea.classList.add('output_subarea')
	area.appendChild(subarea)
	return subarea
}

const render_in_parent = (reactComponent, msg) => {
	registry.widget = reactComponent
}
