<template>
  <div class="handDisplayContainer">
    <div class="cards"></div>
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

<script lang="ts">
export default {
  name: "HandDisplay",
  data: function() {
    return {};
  },
  props: {
    deck: Array
  }
};
</script>
