<template>
  <div class="handDisplayContainer">
    <div class="gameText you active" v-if="name === $store.state.currentUsername">YOU ARE HERE</div>
    <div class="gameText you" v-else></div>
    <div class="gameText">{{ name }}</div>
    <div class="cards">
      <img
        v-for="(card, idx) in deck"
        :src="getImgUrl(card)"
        :key="card.num + card.suit"
        :class="{ shift: idx !== 0 }"
        :style="{ zIndex: idx }"
      />
    </div>
    <div class="gameText" :class="{ lose: deckSum > 21 }">{{ deckSum }}</div>
  </div>
</template>

<style scoped lang="scss">
.gameText {
  margin-top: 10px;
  font-size: 180%;
  color: black;
  font-family: "Times New Roman", Times, serif;
}

.gameText.lose {
  text-decoration: line-through;
}
.gameText.you {
  height: 15px;
  font-size: 150%
}

.gameText.you.active::before {
  content: "★";
  color: red;

}
.handDisplayContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cards {
  // border: 1px solid black;
  justify-content: center;
  display: flex;
  .shift {
    margin-left: -50px;
  }
  img {
    height: 96px;
    width: 71px;
    background-color: white;
    border-radius: 2px;
  }
}
</style>

<script>
export default {
  name: "HandDisplay",
  data: function() {
    return {};
  },
  computed: {
    deckSum() {
      let aceUsed = false;
      let total = 0;

      this.deck.forEach(card => {
        if (card.suit === "hidden") return;
        if (card.num === 1 && !aceUsed) {
          total += 11;
          aceUsed = true;
        } else {
          total += Number(card.num > 10 ? 10 : card.num);
        }
      });

      if (aceUsed) {
        if (total > 21) {
          total -= 10;
        } else {
          return `${total - 10}/${total}`;
        }
      }

      return total;
    }
  },
  methods: {
    getImgUrl(card) {
      if (card.suit === "hidden")
        return require(`@/assets/cardImages/palm.png`);
      const mapping = {
        Clubs: "c",
        Spades: "s",
        Diamonds: "d",
        Hearts: "h"
      };

      let fileNum = String(card.num);
      if (card.num < 10) fileNum = `0${card.num}`;

      return require(`@/assets/cardImages/${mapping[card.suit]}${fileNum}.png`);
    }
  },
  props: {
    deck: Array,
    name: String
  },
  mounted() {
    console.log("hand display given");
    console.log(this.deck);
  }
};
</script>
