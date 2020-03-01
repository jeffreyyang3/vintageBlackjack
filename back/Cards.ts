export class Card {
  suit: string;
  num: number;

  constructor(suit: string, num: number){
      this.suit = suit;
      this.num = num;
  }

  getFileName(){

      const mapping : Record<string, string> = {
        "Clubs": "c",
        "Spades": "s",
        "Diamonds": "d",
        "Hearts": "h"
      };

      let fileNum = String(this.num);
      if(this.num < 10) fileNum = `0${this.num}`;

      return `${mapping[this.suit]}`

  }

  getDisplayName() {
    const mapping : Record<string, string> = {
      1: "Ace",
      11: "Jack",
      12: "Queen",
      13: "King"
    };

    return `${mapping[this.num] ? mapping[this.num] : this.num}`;
  }

}
export class Deck {
    cards: Array<Card>;

    constructor() {
      const suits = ["Clubs", "Spades", "Diamonds", "Hearts"];
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

    draw() : Card {
        return <Card> this.cards.pop();
    }

    recycle(card : Card){
        this.cards.unshift(card);
    }


    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ this.cards[i],  this.cards[j]] = [ this.cards[j],  this.cards[i]];
      }
    }

}

export class Hand {

  hand: Array<Card>;

  constructor() {
    this.hand = [];
  }

  add(card : Card) {
      this.hand.push(card);
  }

  printHand() {
    let displayStr = "";
    this.hand.forEach(card => {
      displayStr += card.getDisplayName(); // o(1)
    });
    console.log(displayStr);
    console.log(`total is ${this.sumHand(this.hand)}`);
  }
    sumHand(hand : Array<Card>) {
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




