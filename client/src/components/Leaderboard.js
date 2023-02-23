import LeaderboardElement from "./LeaderboardElement"
import LeaderboardFilter from "./LeaderboardFilter"

const Leaderboard = ({ animals, filteredAnimals, setFilteredAnimals }) => {

    return (
        <>
            <LeaderboardFilter animals={animals} setFilteredAnimals={setFilteredAnimals} />
            {filteredAnimals.map((animal, index) => (
                <LeaderboardElement key={animal.id} percentage={animal.elo_percentage} name={animal.name} wikilink={animal.wikilink} />
            ))}
        </>
    )
}

export default Leaderboard