import CommWrapper from '../../utils/commwrapper/commWrapper'
import ListWidget from './listwidget'

export const load_ipython_extension = () => {
  CommWrapper('listwidget', ListWidget)
}
