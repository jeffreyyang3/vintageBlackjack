const { handleMove } = require("./MoveHandlers");
const url = require("url");
const WebSocket = require("ws");
class PlayerConnectionHandler {
  constructor(gamesStateHandler, wss) {
      this.gamesStateHandler = gamesStateHandler;
      this.wss = wss;
      this.playerWebSockets = {};

  }

  socketConnectHandler (socket, req) {
    console.log("socket connected")

    const params = url.parse(req.url, true).query;
    const { username, gameName } = params;
    console.log(this);
    const currGame = this.gamesStateHandler.getGame(params);
    console.log(currGame);
    if(!this.playerWebSockets[gameName]) this.playerWebSockets[gameName] = {};
    const currGameSockets = this.playerWebSockets[gameName];
    currGameSockets[username] = socket;

    socket.on("message", (message) => {

      const action = JSON.parse(message);
      console.log(action);
      handleMove(currGame, action);
      const playerJSON = currGame.exportToPlayer();
      for (let player in currGameSockets) {
        const playerWebSocket = currGameSockets[player];
        if (playerWebSocket.readyState === WebSocket.OPEN)
          playerWebSocket.send(playerJSON);
      }
      socket.send(currGame.exportToPlayer());
    });
    socket.send(currGame.exportToPlayer());
  }
}

module.exports = {
    PlayerConnectionHandler
}