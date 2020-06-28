//import { Card, Deck, Hand } from "./Cards";
const { Card, Deck, Hand } = require("./Cards");

const { Player } = require("./Player");

const { Game } = require("./Game");
const { handleMove } = require("./MoveHandlers");
const app = require("express")();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
//const server = require("express")();
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 6999 }, () => {
  console.log("listening on 6999");
});

const { GamesStateHandler } = require("./GamesStateHandler");
const gamesStateHandler = new GamesStateHandler();

const { PlayerConnectionHandler }= require("./PlayerConnectionHandler");
const playerConnectionHandler = new PlayerConnectionHandler(gamesStateHandler, wss);


app.get("/", (req, res) => {
  console.log("hmm");
  res.send("hey");
});

app.post("/api/createGame", (req, res) => {
  res.send(gamesStateHandler.createGame(req.body));
});
app.get("/api/joinGame", (req, res) => {
  res.send(gamesStateHandler.joinGame(req.query));
});
app.listen(6998, () => {
  console.log("http on 6998");
});

wss.on("connection", (socket, req) => playerConnectionHandler.socketConnectHandler(socket, req));

//fs.writeFile("test.json", JSON.stringify(exampleGame), () => {});
