<template>
  <div class="handDisplayContainer">
    <div class="cards">
      <img
        v-for="(card, idx) in deck"
        :src="getImgUrl(card)"
        :key="card.num + card.suit"
        :class="{shift : idx !== 0}"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.handDisplayContainer {
  width: 100%;
  height: 100%;
}

.cards {
  width: 32%;
  height: 90%;

  // border: 1px solid black;
  justify-content: center;
  display: flex;
  .shift {
    margin-left: -28%;
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
