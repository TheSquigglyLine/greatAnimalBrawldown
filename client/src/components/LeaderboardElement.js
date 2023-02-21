import React, { useState, useEffect } from 'react'

const LeaderboardElement = ({ percentage, name , wikilink}) => {

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        setPercent(percentage);
    }, [percentage]);

    return (
        <div className="leaderbaord-bar">
            <div
                className="leaderbaord-bar-fill"
                style={{
                    width: `${percent}%`,
                    height: '100%',
                }}
            />
            <span className="leaderboard-bar-text">
                {name}
            </span>
        </div>
    );
}

export default LeaderboardElement