//import { Card, Deck, Hand } from "./Cards";
const { Card, Deck, Hand } = require("./Cards");
const { Game } = require("./Blackjack");
//import { Player } from "./Player";

const deck = new Deck();
const hand = new Hand();

const games = [
  new Game({
    gameJSON: false,
    gameID: 1,
    playersData: ["jeff", "steven"].map(name => {
      return {
        name,
        money: 100
      };
    })
  })
];

console.log(JSON.stringify(games[0]));
