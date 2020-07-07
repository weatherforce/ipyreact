import Widget from '../../utils/widget/widget'


class Slider extends Widget {
  constructor(props) {
    super(props);
    this.updateRange = this.updateRange.bind(this)
  }

  updateRange(event) {
    const rangeValue = event.target.value
    this.setState({
      value: parseInt(rangeValue)
    })
  }
 
  render () {

    return (

      <div>
        <input id="range" type="range"
          value={this.value}
          min="0"
          max="20"
          step="1"
          onChange={this.updateRange}
        />
        <span id="output">{this.value}</span>
      </div>
    )
  }
}

export default Slider
