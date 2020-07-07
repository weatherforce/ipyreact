import Widget from '../../utils/widget/widget'

class Label extends Widget {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <label> {this.state.content} </label>
    )
  }
}

export default Label
