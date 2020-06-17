import React from 'react'
import {CommWrapper} from '../../utils/commwrapper/commWrapper'
import Slider from './slider'

export const load_ipython_extension = () => {
	CommWrapper("slider_comm", Slider)
}
