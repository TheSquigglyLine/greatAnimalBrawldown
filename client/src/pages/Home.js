import React, { useState, useEffect } from 'react'
import animalService from '../services/animals'
import Animals from '../components/Animals'

function Home() {
    const [animal1Name, setAnimal1Name] = useState('')
    const [animal2Name, setAnimal2Name] = useState('')
    const [animal1wiki, setAnimal1wiki] = useState('')
    const [animal2wiki, setAnimal2wiki] = useState('')
    const [isSlidOut, setIsSlidOut] = useState(false);

    useEffect(() => {
        animalService
            .getAnimalChoices()
            .then(data => {
                setAnimal1Name(data.animal1.name)
                setAnimal1wiki(data.animal1.wikilink)
                setAnimal2Name(data.animal2.name)
                setAnimal2wiki(data.animal2.wikilink)
            })
    }, [])

    const animateButtonClick = (event, choice) => {
        const clickedButton = event.target;
        if (isSlidOut) {
            return
        } else {
            setIsSlidOut(true)
        }

        clickedButton.style.backgroundColor = '#32a852'

        setTimeout(() => {
            handleAnimalChoice(event, choice)
        }, 1000);
    }

    const handleAnimalChoice = (event, choice) => {
        const clickedButton = event.target;
        animalService
            .postAnimalChoice(animal1Name, animal2Name, choice)
            .then(data => {
                setAnimal1Name(data.animal1.name)
                setAnimal1wiki(data.animal1.wikilink)
                setAnimal2Name(data.animal2.name)
                setAnimal2wiki(data.animal2.wikilink)
                clickedButton.style.backgroundColor = '#0086E0'
                setIsSlidOut(false)
            })
    }

    return (
        <main id="page-wrap">
            <h1 className="header">The Great Animal Brawldown</h1>
            <h3 className="subheader">Discovering the fiercest creatures on Earth, one brawl at a time.</h3>
            <Animals animateButtonClick={animateButtonClick} name1={animal1Name} name2={animal2Name} isSlidOut={isSlidOut} wikilink1={animal1wiki} wikilink2={animal2wiki} />
        </main>
    );
}


export default Home;