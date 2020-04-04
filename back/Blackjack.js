const { Card, Deck, Hand } = require("./Cards");
const { Player } = require("./Player");

class Game {
  constructor({ gameJSON, playersData }) {
    if (gameJSON) {
      console.log("tripped");
      return;
    }
    this.deck = new Deck();

    this.numPlayers = playersData.length;
    this.dealerHand = new Hand();
    this.revealing = false;
    this.dealerHand.dealCards(this.deck.deal(2));

    this.players = playersData.map((player) => {
      return new Player(player.name, player.money);
    });

    this.players.forEach((player) => {
      player.hand.dealCards(this.deck.deal(2));
    });
  }

  exportGame() {
    return JSON.stringify(this);
  }

  obscuredDealerHand() {
    if (this.dealerHand.cards.length > 2 || this.revealing) {
      return this.dealerHand.cards;
    }
    return this.dealerHand.cards.map((card, idx) => {
      if (idx) return new Card("hidden", 420);
      else return card;
    });
  }
}

module.exports = {
  Game,
};
