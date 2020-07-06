import Widget from '../../utils/widget/widget'

const layoutStyle = {
	root:{
		display: "grid",
		gridTemplateColumns: "auto auto",
		gridTemplateRows: "100px auto",
	},
	top: {
		gridColumn: "1 / 3",
	}
}

/**
 * AppLayout: aim to provide a basic grid for you to create 
 * your app in it.
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
			<div style={layoutStyle.root}>
				<div style={layoutStyle.top}>
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
