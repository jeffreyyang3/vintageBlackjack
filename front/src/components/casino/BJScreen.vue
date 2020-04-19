<template>
  <div class="BJScreenContainer">
    <div class="upperHalf">
      <div class="dealerCards">
        <HandDisplay :deck="gameState.dealerHand.cards" :name="'Dealer'" />
      </div>
    </div>
    <div class="lowerHalf">
      <div class="playerContainer" v-for="player in gameState.players" :key="player.name">
        <HandDisplay :deck="player.hand.cards" :name="player.name" />
      </div>
      <div class="actions" v-if="socketOpen && currentPlayer && currentPlayer.canAct">
        <button @click="sendAction('hit')">hit</button>
        <button @click="sendAction('stand')">stand</button>
        <button @click="sendAction('double')">double</button>
      </div>
      <div class="actions" v-else>
        <button disabled>hit</button>
        <button disabled>stand</button>
        <button disabled>double</button>
      </div>

      <!-- <HandDisplay :deck="exHand" />
      <HandDisplay :deck="exHand" />
      <HandDisplay :deck="exHand" />-->
      <div class="bottomBar">
        <div class="bottomBarItem" v-for="(item, idx) in userInfo" :key="idx">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  height: 50%;
}

.lowerHalf,
.upperHalf {
  width: 100%;
}

.upperHalf {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}
</style>

<script>
import { mapState } from "vuex";
import HandDisplay from "@/components/casino/HandDisplay.vue";
const axios = require("axios");
export default {
  name: "BJScreen",
  components: {
    HandDisplay
  },
  computed: {
    currentPlayer: function() {
      return this.gameState.players.filter(
        player => player.name === this.currentUsername
      )[0];
    },
    userInfo: function() {
      const out = [`User: ${this.currentUsername}`];
      if (this.currentPlayer){
        out.push(`Money: ${this.currentPlayer.money}`);
        console.log(this.currentPlayer)
        if (this.currentPlayer.status === "win") out.push("You won.");
        if (this.currentPlayer.status === "lose") out.push("You lost.");
        if (this.currentPlayer.status === "push") out.push("You pushed.")
        if(this.currentPlayer.status !== "none") out.push("Next round in 10s")
      } 
      return out;
    },
    ...mapState(["currentUsername"])
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:3050/ws");
    this.socket.onopen = _ => {
      this.socketOpen = true;
      this.socket.onmessage = event => {
        console.log(JSON.parse(event.data));
        this.gameState = JSON.parse(event.data);
      };
    };
  },

  methods: {
    sendAction(action) {
      this.socket.send(
        JSON.stringify({
          type: "move",
          data: { user: this.currentUsername, type: action }
        })
      );
    }
  },

  data: function() {
    return {
      socket: null,
      socketOpen: false,
      gameState: { players: [], dealerHand: { cards: [] } }
    };
  }
};
</script>
