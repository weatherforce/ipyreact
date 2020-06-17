import React from 'react'


class widget extends React.Component{

    constructor(props){
        super(props)
        this.state = props.state
        this.handleMsg = this.handleMsg.bind(this)
		this.processChildren = this.processChildren.bind(this)
        props.comm.on_msg(this.handleMsg)
		this.children = this.processChildren(props.children)
    }

	processChildren(children){
		if (children){
			return children.map( (child) => {
				return window.widgetRegistry[child] ? window.widgetRegistry[child] : "void"	
			})
		}
		return ["void"]
	}

    handleMsg( msg ){
        const state = msg.content.data.state
        this.setState(state)
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
