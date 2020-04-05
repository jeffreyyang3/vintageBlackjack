const { Game } = require("./Game");

function findPlayer(game, name) {
  for (let i = 0; i < game.numPlayers; i++) {
    if (game.players[i].name === name) return game.players[i];
  }

  console.log(`player ${name} not found!`);

}

function hitHandler(game, name) {
  console.log("in hit handler");
  const player = findPlayer(game, name);
  player.hand.dealCards(game.deck.deal(1));
  if(player.hand.sumHand() >= 21) player.canAct = false;
  return game.exportGame();
}

function standHandler(game, name){
  console.log("in stand handler");
  const player = findPlayer(game, name);
  game.waitingFor = game.waitingFor.filter(name => name !== player.name);
  player.canAct = false;
  return game.exportGame()

}


function handleMove(gameJSON, move) {
  const game = new Game({ gameJSON });
  if (move.type === "hit") hitHandler(game, move.user);
  else if(move.type === "stand") standHandler(game, move.user);



  return game;
}
module.exports = {
  handleMove,
};
