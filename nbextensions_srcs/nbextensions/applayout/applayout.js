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
				<div>
					<p>top widget</p>
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
