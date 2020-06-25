import { CommWrapper } from '../../utils/commwrapper/commWrapper'
import BreadCrumbs from './breadcrumbs'

export const load_ipython_extension = () => {
  CommWrapper('breadcrumbs', BreadCrumbs)
}
