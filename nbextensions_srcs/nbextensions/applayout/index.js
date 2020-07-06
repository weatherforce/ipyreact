import CommWrapper from '../../utils/commwrapper/commWrapper'
import AppLayout from './applayout'

export const load_ipython_extension = () => {
  CommWrapper('applayout', AppLayout)
}
