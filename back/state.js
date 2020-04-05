//import { Card, Deck, Hand } from "./Cards";
const { Card, Deck, Hand } = require("./Cards");
const { Game } = require("./Game");
const { handleMove } = require("./MoveHandlers");

const fs = require("fs");
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
  gameID: "asdf",
  playersData: ["lyanna", "steven", "jeff"].map((name) => {
    return {
      name,
      money: 100,
      wager: 5
    };
  }),
});
let copyEx = new Game({ gameJSON: exampleGame.exportGame() });


wss.on("connection", socket => {
  socket.on("message", message => {
    const action = JSON.parse(message);
    console.log("message received")


    if(action.type === "move"){

      //copyEx = handleMove(copyEx.exportGame(), {user: "steven", type: "hit"});
      console.log(copyEx.dealerHand)

      handleMove(copyEx, action.data);
      const playerJSON = copyEx.exportToPlayer();
      wss.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN)
          client.send(playerJSON);

      });
      // socket.send(copyEx.exportToPlayer());

    }

  });
  console.log("client connected");
  socket.send(copyEx.exportToPlayer());
});



//fs.writeFile("test.json", JSON.stringify(exampleGame), () => {});
