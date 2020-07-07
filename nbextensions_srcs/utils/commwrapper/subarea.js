import React from 'react'

const SubArea = (props) => (
  <div className='output_area'>
    <div className='prompt' />
    <div className='output_subarea output_result'>
      {props.reactComponent}
    </div>
  </div>
)

export default SubArea
