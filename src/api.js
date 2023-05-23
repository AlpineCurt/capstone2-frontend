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

    static async checkGameId (gameId) {
        let res = await this.request(`games/${gameId}`);
        return res;
    }

    static async newGameId () {
        let res = await this.request("games/new");
        return res;
    }
}

export default TriviaApi;