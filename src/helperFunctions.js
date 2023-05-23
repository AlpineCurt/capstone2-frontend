function makeGameId () {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let gameId = "";

    for (let i = 0; i < 5; i++) {
        let randletter = Math.floor(Math.random() * 26);
        gameId += letters[randletter];
    }
    return gameId;
}

export { makeGameId };