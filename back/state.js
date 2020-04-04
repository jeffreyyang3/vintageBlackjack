//import { Card, Deck, Hand } from "./Cards";
const { Card, Deck, Hand } = require("./Cards");
const { Game } = require("./Blackjack");
//const server = require("express")();
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 6999 }, () => {
  console.log("listening on 6999");
});

//import { Player } from "./Player";

const deck = new Deck();
const hand = new Hand();

const exampleGame = new Game({
  gameJSON: false,
  gameID: 0,
  playersData: ["jeff", "steven", "lyanna"].map((name) => {
    return {
      name,
      money: 100,
    };
  }),
});

const playerFilter = (game) => {
  const filtered = { ...game };
  filtered.dealerHand.cards = game.obscuredDealerHand();
  delete filtered.deck;
  return filtered;
};

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(`received ${message}`);
  });
  console.log("client connected");
  socket.send(JSON.stringify(playerFilter(exampleGame)));
});
