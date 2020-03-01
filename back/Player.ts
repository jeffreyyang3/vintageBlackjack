import { Hand } from "./Cards";

export class Player {
  money: number;
  name: string;
  hand: Hand;

  constructor(name: string, money: number) {
    this.hand = new Hand();
    this.money = money;
    this.name = name;
  }
}
