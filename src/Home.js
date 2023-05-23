import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import TriviaApi from "./api";
import CurrUserContext from "./CurrUserContext";

const Home = () => {

    const [formData, setFormData] = useState({
        username: "",
        gameId: "",
        remember: false
    });

    const history = useHistory();
    const { setCurrUser } = useContext(CurrUserContext);

    useEffect(() => {
        // Get username from local storage if it exists
        if (localStorage.username) {
            setFormData(data => ({
                ...data,
                username: localStorage.username
            }));
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (e.target.type === "checkbox") {
            setFormData(data => ({
                ...data,
                [name]: e.target.checked
            }));
        } else {
            setFormData(data => ({
                ...data,
                [name]: value
            }));
        }
    }

    const handleJoinGame = async (e) => {
        if (formData.remember) {
            localStorage.setItem("username", formData.username);
        } else {
            localStorage.removeItem("username");
        }

        setCurrUser(formData.username);
        
        try {
            const res = await TriviaApi.checkGameId(formData.gameId.toLocaleLowerCase());
            if (res.exists) {
                history.push(`/games/${formData.gameId.toLocaleLowerCase()}`);
            } else {
                console.log("game id does NOT exist!");
                // need to display message to user
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleNewGame = async (e) => {
        
        if (formData.remember) {
            localStorage.setItem("username", formData.username);
        } else {
            localStorage.removeItem("username");
        }

        setCurrUser(formData.username);

        try {
            const res = await TriviaApi.newGameId();
            history.push(`/games/${res.gameId}`);
        } catch (err) {
            console.error(err);
        }
    } 

    return (
        <div>
            <h1>Trivia Title!</h1>
            <dir>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    placeholder={localStorage.username}
                />
                <label htmlFor="remember">Remeber Me</label>
                <input
                    type="checkbox"
                    name="remember"
                    onChange={handleChange}
                    checked={formData.remember}
                />
            </dir>
            <dir>
                <label htmlFor="gameId">Game ID</label>
                <input
                    type="text"
                    id="gameId"
                    name="gameId"
                    onChange={handleChange}
                    style={{"text-transform":"uppercase"}}
                />
                <button onClick={handleJoinGame}>Join Game</button>
            </dir>
            <dir>
                <button onClick={handleNewGame}>New Game</button>
            </dir>
        </div>
    );
}

export default Home;