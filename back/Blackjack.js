const { Card, Deck, Hand } = require("./Cards");
const { Player } = require("./Player");

class Game {
  constructor({gameJSON, playersData}) {
    if(gameJSON){
      console.log("tripped");
      return;
    }
    this.deck = new Deck();
    this.numPlayers = playersData.length;
    this.dealerHand = new Hand();
    this.dealerRevealed = false;
    this.dealerHand.dealCards(this.deck.deal(2));

    this.players = playersData.map(player => {
      return new Player(player.name, player.money);
    });


    this.players.forEach(player => {
      player.hand.dealCards(this.deck.deal(2));
    });
  }

  exportGame(){
    return JSON.stringify(this);
  }

  exportPlayerCopy(){
    return JSON.stringify({
      dealerHand: [this.dealerHand.cards[0]],
      players: this.players
    });
  }
}

module.exports = {
  Game
};
