import Widget from '../../utils/widget/widget'

class Label extends Widget {
  render () {
    return (
      <label> {this.state.content} </label>
    )
  }
}

export default Label
