import React, { useState, useEffect } from 'react'
import animalService from '../services/animals'
import Leaderboard from "../components/Leaderboard"
import LeaderboardFilter from '../components/LeaderboardFilter';

const Leaderboards = () => {

    const [animals, setAnimals] = useState([
        {
            id: 1,
            name: 'test 1 abc',
            elo: 20,
            elo_percentage: 80,
            wikilink: 'https://wikipedia.org/wiki/boar',
            ratings: 200
        },
        {
            id: 2,
            name: 'test 2 abd',
            elo: 30,
            elo_percentage: 20,
            wikilink: 'https://wikipedia.org/wiki/boar',
            ratings: 200
        }]);

    /* const filterAnimals = async (filter) => {
        const filteredList = animals.filter((item) => {
            return item === filter.toLowerCase() || item.name.toLowerCase().includes(filter.toLowerCase());
        });
        setAnimals(filteredList)
    }


    const list = ["apple", "banana", "pear", "orange", "grape"];
    const searchQuery = "AN";

    const filteredList = list.filter((item) => {
        return item === searchQuery.toLowerCase() || item.toLowerCase().includes(searchQuery.toLowerCase());
    });

    console.log(filteredList); */

    useEffect(() => {
        animalService
            .getAllAnimals()
            .then(data => {
                if (Array.isArray(data)) {
                    setAnimals(data);
                }
            })
    }, []);

    return (
        <main id="page-wrap">
            <h1 className="header">Leaderboard</h1>
            <div className="container">
                {/* <LeaderboardFilter filterAnimals={filterAnimals} /> */}
                <Leaderboard animals={animals} />
            </div>
        </main>
    )
}

export default Leaderboards