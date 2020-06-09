import React from 'react'
import Widget from '../../utils/widget/widget'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';



class BreadCrumbs extends Widget {

	processCrumbs(crumblist){
		return crumblist.map((crumb) => 
			<Typography color="textPrimary">
				{crumb}
			</Typography>
		);	
	}

	render(){
		return(
			<Breadcrumbs aria-label="breadcrumb">
				{this.processCrumbs(this.state.pathlist)}
			</Breadcrumbs>
		)
	}
}

export default BreadCrumbs
