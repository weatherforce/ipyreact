import React from 'react'
import {CommWrapper} from '../../utils/commwrapper/commWrapper'
import Dialog from './dialog'

export const load_ipython_extension = () => {
	CommWrapper("dialog_comm", Dialog)
}
