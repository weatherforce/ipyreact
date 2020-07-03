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
					<p>left widget</p>
				</div>
				<div>
					<p>right widget</p>
				</div>
			</div>
		)
	}
}

export default AppLayout
