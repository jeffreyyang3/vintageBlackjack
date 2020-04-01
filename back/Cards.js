
class Card {
  constructor(suit, num) {
    this.num = num;
    this.suit = suit;
  }

  getFileName() {
    const mapping = {
      Clubs: "c",
      Spades: "s",
      Diamonds: "d",
      Hearts: "h"
    };

    let fileNum = this.num;
    if (this.num < 10) fileNum = `0${this.num}`;

    return `${mapping[this.suit]}`;
  }

  getDisplayName() {
    const mapping = {
      1: "Ace",
      11: "Jack",
      12: "Queen",
      13: "King"
    };

    return `${mapping[this.num] ? mapping[this.num] : this.num}`;
  }
}
class Deck {
  constructor(deckStr) {
    const suits = ["Clubs", "Spades", "Diamonds", "Hearts"];
    if(deckStr !== undefined){
        this.cards = JSON.parse(deckStr);

    } else {
      const nums = [...new Array(13)].map((_, idx) => {
        return idx + 1;
      });

      this.cards = [];

      suits.forEach(suit => {
        nums.forEach(num => {
          this.cards.push(new Card(suit, num));
        });
      });

    }


  }

  deal(num){

    const out = [];
    for(let i = 0; i < num; i++){
      out.push(this.cards.pop());
    }
    return out;

  }

  recycle(card) {
    this.cards.unshift(card);
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

class Hand {
  constructor() {
    this.cards = [];
  }

  dealCards(cardList) {
    cardList.forEach(card => {
      this.cards.push(card);
    });
  }


  exportHand() {
    return JSON.stringify(this.cards);
  }

  importHand() {}

  printHand() {
    let displayStr = "";
    this.cards.forEach(card => {
      displayStr += card.getDisplayName(); // o(1)
    });
    console.log(displayStr);
    console.log(`total is ${this.sumHand(this.cards)}`);
  }
  sumHand(hand) {
    let aceUsed = false;
    let total = 0;

    hand.forEach(card => {
      if (card.num === 1 && !aceUsed) {
        total += 11;
        aceUsed = true;
      } else {
        total += Number(card.num > 10 ? 10 : card.num);
      }
    });

    if (total > 21) {
      if (aceUsed) total -= 10;
    }

    return total;
  }
}


module.exports = {
  Card,
  Deck,
  Hand
};
