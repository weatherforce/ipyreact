import CommWrapper from '../../utils/commwrapper/commWrapper'
import Label from './label'

export const load_ipython_extension = () => {
  CommWrapper('label', Label)
}
