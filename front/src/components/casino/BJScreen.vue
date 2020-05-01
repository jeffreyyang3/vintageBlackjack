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
        <button @click="sendAction('hit')">Hit</button>
        <button @click="sendAction('stand')">Stand</button>
        <button @click="sendAction('double')">Double</button>
      </div>
      <div class="actions" v-else>
        <button disabled>Hit</button>
        <button disabled>Stand</button>
        <button disabled>Double</button>
      </div>

      <!-- <HandDisplay :deck="exHand" />
      <HandDisplay :deck="exHand" />
      <HandDisplay :deck="exHand" />-->
      
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
  watch: {
    userInfo(){
      this.$store.state.userInfo = [...this.userInfo];
    }

  },
  computed: {

    ...mapState(["currentUsername"]),
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
        console.log(this.currentPlayer)
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
