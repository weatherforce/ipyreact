import React from 'react'
import ReactDOM from 'react-dom'

const promise = import('base/js/namespace')

const registry = window.widgetRegistry

export const CommWrapper = (widgetName, component) => {
  promise.then(Jupyter => {
    Jupyter.notebook.events.on('kernel_ready.Kernel', function () {
      Jupyter.notebook.kernel.comm_manager.register_target(`${widgetName}_comm`, function (comm, msg) {
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
      })
    })
  })
}

const renderInCell = (Jupyter, reactComponent, msg) => {
  const cell = Jupyter.notebook.get_msg_cell(msg.parent_header.msg_id)
  if (cell.output_area.selector[0]) {
    const output = cell.output_area.selector[0].getElementsByClassName('output')[0]
    const subarea = createSubarea(output)
    ReactDOM.render(reactComponent, subarea)
  }
}

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

const renderInParent = (widgetName, reactComponent, msg) => {
  registry[widgetName] = reactComponent
}
