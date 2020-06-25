import Widget from './widget'
import { CommWrapper } from '../commwrapper/commWrapper'

export const load_ipython_extension = () => {
  CommWrapper('widget_comm', Widget)
}
