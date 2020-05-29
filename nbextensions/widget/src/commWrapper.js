import React from 'react'
import ReactDOM from 'react-dom'
import Widget from './widget'

let promise = import('base/js/namespace')

const register = window.register 

export const CommWrapper = () => {
		promise.then(Jupyter=>{
			Jupyter.notebook.kernel.comm_manager.register_target('widget_comm', function(comm, msg){
				switch(msg.content.data.render){
					case "cell":
						render_in_cell(Jupyter, comm, msg); break;
					default:
						return render_in_parent(comm, msg);
				}
			})
		})
	}

const render_in_cell = (Jupyter, comm, msg) => {
	const cell = Jupyter.notebook.get_msg_cell(msg.parent_header.msg_id)
	if(cell.output_area.selector[0]){
		const output = cell.output_area.selector[0].getElementsByClassName('output')[0] 
		const subarea = create_subarea(output)
        ReactDOM.render(<Widget comm={comm} state={msg.content.data.state} children={msg.content.data.children}/>, subarea)
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

const render_in_parent = (comm, msg) => {
	register.widget = <Widget comm={comm} state={msg.content.data.state} children={msg.content.data.children}/>
}
