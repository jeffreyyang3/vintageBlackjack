<template>
  <div class="handDisplayContainer">
    <div class="cards">
      <img
        v-for="(card, idx) in deck"
        :src="getImgUrl(card)"
        :key="card.num + card.suit"
        :class="{shift : idx !== 0}"
        :style="{ zIndex: idx}"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.handDisplayContainer {
  height: 100%;
  display: flex;
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
  methods: {
    getImgUrl(card) {
      if (card.hidden) return require(`@/assets/cardImages/palm.png`);
      const mapping = {
        Clubs: "c",
        Spades: "s",
        Diamonds: "d",
        Hearts: "h"
      };

      let fileNum = String(card.num);
      if (card.num < 10) fileNum = `0${card.num}`;
      console.log("card is", card);

      return require(`@/assets/cardImages/${mapping[card.suit]}${fileNum}.png`);
    }
  },
  props: {
    deck: Array
  },
  mounted() {
    console.log(this.deck);
  }
};
</script>
