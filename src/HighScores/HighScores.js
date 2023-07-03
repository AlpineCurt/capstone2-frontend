import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import Score from "./Score";
import TriviaApi from "../api";
import { v4 as uuid } from 'uuid';

import "./HighScores.css";

const HighScores = () => {

    const [ loading, setLoading ] = useState(true);
    const [ highScores, setHighScores] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function getTopTen() {
            const topTen = await TriviaApi.topTen();
            setHighScores([...topTen]);
        }
        getTopTen();
        setLoading(false);
    }, []);

    const handleBack = (e) => {
        e.preventDefault();
        history.goBack();
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="HighScores">
            <h1>High Scores</h1>
            <div className="HighScores-display">
                <div></div>
            {highScores.map(highScore => (
                <Score
                    username={highScore.username}
                    score={highScore.score}
                    key={uuid()}
                />
            ))}
            </div>
            <div className="row">
                <button className="HighScores-Back-btn" onClick={handleBack}>Back</button>
            </div>
        </div>
    )
}

export default HighScores;