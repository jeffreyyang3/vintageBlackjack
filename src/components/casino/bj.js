const suits = ["Clubs", "Spades", "Diamonds", "Hearts"];
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

const getLine = prompt =>
  new Promise((resolve, _) => {
    readline.question(`${prompt}\n`, response => {
      resolve(response);
    });
  });

const nums = [...new Array(13)].map((_, idx) => {
  return `${idx + 1}`;
});

const cards = [];

suits.forEach(suit => {
  nums.forEach(num => {
    cards.push({ suit, num });
  });
});

shuffle(cards);

function getDisplayName({ num }) {
  const mapping = {
    1: "Ace",
    11: "Jack",
    12: "Queen",
    13: "King"
  };

  return `${mapping[num] ? mapping[num] : num}`;
}

function sumHand(hand) {
  let aceUsed = false;
  let total = 0;

  for (card of hand) {
    if (card.num === 1 && !aceUsed) {
      total += 11;
      aceUsed = true;
    } else {
      total += Number(card.num > 10 ? 10 : card.num);
    }
  }

  if (total > 21) {
    if (aceUsed) total -= 10;
  }

  return total;
}

function printHand(hand) {
  let displayStr = "";
  hand.forEach(card => {
    displayStr += `${getDisplayName(card)} `; // o(1)
  });
  console.log(displayStr);
  console.log(`total is ${sumHand(hand)}`);
}

const asdf = async () => {
  let money = 100;
  while (true) {
    console.log("NEW ROUND");
    console.log(`you have $${money}`);
    const dealerHand = [cards.pop(), cards.pop()];
    const hand = [cards.pop(), cards.pop()];

    let score = sumHand(hand);
    let bet = 5;

    if (sumHand(dealerHand) == 21) {
      console.log("Dealer blackjack");
    } else {
      console.log(`Dealer shows ${getDisplayName(dealerHand[0])}`);
      console.log(
        `You have ${getDisplayName(hand[0])} and ${getDisplayName(hand[1])} `
      );

      let choice;

      while (!choice || choice === "hit") {
        choice = await getLine("hit stand double");

        if (choice !== "stand") {
          if (choice === "double") bet *= 2;
          const newCard = cards.pop();
          hand.push(newCard);

          score = sumHand(hand);

          console.log(`You drew ${getDisplayName(newCard)}`);
          console.log("Your hand is now");
          printHand(hand);

          if (score >= 21) {
            if (score == 21) console.log("Blackjack");
            else console.log("Bust");
            break;
          }
        }
      }
    }

    console.log("dealer reveals:");
    printHand(dealerHand);

    while (sumHand(dealerHand) < 17) {
      const newCard = cards.pop();
      dealerHand.push(newCard);

      console.log(`dealer draws ${getDisplayName(newCard)}`);
    }

    const dealerScore = sumHand(dealerHand);

    console.log(`dealer: ${dealerScore} you: ${score}`);
    let status;

    if (dealerScore !== score || score > 21) {
      if (score > 21 || (dealerScore <= 21 && score < dealerScore)) {
        status = "lose";
      } else status = "win";
    } else {
      status = "push";
    }

    if (status === "win") {
      console.log("you win!");
      money += bet;
    } else if (status === "lose") {
      console.log("you lose!");
      money -= bet;
    } else console.log("pushed");

    dealerHand.concat(hand).forEach(card => {
      cards.unshift(card);
    });
  }
};
asdf();
