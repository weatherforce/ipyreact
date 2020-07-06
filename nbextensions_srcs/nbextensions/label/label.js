import Widget from '../../utils/widget/widget'
import Grid from '@material-ui/core/Grid'
import SliderReact from '@material-ui/core/Slider'

class Label extends Widget {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        {this.state.content}
      </div>
    )
  }
}

export default Label
