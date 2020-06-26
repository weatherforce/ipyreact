import React from 'react'
import Widget from '../../utils/widget/widget'
import Grid from '@material-ui/core/Grid'
import SliderReact from '@material-ui/core/Slider'

class Slider extends Widget {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, newValue) {
    this.setState({ value: newValue })
	this.sendUpdates()
  }

  render () {
    const value = this.state.value

    return (
      <div>
        <Grid item xs>
          <SliderReact value={value} onChange={this.handleChange} aria-labelledby='continuous-slider' />
        </Grid>
      </div>
    )
  }
}

export default Slider
