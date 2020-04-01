const { Hand } = require("./Cards");

class Player {
  constructor(name, money) {
    this.hand = new Hand();
    this.money = money;
    this.name = name;
  }

}

module.exports = {
  Player
};
