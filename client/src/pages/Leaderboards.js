import React, { useState, useEffect } from 'react'
import animalService from '../services/animals'
import Leaderboard from "../components/Leaderboard"

const Leaderboards = () => {

    const [animals, setAnimals] = useState([
        {
            id: 1,
            name: 'Test 1 abc',
            elo_percentage: 80,
            wikilink: 'https://wikipedia.org/wiki/boar',
            ratings: 200
        },
        {
            id: 2,
            name: 'Test 2 ABD',
            elo_percentage: 0,
            wikilink: 'https://wikipedia.org/wiki/boar',
            ratings: 200
        }]);
    const [filteredAnimals, setFilteredAnimals] = useState([])

    useEffect(() => {
        animalService
            .getAllAnimals()
            .then(data => {
                if (Array.isArray(data)) {
                    setAnimals(data);
                    setFilteredAnimals(data);
                }
            })
    }, []);

    return (
        <main id="page-wrap">
            <h1 className="header">Leaderboard</h1>
            <div className="container">
                <Leaderboard animals={animals} filteredAnimals={filteredAnimals} setFilteredAnimals={setFilteredAnimals}/>
            </div>
        </main>
    )
}

export default Leaderboards