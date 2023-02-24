import React from 'react'
/* import { RiSwordLine } from "react-icons/ri"; */

const Animals = ({ animateButtonClick, name1, name2, isSlidOut, wikilink1, wikilink2 }) => {
  return (
    <div className="voter">
      <div className={`button-Container-left ${isSlidOut ? 'slide-out' : ''}`}>
        <button id="Left-Button" className='left-button' onClick={(event) => { animateButtonClick(event, name1); }}>
          <img className="button-img" src={`/animalImages/${name1}.jpg`} alt='button' />
        </button>
        <a className='wikilink' href={wikilink1} target="_blank" rel="noreferrer">{name1}</a>
      </div>
      <div className='fight-symbol'>
        {/* <RiSwordLine
          size={50}
          color="#ffdc13"
          style={{ display: 'block' }}
        /> */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1021/1021261.png"
          width={50}
          height={50}
          style={{ display: 'block' }}
          alt="Crossed Swords Battle"
        />
      </div>
      <div className={`button-Container-right ${isSlidOut ? 'slide-out' : ''}`}>
        <button id="Right-Button" className='right-button' onClick={(event) => { animateButtonClick(event, name2); }}>
          <img className="button-img" src={`/animalImages/${name2}.jpg`} alt='button' /></button>
        <a className='wikilink' href={wikilink2} target="_blank" rel="noreferrer">{name2}</a>
      </div>
    </div>
  )
}

export default Animals