import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import GameContext from "../GameContext";
import TriviaApi from "../api";
import Winner from "./Winner.js";
import Loser from "./Loser.js";
import { v4 as uuid } from 'uuid';

import "./Results.css";

const Results = ({players}) => {

    const { isHost, handleMessage } = useContext(GameContext);
    const [winner, setWinner] = useState({});
    const [losers, setLosers] = useState([]);
    const history = useHistory();

    useEffect(() => {

        const playersCopy = [...players];
        if (playersCopy.length > 1) {
            playersCopy.sort((a, b) => b.score - a.score);
        }

        setWinner(playersCopy[0]);
        
        setLosers([...playersCopy.slice(1)]);
    }, []);

    const resetGame = () => {
        handleMessage("resetGame");
    }

    const handleHighScoresBtn = (e) => {
        e.preventDefault();
        history.push(`/highscores`);
    }

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
                        key={uuid()}
                    />
                ))}
            </div>
            <div className="Results-buttons">
                {isHost &&
                    <div>
                        <button onClick={resetGame}>Play Again?</button>
                    </div>
                }
                <div>
                    <button onClick={handleHighScoresBtn}>High Scores</button>
                </div>
            </div>
            
        </div>
    );
}

export default Results;