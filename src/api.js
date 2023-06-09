import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class TriviaApi {

    static async request (endpoint, data={}, method="get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {};
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async checkGameId (gameId, username) {
        let res = await this.request(`games/${gameId}?username=${username}`);
        return res;
    }

    static async newGameId () {
        let res = await this.request("games/new");
        return res;
    }

    static async tenthHighScore () {
        let res = await this.request("scores/10thhighscore");
        return res;
    }

    static async topTen () {
        let res = await this.request("scores/topten");
        return res.topTen;
    }

    static async newHighScore (username, score) {
        let res = await this.request("scores/new",
            {
                username: username,
                score: score
            },
            "post");
        return res;
    }
}

export default TriviaApi;