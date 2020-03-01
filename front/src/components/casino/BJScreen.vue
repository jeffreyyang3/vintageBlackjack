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

        <HandDisplay :deck="currentState.dealer.hand" />
      </div>
    </div>
    <div class="lowerHalf">
      <HandDisplay v-for="player in currentState.players" :key="player.name" :deck="player.hand" />
      <!-- <HandDisplay :deck="exHand" />
      <HandDisplay :deck="exHand" />
      <HandDisplay :deck="exHand" />-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.BJScreenContainer {
  border: 1px solid black;
  width: 100%;
  height: 100%;
  background-color: #418108;
}

.lowerHalf {
  display: flex;
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

<script lang="ts">
import HandDisplay from "@/components/casino/HandDisplay.vue";
export default {
  name: "BJScreen",
  components: {
    HandDisplay
  },
  data: function() {
    return {
      currentState: {
        players: [
          {
            name: "lyanna",
            hand: [
              { suit: "Diamonds", num: 1 },
              { suit: "Diamonds", num: 11 },

              { suit: "Diamonds", num: 11 }
            ]
          },
          {
            name: "steven",
            hand: [
              { suit: "Diamonds", num: 1 },
              { suit: "Diamonds", num: 11 }
            ]
          },
          {
            name: "jeffrey",
            hand: [
              { suit: "Diamonds", num: 1 },
              { suit: "Diamonds", num: 11 }
            ]
          }
        ],
        dealer: {
          hand: [
            { suit: "Diamonds", num: 2 },
            { suit: "Clubs", num: 4, hidden: true }
          ]
        }
      }
    };
  }
};
</script>
