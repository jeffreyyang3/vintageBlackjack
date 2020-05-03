<template>
  <div class="BJScreenContainer">
    <div class="upperHalf">
      <div class="dealerCards">
        <HandDisplay :deck="gameState.dealerHand.cards" :name="'Dealer'" />
      </div>
    </div>
    <div class="infoBar gameText">
      {{ infoBarText}}
    </div>
    <div class="lowerHalf">
      <div class="playerContainer" v-for="player in gameState.players" :key="player.name">
        <HandDisplay :deck="player.hand.cards" :name="player.name" :money="player.money"/>
      </div>
      <div class="bet lowerButtons" v-if="displayBet">
        <div class="chip"></div>
        <div class="chip"></div>
        <div class="chip"></div>
        <input class="betAmount" type="text" v-model="currentBet">
        <button @click="sendAction('bet')">Bet</button>
      </div>
      <div class="actions lowerButtons" v-else-if="displayActions">
        <button @click="sendAction('hit')">Hit</button>
        <button @click="sendAction('stand')">Stand</button>
        <button @click="sendAction('double')">Double</button>
      </div>

      <div class="actions lowerButtons" v-else>
        <button disabled>Hit</button>
        <button disabled>Stand</button>
        <button disabled>Double</button>
      </div>

      
      </div>
    </div>
</template>

<style scoped lang="scss">
.infoBar {
  text-align: center;

}
.chip::before{
  content: "100k";
}
.chip {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;

}

.lowerButtons {
  height: 40px

}
.betAmount {
  width: 50px;
}
.bet{

  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-right: 20%;
  padding-left: 20%;
  align-items: center;
  padding-bottom: 10px;

}
.bottomBarItem {
  margin-right: 10px;
}
.bottomBar {
  width: 100%;
  height: 13px;
  background-color: #c0c0c0;
  display: flex;
}
.break {
  flex-basis: 100%;
  height: 0;
}

.BJScreenContainer {
  width: 100%;
  height: 100%;
  background-color: #418108;
}

.playerContainer {
  width: 33%;
}

.lowerHalf {
  display: flex;
  flex-flow: wrap;
  align-items: flex-end;
  justify-content: space-evenly;
  height: 45%;
}

.lowerHalf,
.upperHalf,
.infoBar {
  width: 100%;
}
.infoBar {
  height: 10%;

}
.upperHalf {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45%;
}
</style>

<script>
import { mapState } from "vuex";
import HandDisplay from "@/components/casino/HandDisplay.vue";
import {Howl, Howler} from 'howler';
const axios = require("axios");
export default {
  name: "BJScreen",
  components: {
    HandDisplay
  },
  watch: {
    userInfo(){
      this.$store.state.userInfo = [...this.userInfo];
    }

  },
  computed: {

      //<div class="actions" v-if="socketOpen && currentPlayer && currentPlayer.canAct">
    ...mapState(["currentUsername"]),
    infoBarText: function(){
      let text = "Waiting On: ";
      if(!this.hasGameState) return "Loading";
      if(this.gameState.waitingForBets.length)
        return text + this.gameState.waitingForBets.join(", ");
      if(this.gameState.waitingFor.length)
        return text + this.gameState.waitingFor.join(", ")



    },
    hasGameState: function(){
      return this.gameState.waitingForBets !== undefined
    },
    displayBet: function(){
      return this.socketOpen && this.currentPlayer && 
      this.gameState.waitingForBets.indexOf(this.currentUsername) !== -1

    },
    displayActions: function(){
      return this.socketOpen && this.currentPlayer && this.currentPlayer.canAct
      && !this.gameState.waitingForBets.length;

    },

    currentPlayer: function() {
      console.log(this.currentUsername)
      return this.gameState.players.filter(
        player => player.name === this.currentUsername
      )[0];
    },
    userInfo: function() {
      const out = [this.currentUsername];
      if (this.currentPlayer){
        out.push(`$${this.currentPlayer.money}`);
        if (this.currentPlayer.status === "win") out.push("Won");
        if (this.currentPlayer.status === "lose") out.push("Lost");
        if (this.currentPlayer.status === "push") out.push("Pushed")
        if(this.currentPlayer.status !== "none") out.push("Next round in 10s")
      } 
      return out;
    },
  },
  mounted() {
    this.socket = new WebSocket(`ws://${window.location.hostname}/ws`);
    this.socket.onopen = _ => {
      this.socketOpen = true;
      this.socket.onmessage = event => {

        console.log(JSON.parse(event.data));
        document.getElementById("hitmarker").play()
        this.gameState = JSON.parse(event.data);

      };
    };
  },

  methods: {
    sendAction(action) {
      this.socket.send(
        JSON.stringify({
          user: this.currentUsername, type: action, bet: Number(this.currentBet)
        })
      );
    },
    
  },

  data: function() {
    return {
      socket: null,
      socketOpen: false,
      gameState: { players: [], dealerHand: { cards: [] } },
      currentBet: 20
    };
  }
};
</script>
