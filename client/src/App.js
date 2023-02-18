import React, { useState, useEffect } from 'react'
import activityService from './services/activities'
import Animals from './components/Animals'

function App() {
  const [animal1Name, setAnimal1Name] = useState('')
  const [animal2Name, setAnimal2Name] = useState('')
  const [animal1wiki, setAnimal1wiki] = useState('')
  const [animal2wiki, setAnimal2wiki] = useState('')
  const [isSlidOut, setIsSlidOut] = useState(false);

  useEffect(() => {
    activityService
      .getAnimalChoices()
      .then(data => {
        setAnimal1Name(data[0].name)
        setAnimal1wiki(data[0].wikilink)
        setAnimal2Name(data[1].name)
        setAnimal2wiki(data[1].wikilink)
      }) 
  }, [])

  const animateButtonClick = (event, choice) => {
    const clickedButton = event.target;
    if (isSlidOut) {
        return
    } else {}

        clickedButton.style.backgroundColor = '#32a852'

        setTimeout(() => {
            setIsSlidOut(true)
            handleAnimalChoice(event, choice)
        }, 1000);
  } 

  const handleAnimalChoice = (event, choice) => {
    const clickedButton = event.target;
    activityService
      .postAnimalChoice(animal1Name,animal2Name,choice)
      .then(data => {
        console.log(data)
        setAnimal1Name(data[0].name)
        setAnimal1wiki(data[0].wikilink)
        setAnimal2Name(data[1].name)
        setAnimal2wiki(data[1].wikilink)
        clickedButton.style.backgroundColor = '#0086E0'
        setIsSlidOut(false)
      })
  }

  return (
    
  <div className="container">
    <h1 className="header">The Great Animal Brawldown</h1>
    <h3 className="subheader">
      Discovering the fiercest creatures on Earth, one brawl at a time.
    </h3>
    <div className="body">
      <Animals animateButtonClick={animateButtonClick} name1={animal1Name} name2={animal2Name} isSlidOut={isSlidOut} wikilink1={animal1wiki} wikilink2={animal2wiki}/>
    </div>
    
  </div>
  );
}

export default App;
