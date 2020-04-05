<template>
  <div class="BJScreenContainer">
    <div class="upperHalf">
      <div class="dealerCards">
        <!-- <img class="dealerCard face" src="@/assets/cardImages/c01.png" alt="failed" /> -->
        <!-- <img
          class="dealerCard shift"
          src="@/assets/cardImages/s04.png"
          alt="failed"
        />-->
        <!-- <img class="dealerCard shift" src="@/assets/cardImages/c11.png" alt="failed" /> -->






        <HandDisplay :deck="gameState.dealerHand.cards" />
      </div>
    </div>
    <div class="lowerHalf">
      <div class="playerContainer" v-for="player in gameState.players" :key="player.name">
        <HandDisplay :deck="player.hand.cards" />
      </div>
      <div class="actions" v-if="socketOpen && currentPlayer && currentPlayer.canAct">
        <button @click="sendHit">hit</button>
        <button>stand</button>
        <button>double</button>
      </div>
      <div class="actions" v-else>
        <button disabled>hit</button>
        <button disabled>stand</button>
        <button disabled>double</button>
      </div>

      <!-- <HandDisplay :deck="exHand" />
      <HandDisplay :deck="exHand" />
      <HandDisplay :deck="exHand" />-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.break {
  flex-basis: 100%;
  height: 0;
}

.BJScreenContainer {
  border: 1px solid black;
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
  height: 65%;
}

.lowerHalf,
.upperHalf {
  width: 100%;
}

.upperHalf {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35%;
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
    ...mapState(["currentUsername"])
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:6999");
    this.socket.onopen = _ => {
      this.socketOpen = true;
      this.socket.onmessage = event => {
        console.log(JSON.parse(event.data));
        this.gameState = JSON.parse(event.data);
      };
    };
    console.log(`current username is ${this.currentUsername}`);
  },
  methods: {
    sendHit() {
      this.socket.send(
        JSON.stringify({
          type: "move",
          data: { user: this.currentUsername, type: "hit" }
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
