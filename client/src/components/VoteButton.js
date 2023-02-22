const VoteButton = ({ vote, animal }) => {
    return (
        <div>
            <button id="Left-Button" className='left-button' onClick={(event) => { vote(event, animal.name); }}>{animal.name || "Click To Start"}</button>
            <a className='wikilink' href={animal.wikilink} target="_blank" rel="noreferrer">Wikipedia Link</a>
        </div>
    )
}

export default VoteButton