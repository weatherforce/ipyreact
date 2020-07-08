import React from 'react'

class widget extends React.Component {
  constructor (props) {
    super(props)
	this.python_msg = false
    this.state = props.state
    this.handleMsg = this.handleMsg.bind(this)
    props.comm.on_msg(this.handleMsg)
  }

  componentDidUpdate () {
    const data = { state: this.state }
	  if(!this.python_msg){
    	this.props.comm.send(data)
	  }
	  this.python_msg = false
  }

  handleMsg (msg) {
	this.python_msg = true
    const state = msg.content.data.state
    console.log(this.state)
    if (this.state !== state) {
      console.log('new state')
      this.setState(state)
    }
  }

  fetchWidget (widgetName) {
    return window.IpyReactWidgetRegistry[widgetName]
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
