import React from 'react'

const Animals = ({ animateButtonClick , name1 , name2 , isSlidOut , wikilink1, wikilink2}) => {
  return (
    <div className="box">
        <div className="button-Container">
          <button id="Left-Button" className={`left-button ${isSlidOut ? 'slide-out' : ''}`} onClick={(event) => { animateButtonClick(event, name1); }}>{ name1 || "Click To Start" }</button>
          <a href = {wikilink1} style={{ marginTop: '12px' }}>Wikipedia Link</a>
        </div>
        <img
            src="https://cdn-icons-png.flaticon.com/512/1021/1021261.png"
            width={50}
            height={50}
            style={{ width: 50, height: 50 }}
            alt="Crossed Swords Battle"
            />
        <div className="button-Container">
          <button id="Right-Button" className={`right-button ${isSlidOut ? 'slide-out' : ''}`} onClick={(event) => { animateButtonClick(event, name2); }}>{ name2 || "Click To Start" }</button>
          <a href = {wikilink1} style={{ marginTop: '12px' }}>Wikipedia Link</a>
        </div>
    </div>
  )
}

export default Animals