import Widget from '../../utils/widget/widget'


/**
 * AppLayout.
 *===========
 *=   TOP   =
 *===========
 *= L  =  R =
 *===========
 * @extends {Widget}
 */
class AppLayout extends Widget {

	render(){
		return(
			<div>
				<div>this.props.topWidget</div>
				<div>this.props.leftWidget</div>
				<div>this.props.rightWidget</div>
			</div>
		)
	}
}
