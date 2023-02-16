import React from 'react'

const Choices = ({ handleNewActivity, handleAddActivity, name }) => {

  return (
    <div>
      <button class id="primary-btn" onClick={() => handleNewActivity()}>No thanks...</button>
      <button id="success-btn" onClick={() => handleAddActivity(name)}>Sounds fun!</button>
      
    </div>
  )
}

export default Choices