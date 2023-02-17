import React from 'react'

const Animals = ({ handleAnimalChoice , animateButtonClick , name1 , name2 , isSlidOut }) => {
  return (
    <div className="box">
        <button id="Left-Button" className={`left-button ${isSlidOut ? 'slide-out' : ''}`} onClick={(event) => { animateButtonClick(event); handleAnimalChoice({ name1 }); }}>{ name1 || "Click To Start" }</button>
        <img
            src="https://cdn-icons-png.flaticon.com/512/1021/1021261.png"
            width={50}
            height={50}
            style={{ width: 50, height: 50 }}
            alt="Crossed Swords Battle"
            />
        <button id="Right-Button" className={`right-button ${isSlidOut ? 'slide-out' : ''}`} onClick={(event) => { animateButtonClick(event); handleAnimalChoice(name2); }}>{ name2 || "Click To Start" }</button>
    </div>
  )
}

export default Animals