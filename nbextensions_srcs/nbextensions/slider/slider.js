import Widget from '../../utils/widget/widget'

class Slider extends Widget {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const rangeValue = event.target.value
    this.setState({
      value: parseInt(rangeValue)
    })
  }

  render () {
    return (

      <div>
        <input
          id='range' type='range'
          value={this.state.value}
          min='0'
          max='20'
          step='1'
          onChange={this.handleChange}
        />
        <span id='output'>{this.state.value}</span>
      </div>
    )
  }
}

export default Slider
