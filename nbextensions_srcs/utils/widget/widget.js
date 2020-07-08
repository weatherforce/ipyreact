import React from 'react'

class widget extends React.Component {
  constructor (props) {
    super(props)
    this.pythonUpdate = false
    this.state = props.state
    this.handleMsg = this.handleMsg.bind(this)
    props.comm.on_msg(this.handleMsg)
  }

  componentDidUpdate () {
    const data = { state: this.state }
    if (!this.pythonUpdate) {
      this.props.comm.send(data)
    }
    this.pythonUpdate = false
  }

  handleMsg (msg) {
    this.pythonUpdate = true
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
