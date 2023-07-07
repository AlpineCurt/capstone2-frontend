import React from "react";
import { useHistory } from "react-router-dom";
import "./Rules.css";

const Rules = () => {

    const history = useHistory();
    const qCount = process.env.QUESTION_COUNT  || 10;
    const qTime = process.env.TIMER_LENGTH || 20;
    const penalty = process.env.TIMEOUT_PENALTY || 20;

    const handleBack = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div className="Rules">
            <h1>Rules</h1>
            <p className="quote">{`"This is the best trivia game I've ever played!" - Future You (probably)`}</p>
            <ol>
                <li><span>{`There will be ${qCount} questions per game.`}</span></li>
                <li><span>{`You will have ${qTime} seconds to answer each question.`}</span></li>
                <li><span>The quicker you answer, the more points you'll receive.</span></li>
                <li><span>Wrong answers will receive no points and no point penalty.</span></li>
                <li><span>{`If you don't answer, you'll receive a ${penalty} point penalty.`}</span></li>
            </ol>
            <button className="Rules-Back-btn" onClick={handleBack}>Back</button>
            <div className="Credits">
                <p>
                    Developed by Curt Davidson <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/curt-davidson1/">LinkedIn</a>                    
                </p>
                <p>
                    Avatar Images credit <a target="_blank" rel="noopener noreferrer" href="https://www.freepik.com/free-vector/different-characters-collection_1111059.htm#query=game%20avatar&position=21&from_view=keyword&track=ais">Image by kubanek</a> on Freepik
                </p>
                <p>
                    Button Styling and Animations <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/meowlivia_">Olivia Ng</a>
                </p>
                <p>
                    Fonts by <a target="_blank" rel="noopener noreferrer" href="https://fonts.google.com/specimen/Pangolin">Kevin Burke</a> and <a href="https://fonts.google.com/specimen/Luckiest+Guy">Astigmatic</a>
                </p>
                <p>
                    Fonts by <a target="_blank" rel="noopener noreferrer" href="https://fonts.google.com/specimen/Pangolin">Kevin Burke</a> and <a href="https://fonts.google.com/specimen/Luckiest+Guy">Astigmatic</a>
                </p>
            </div>
        </div>
    );
}

export default Rules;