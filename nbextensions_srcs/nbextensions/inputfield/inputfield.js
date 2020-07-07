import Widget from '../../utils/widget/widget'

class InputField extends Widget{
	render(){
		return(
			<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10"/>
		)
	}
}

export default InputField
