<template>
  <div class="BJScreenContainer">
    <div class="upperHalf">
      <div class="dealerCards">
        <img
          class="dealerCard face"
          src="@/assets/cardImages/c01.png"
          alt="failed"
        />
        <img
          class="dealerCard shift"
          src="@/assets/cardImages/palm.png"
          alt="failed"
        />
        <!-- <img
          class="dealerCard shift"
          src="@/assets/cardImages/c12.png"
          alt="failed"
        /> -->
      </div>
    </div>
    <div class="lowerHalf">
      <div class="myCards">
        <img
          class="dealerCard face"
          src="@/assets/cardImages/c01.png"
          alt="failed"
        />
        <!-- <img
          class="dealerCard shift"
          src="@/assets/cardImages/s04.png"
          alt="failed"
        /> -->
        <img
          class="dealerCard shift"
          src="@/assets/cardImages/c12.png"
          alt="failed"
        />
      </div>
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
  height: 60%;
  display: flex;
  .dealerCards {
    align-self: flex-end;
    margin-bottom: 4%;
  }
}

.upperHalf {
  height: 40%;
}
.dealerCards,
.myCards {
  width: 32%;

  // border: 1px solid black;
  justify-content: center;
  display: flex;
  .shift {
    margin-left: -28%;
  }
}
.lowerHalf,
.upperHalf {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

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
  name: "BJScreen",
  data: function() {
    return {};
  }
};
</script>
