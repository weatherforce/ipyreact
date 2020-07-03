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

	constructor(props){
		super(props)
	}

	fetchWidget(widgetName){
		return window.IpyReactWidgetRegistry[widgetName]
	}

	render(){
		return(
			<div>
				<div>
					{this.fetchWidget(this.props.topWidget)}	
				</div>
				<div>
					{this.fetchWidget(this.props.leftWidget)}	
				</div>
				<div>
					{this.fetchWidget(this.props.rightWidget)}	
				</div>
			</div>
		)
	}
}

export default AppLayout
