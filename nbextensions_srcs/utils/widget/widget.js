import React from 'react'


class widget extends React.Component{

    constructor(props){
        super(props)
        this.state = props.state
		this.processChildren = this.processChildren.bind(this)
		this.children = this.processChildren(props.children)
    }

  componentDidUpdate(){
    let data ={"state": this.state}
    this.props.comm.send(data);
  }

	processChildren(children){
		if (children){
			return children.map( (child) => {
				return window.widgetRegistry[child] ? window.widgetRegistry[child] : "void"
			})
		}
		return ["void"]
	}


    render(){
        return(
        <div>
            <h1> Hello World </h1>
			<p>{JSON.stringify(this.state)}</p>
        </div>
		)
	}
}

export default widget
