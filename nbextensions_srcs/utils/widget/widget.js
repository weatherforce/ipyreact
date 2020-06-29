import React from 'react'

class widget extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.state
    this.processChildren = this.processChildren.bind(this)
	this.handleMsg = this.handleMsg.bind(this)
    this.children = this.processChildren(props.children)
	props.comm.on_msg(this.handleMsg)
  }

  componentDidUpdate () {
    const data = { state: this.state }
    this.props.comm.send(data)
  }

  handleMsg( msg ){
	const state = msg.content.data.state
	console.log(this.state)
	  if(this.state !== state){
	  	console.log("new state")
        this.setState(state)
	  }
  }


  processChildren (children) {
    if (children) {
      return children.map((child) => {
        return window.widgetRegistry[child] ? window.widgetRegistry[child] : 'void'
      })
    }
    return ['void']
  }

  render () {
    return (
      <div>
        <h1> Hello World </h1>
        <p>{JSON.stringify(this.state)}</p>
      </div>
    )
  }
}

export default widget
