const { Hand } = require("./Cards");

class Player {
  constructor(name, money) {
    this.hand = new Hand();
    this.money = money;
    this.name = name;
    this.doubled = false;
    this.split = false;
    this.canAct = true;
  }

}

module.exports = {
  Player
};