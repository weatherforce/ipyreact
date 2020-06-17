import React from 'react';
import Widget from '../../utils/widget/widget';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SliderReact from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
};


class Slider extends Widget {


  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Typography id="continuous-slider" gutterBottom>
          Volume
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <SliderReact value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
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
