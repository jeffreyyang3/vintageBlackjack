const { Game } = require("./Game");



function handleMove(game , move) {

  // const game = new Game({ gameJSON });
  const player = findPlayer(game, move.user);

  function doubleHandler() {
    player.doubled = true;
    hitHandler()
  }

  function standHandler(game, name) {
    game.waitingFor = game.waitingFor.filter(name => name !== player.name);
    player.canAct = false;

  }

  function hitHandler() {
    player.hand.dealCards(game.deck.deal(1))
    if (player.hand.sumHand() >= 21 || player.doubled) {
      player.canAct = false;
      game.waitingFor = game.waitingFor.filter(name => name !== player.name);
    }

  }

  if (move.type === "hit") hitHandler(game, move.user);
  else if (move.type === "stand") standHandler(game, move.user);
  else doubleHandler(game, move.user);

  if(!game.waitingFor.length){
    console.log("dealers turn")

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
