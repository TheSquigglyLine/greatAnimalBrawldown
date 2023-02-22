import React, { useState, useEffect } from 'react'
import animalService from '../services/animals'
import { RiSwordLine } from "react-icons/ri";
import VoteButton from '../components/VoteButton'

function Home() {
    const [animal1, setAnimal1] = useState([
        {
            id: 1,
            name: 'test 1',
            wikilink: 'https://wikipedia.org/wiki/boar',
        }])
    const [animal2, setAnimal2] = useState([
        {
            id: 2,
            name: 'test 2',
            wikilink: 'https://wikipedia.org/wiki/cow',
        }])
    const [slideOut, setSlideOut] = useState(false);

    useEffect(() => {
        animalService
            .getAnimalChoices()
            .then(data => {
                setAnimal1(data.animal1)
                setAnimal2(data.animal2)
            })
    }, [])

    const vote = (event, choice) => {
        const clickedButton = event.target;
        if (slideOut) {
            return
        } else {
            setSlideOut(true)
        }

        clickedButton.style.backgroundColor = '#32a852'

        setTimeout(() => {
            handleAnimalChoice(event, choice)
        }, 1000);
    }

    const handleAnimalChoice = (event, choice) => {
        const clickedButton = event.target;
        animalService
            .postAnimalChoice(animal1.name, animal2.name, choice)
            .then(data => {
                setAnimal1(data.animal1)
                setAnimal2(data.animal2)
                clickedButton.style.backgroundColor = '#0086E0'
                setSlideOut(false)
            })
    }


    return (
        <main id="page-wrap">
            <h1 className="header">The Great Animal Brawldown</h1>
            <h3 className="subheader">Discovering the fiercest creatures on Earth, one brawl at a time.</h3>
            <div className="voter">
                <VoteButton className={`button-Container-left ${slideOut ? 'slide-out' : ''}`} vote={vote} animal={animal1} />
                <RiSwordLine
                    width={50}
                    height={50}
                    style={{ display: 'block' }}
                />
                <VoteButton className={`button-Container-right ${slideOut ? 'slide-out' : ''}`} vote={vote} animal={animal2} />
            </div>
        </main>
    );
}


export default Home;