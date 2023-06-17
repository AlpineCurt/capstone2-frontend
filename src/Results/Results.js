import React, { useState, useEffect } from "react";
import Winner from "./Winner.js";
import Loser from "./Loser.js";

import "./Results.css";

const Results = ({players}) => {

    const [winner, setWinner] = useState({});
    const [losers, setLosers] = useState([]);

    useEffect(() => {
        const playersCopy = [...players];
        playersCopy.sort((a, b) => b.score - a.score);
        setWinner(playersCopy.shift());
        setLosers([...playersCopy]);
    }, []);

    return (
        <div className="Results">
            <div className="Results-winner">
                <Winner
                    name={winner.name}
                    score={winner.score}
                    avatarId={winner.avatarId}
                />
            </div>
            <div className="Results-losers">
                {losers.map(player => (
                    <Loser
                        name={player.name}
                        score={player.score}
                        avatarId={player.avatarId}
                    />
                ))}
            </div>
        </div>
    );
}

export default Results;