import LeaderboardElement from "./LeaderboardElement"

const Leaderboard = ({animals}) => {

    return (
        <>
            {animals.map((animal, index) => (
                <LeaderboardElement key={animal.id} percentage={animal.elo_percentage} name={animal.name} wikilink={animal.wikilink}/>
            ))}
        </>
    )
}

export default Leaderboard