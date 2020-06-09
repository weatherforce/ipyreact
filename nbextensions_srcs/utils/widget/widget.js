import React from 'react'

class widget extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.state
    this.handleMsg = this.handleMsg.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.processChildren = this.processChildren.bind(this)
    props.comm.on_msg(this.handleMsg)
    this.children = this.processChildren(props.children)
  }

  processChildren (children) {
    if (children) {
      return children.map((child) => {
        return window.register[child] ? window.register[child] : 'void'
      })
    }
    return ['void']
  }

  handleClick (e) {
    const data = { state: this.state }
    data.state.count += 1
    this.props.comm.send(data)
  }

  handleMsg (msg) {
    const state = msg.content.data.state
    this.setState(state)
  }

  render () {
    return (
      <div>
        <h1> Hello {this.state.title}! </h1>
        <button onClick={this.handleClick}> count +1 </button>
        <h3> count: {this.state.count} </h3>
      </div>
    )
  }
}

export default widget
