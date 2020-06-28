const { Game } = require("./Game");
class GamesStateHandler {

    constructor() {
        this.games = {};
    }

    createGame(params) {
        const { gameName, creatorUsername } = params;
        if (this.games[gameName]) return { error: "game already exists" };
        this.games[gameName] = new Game({
            playersData: [{ name: creatorUsername, money: 100, wager: 5 }],
        });
        return { gameName };
    }

    joinGame(params) {
        console.log(params);
        const { gameName, password, username } = params;
        const currGame = this.games[gameName];
        if (!currGame) return { error: "game does not exist" };
        if (!currGame.players.filter((player) => player.name === username).length)
            currGame.addPlayer({ username, money: 100 });
        //currGame.players.push(new Player(username, 100));
        return { success: true, gameName };
    }

    getGame(params) {
        const { username, gameName } = params;
        if (!this.games[gameName]) return false;
        return this.games[gameName];
    } 
 
}

module.exports = {
    GamesStateHandler
}