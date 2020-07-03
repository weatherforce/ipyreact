import CommWrapper from '../../utils/commwrapper/commWrapper'
import Button from './button'

export const load_ipython_extension = () => {
  CommWrapper('button', Button)
}
