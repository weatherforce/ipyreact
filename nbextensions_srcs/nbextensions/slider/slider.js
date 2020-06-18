import React from 'react';
import Widget from '../../utils/widget/widget';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SliderReact from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';


class Slider extends Widget {

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event, newValue){
    	this.setState({"value": newValue});
	}

  render() {
    let value = this.state.value;

    return (
      <div>
        <Typography id="continuous-slider" gutterBottom>
          Volume
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <SliderReact value={value} onChange={this.handleChange} aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>

      </div>
    );
}
}

export default Slider
