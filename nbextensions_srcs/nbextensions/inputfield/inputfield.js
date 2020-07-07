import Widget from '../../utils/widget/widget'

class InputField extends Widget{
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		const value = event.target.value
		console.log("new value", value)
		this.setState({"value": value})
	}

	render(){
		return(
			<input type={this.props.type} value={this.state.value}/>
		)
	}
}

export default InputField
