import {Card, Deck, Hand} from "@/components/casino/Cards";
import {Player} from "@/components/casino/Player";

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
        while(rounds > 0){
            console.log("new round");
            const dealerHand = new Hand();
        }
    }




}


