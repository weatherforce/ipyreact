import Widget from '../../utils/widget/widget'

const jupyterPromise = import('base/js/namespace')
  jupyterPromise.then(Jupyter => {
	})


class InputField extends Widget{
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
	  const value = event.target.value
	  this.setState({"value": value})
	}

	handleFocus(event){
  		jupyterPromise.then(Jupyter => {
			Jupyter.keyboard_manager.disable()
		})
	}


	handleBlur(event){
		jupyterPromise.then(Jupyter => {
			Jupyter.keyboard_manager.enable()
		})
	}

	render(){
		return(
			<input type={this.props.type}
				onChange={this.handleChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				value={this.state.value}/>
		)
	}
}

export default InputField
