import CommWrapper from '../../utils/commwrapper/commWrapper'
import InputField from './inputfield'

export const load_ipython_extension = () => {
  CommWrapper('inputfield', InputField)
}
