import {Card, Deck, Hand} from "./Cards"
import {Player} from "./Player"

export class Game {
    money: number;
    player: Player;
    deck: Deck;

    constructor() {
        this.money = 100;
        this.player = new Player("Jef", 100);
        this.deck = new Deck();
    }


    startGameLoop(rounds : number) {

        for(let rounds = 0; rounds <= 10; rounds++){

        }
        
    }




}


