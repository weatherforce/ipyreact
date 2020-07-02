import React from 'react'
import ReactDOM from 'react-dom'

/* this promise is a dynamic import of base/js/namespace available from jupyter */
const jupyterPromise = import('base/js/namespace')

/* refers to widget registry where you can have acess to instantiated component */
const registry = window.IpyReactWidgetRegistry


/**
 * renderInCell. Allow to render ReactComponent under a notebook cell
 *
 * @param {Object} Jupyter
 * @param {Object} reactComponent
 * @param {Object} msg
 */
const renderInCell = (Jupyter, reactComponent, msg) => {
  const cell = Jupyter.notebook.get_msg_cell(msg.parent_header.msg_id)
  if (cell.output_area.selector[0]) {
    const output = cell.output_area.selector[0].getElementsByClassName('output')[0]
    const subarea = createSubarea(output)
    ReactDOM.render(reactComponent, subarea)
  }
}

/**
 * renderInParent register a reactComponent using its widgetName as key
 *
 * @param {string} widgetName
 * @param {Object} reactComponent
 * @param {Object} msg
 */
const renderInParent = (widgetName, reactComponent, msg) => {
  registry[widgetName] = reactComponent
}

/**
 * createSubarea create the node in the DOM where you will render
 * your component.
 *
 * @param {Selector} output
 */
const createSubarea = (output) => {
  const area = document.createElement('div')
  area.classList.add('output_area')
  output.appendChild(area)

  const prompt = document.createElement('div')
  prompt.classList.add('prompt')
  prompt.classList.add('prompt_output')
  area.appendChild(prompt)

  const subarea = document.createElement('div')
  subarea.classList.add('output_subarea')
  subarea.classList.add('output_result')
  area.appendChild(subarea)
  return subarea
}

/**
 * createCommCallback create the comms to a coresponding widget
 *
 * @param {Object} Jupyter
 * @param {Object} widgetName
 * @param {Object} component
 */
const createCommCallback = (Jupyter, widgetName, component) => {
  const callback = (comm, msg) => {
    const reactComponent = React.createElement(
      component,
      { comm: comm, state: msg.content.data.state, children: msg.content.data.children },
      null)
    switch (msg.content.data.render) {
      case 'cell':
        renderInCell(Jupyter, reactComponent, msg); break
      default:
        return renderInParent(widgetName, reactComponent, msg)
    }
  }
  return callback
}

/**
 * registerTargetCallback when a communication is asked for on the target channel, it calls for
 * createCommCallback
 *
 * @param {Object} Jupyter
 * @param {Object} widgetName
 * @param {Object} component
 */
const registerTargetCallback = (Jupyter, widgetName, component) => {
  const callback = () => {
    Jupyter.notebook.kernel.comm_manager.register_target(`${widgetName}_comm`, createCommCallback(Jupyter, widgetName, component))
  }
  return callback
}

/**
 * CommWrapper is the upper function that provides a wrap around everything about Comms handling.
 *
 * @param {string} widgetName
 * @param {Object} component
 */
const CommWrapper = (widgetName, component) => {
  jupyterPromise.then(Jupyter => {
    Jupyter.notebook.events.on('kernel_ready.Kernel', registerTargetCallback(Jupyter, widgetName, component))
  })
}

export default CommWrapper
