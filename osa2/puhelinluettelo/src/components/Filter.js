import React from 'react'

const Filter = ({value, changeFunction}) => {
  return (
  <div>filter shown with <input value={value} onChange={changeFunction}></input></div>
  )
}

export default Filter