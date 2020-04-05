const { Game } = require("./Game");

function handleMove(game, move) {
  // const game = new Game({ gameJSON });
  const player = findPlayer(game, move.user);

  function doubleHandler() {
    player.doubled = true;
    hitHandler();
  }

  function standHandler() {
    game.waitingFor = game.waitingFor.filter((name) => name !== player.name);
    player.canAct = false;
  }

  function hitHandler() {
    player.hand.dealCards(game.deck.deal(1));
    if (player.hand.sumHand() >= 21 || player.doubled) {
      player.canAct = false;
      game.waitingFor = game.waitingFor.filter((name) => name !== player.name);
    }
  }
  function dealerMove() {
    let dealerScore = game.dealerHand.sumHand();
    while (dealerScore <= 17) {
      game.dealerHand.dealCards(game.deck.deal(1));
      dealerScore = game.dealerHand.sumHand();
    }
    game.players.forEach((player) => {
      const score = player.hand.sumHand();
      if (score > 21) player.status = "lose";
      else if (dealerScore !== score) {
        if (dealerScore > 21) player.status = "win";
        else player.status = dealerScore > score ? "lose" : "win";
      } else {
        player.status = "push";
      }
    });
  }

  if (move.type === "hit") hitHandler();
  else if (move.type === "stand") standHandler();
  else doubleHandler();

  if (!game.waitingFor.length) {
    dealerMove();
  }

  return game;
}

function findPlayer(game, name) {
  for (let i = 0; i < game.numPlayers; i++) {
    if (game.players[i].name === name) return game.players[i];
  }

  console.log(`player ${name} not found!`);
}
module.exports = {
  handleMove,
};
