import React from 'react'
import {CommWrapper} from '../../utils/commwrapper/commWrapper'
import BreadCrumbs from './breadcrumbs'

export const load_ipython_extension = () => {
	console.log("hello from breadcrumbs")
	CommWrapper("breadcrumbs_comm", BreadCrumbs)
}
