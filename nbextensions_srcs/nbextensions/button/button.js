import Widget from '../../utils/widget/widget'


class Button extends Widget {
	constructor(props){
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event){
		this.setState(prevState=>({value: !prevState.value}))
	}

	render(){
		return(
			<div>
				<button onClick={this.handleClick}>{this.props.label}</button>
			</div>
		)
	}
}


export default Button
