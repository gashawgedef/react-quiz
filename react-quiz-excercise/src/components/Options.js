import React from 'react'

function Options() {
  return (
    <div>
         <div className='options'>
        {question.options.map((option)=>(<button className='btn btn-option' key={option}>{option}</button>))}

      </div>
      
    </div>
  )
}

export default Options
