import Widget from '../../utils/widget/widget'

const layoutStyle = {
  root: {
    display: 'grid',
    gridTemplateColumns: '300px',
  },
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
class ListWidget extends Widget {

	fetchAllWidgets(listwidgets){
	  return listwidgets.map((widgetName)=>{
		return <div>
			  	{this.fetchWidget(widgetName)}
			   </div>
	  })
	}

  render () {
    return (
      <div style={layoutStyle.root}>
        {this.fetchAllWidgets(this.props.widgetlist)}
      </div>
    )
  }
}

export default ListWidget 
