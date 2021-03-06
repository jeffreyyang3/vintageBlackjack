const { Card, Deck, Hand } = require("./Cards");
const { Player } = require("./Player");


class Game {
  constructor({ gameJSON, playersData }) {
    if (gameJSON) {
      this.fromJSON(gameJSON);
      return;
    }

    this.deck = new Deck();

    this.numPlayers = playersData.length;
    this.dealerHand = new Hand();
    this.revealing = false;
    this.betsOpen = true;
    this.dealerHand.dealCards(this.deck.deal(2));

    this.players = playersData.map(player => {
      return new Player(player.name, player.money);
    });

    this.waitingFor = this.players.map(player => player.name);
    this.waitingForBets = this.players.map(player => player.name);
    this.done = false;

    this.players.forEach(player => {
      player.hand.dealCards(this.deck.deal(2));
    });
  }

  nextRound() {
    this.done = false;
    this.betsOpen = true;
    this.deck = new Deck();
    this.dealerHand = new Hand();
    this.dealerHand.dealCards(this.deck.deal(2));
    this.waitingFor = this.players.map(player => player.name);
    this.waitingForBets = this.players.map(player => player.name);

    this.players.forEach(player => {
      player.hand = new Hand();
      player.doubled = false;
      player.hand.dealCards(this.deck.deal(2));
      player.status = "none";
      player.canAct = true;
      player.bet = 10;
    });
  }

  fromJSON(gameJSON) {
    const {
      numPlayers,
      revealing,
      waitingFor,
      deck,
      dealerHand,
      players,
      waitingForBets
    } = JSON.parse(gameJSON);

    this.numPlayers = numPlayers;
    this.revealing = revealing;
    this.waitingFor = waitingFor;

    this.waitingForBets = waitingForBets;
    this.deck = new Deck(deck.cards);
    this.dealerHand = new Hand(dealerHand.cards);
    this.players = players.map(player => {
      player.hand = new Hand(player.hand.cards);
      return player;
    });
  }

  exportGame() {
    return JSON.stringify(this);
  }

  exportToPlayer() {
    const filtered = JSON.parse(JSON.stringify(this));
    filtered.dealerHand.cards = this.obscuredDealerHand();
    if(this.waitingForBets.length){
      filtered.players.forEach(player => {
        player.hand.cards = [
          {num: 420, suit: "hidden"},
          {num: 420, suit: "hidden"}
        ]
      });
    }
    delete filtered.deck;
    return JSON.stringify(filtered);
  }

  obscuredDealerHand() {
    if (!this.waitingFor.length) {
      return this.dealerHand.cards;
    }
    return this.dealerHand.cards.map((card, idx) => {
      if (idx) return new Card("hidden", 420);
      else return card;
    });
  }
}

module.exports = {
  Game
};
