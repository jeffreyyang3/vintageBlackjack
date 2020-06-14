//import { Card, Deck, Hand } from "./Cards";
const { Card, Deck, Hand } = require("./Cards");
const url = require("url");
const { Game } = require("./Game");
const { handleMove } = require("./MoveHandlers");
const app = require("express")();

const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//const server = require("express")();
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 6999 }, () => {
  console.log("listening on 6999");
});

const games = {};
const playerWebSockets = {};
function createGame(params) {
  const { gameName, private, password, creatorUsername } = params;
  if (games[gameName]) return { error: "game already exists" };
  games[gameName] = new Game({
    playersData: [{ name: creatorUsername, money: 100, wager: 5 }],
  });
  playerWebSockets[gameName] = {};
  return { gameName };
}

function joinGame(params) {
  const { gameName, private, password, creatorUsername } = params;
  if (!games[gameName]) return { error: "game does not exist" };

  return { success: true, gameName };
}

app.get("/", (req, res) => {
  console.log("hmm");
  res.send("hey");
});

app.post("/api/createGame", (req, res) => {
  res.send(createGame(req.body));
});
app.post("/api/joinGame", (req, res) => {
  res.send(joinGame(req.body));
});

app.listen(6998, () => {
  console.log("http on 6998");
});
function getGame(params) {
  const { username, gameName } = params;
  if (!games[gameName]) return false;
  return games[gameName];
}

//import { Player } from "./Player";

const deck = new Deck();
const hand = new Hand();
let gameCounter = 0;

const exampleGame = new Game({
  gameJSON: false,
  gameID: 0,
  playersData: ["rachel", "chris", "jef"].map((name) => {
    return {
      name,
      money: 100,
      wager: 5,
    };
  }),
});

let copyEx = new Game({ gameJSON: exampleGame.exportGame() });

wss.on("connection", (socket, req) => {
  const params = url.parse(req.url, true).query;
  const { username, gameName } = params;
  const currGame = getGame(params);
  const currGameSockets = playerWebSockets[gameName];
  currGameSockets[username] = socket;

  socket.on("message", (message) => {
    const action = JSON.parse(message);
    console.log(action);

    //copyEx = handleMove(copyEx.exportGame(), {user: "steven", type: "hit"});

    handleMove(currGame, action);
    // if (currGame.done) {
    //   const playerJSON = currGame.exportToPlayer();

    //   currGameSockets.forEach((client) => {
    //     if (client.readyState === WebSocket.OPEN) client.send(playerJSON);
    //   });
    //   //socket.send(copyEx.exportToPlayer());
    //   socket.send(
    //     JSON.stringify({
    //       isNewGame: true,
    //       ...JSON.parse(currGame.exportToPlayer()),

    //     })
    //   );
    // }
    const playerJSON = currGame.exportToPlayer();
    for (let player in currGameSockets) {
      const playerWebSocket = currGameSockets[player];
      if (playerWebSocket.readyState === WebSocket.OPEN)
        playerWebSocket.send(playerJSON);
    }

    // wss.clients.forEach((client) => {
    //   if (client.readyState === WebSocket.OPEN) client.send(playerJSON);
    // });
    socket.send(currGame.exportToPlayer());
  });
  console.log("client connectedd");
  socket.send(currGame.exportToPlayer());
});

//fs.writeFile("test.json", JSON.stringify(exampleGame), () => {});
