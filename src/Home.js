import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import TriviaApi from "./api";
import CurrUserContext from "./CurrUserContext";
import "./Home.css";

const Home = () => {

    const [formData, setFormData] = useState({
        username: "",
        gameId: "",
        remember: false
    });
    const [usernameIsInvalid, setUsernameIsInvalid] = useState(false)
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [gameIdError, setGameIdError] = useState(false);

    const history = useHistory();
    const { setCurrUser } = useContext(CurrUserContext);

    useEffect(() => {
        // Get username from local storage if it exists
        if (localStorage.username) {
            setFormData(data => ({
                ...data,
                username: localStorage.username
            }));
            setUsernameTouched(() => true);
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "username") {
            setUsernameTouched(true);
        }
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleJoinGame = async (e) => {
        e.preventDefault();
        setUsernameIsInvalid(() => false);
        setGameIdError(() => false);

        if (!checkUsername()) return;

        if (formData.gameId === "") {
            setGameIdError(() => "Need a Game Code to join a game");
            return;
        }
        
        localStorage.setItem("username", formData.username);
        setCurrUser(() => formData.username);
        
        try {
            const res = await TriviaApi.checkGameId(formData.gameId.toLocaleLowerCase(), formData.username);
            if (res.gameCheck.exists) {
                if (res.gameCheck.usernameAvailable) {
                    if (res.gameCheck.full) {
                        setGameIdError(() => "Sorry, that game is already full");
                    } else {
                        history.push(`/games/${formData.gameId.toLocaleLowerCase()}`);
                    }
                } else {
                    setUsernameIsInvalid(() => true);
                    setUsernameError(() => "Username already in use in that game");
                }
            } else {
                setGameIdError(() => "Game Code not found");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleNewGame = async (e) => {
        e.preventDefault();

        if (!checkUsername()) return;

        localStorage.setItem("username", formData.username);
        setCurrUser(() => formData.username);

        try {
            const res = await TriviaApi.newGameId();
            history.push(`/games/${res.gameId}`);
        } catch (err) {
            console.error(err);
        }
    }

    const handleHighScores = (e) => {
        e.preventDefault();
        history.push(`/highscores`);
    }

    const handleRules = (e) => {
        e.preventDefault();
        history.push("/rules");
    }

    const checkUsername = () => {
        // validate username
        setUsernameTouched(true);
        if (formData.username === "") {
            setUsernameError(() => "Username is required");
            setUsernameIsInvalid(true);
            return false;
        }
        return true;
    }

    return (
        <div className="Home">
            <h1>Super Amazing Trivia Game! Wow!</h1>
            <div className="row">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    placeholder={localStorage.username}
                />
                <p><span className="danger">{usernameIsInvalid && usernameTouched ? usernameError : <br></br>}</span></p>
            </div>
            <div className="row">
                <label htmlFor="gameId">Game Code</label>
                <input
                    type="text"
                    id="gameId"
                    name="gameId"
                    onChange={handleChange}
                    style={{"textTransform":"uppercase"}}
                />
                <button onClick={handleJoinGame}>Join Game</button>
                <p><span className="danger">{gameIdError ? gameIdError : <br></br>}</span></p>
            </div>
            <div className="row">
                <button className="Home-newGameBtn" onClick={handleNewGame}>New Game</button>
            </div>
            <div className="row">
                <button className="Home-highScoresBtn" onClick={handleHighScores}>High Scores</button>
                <button className="Home-rulesCreditsBtn" onClick={handleRules}>Rules and Credits</button>
            </div>
        </div>
    );
}

export default Home;