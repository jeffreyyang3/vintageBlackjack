<template>
  <div class="windowContainer">
    <div class="windowTopBar">
      <div class="windowTitle">Asdf</div>
      <div class="sqButtonContainer">
        <div class="sqButton minus"></div>
        <div class="sqButton wind"></div>
        <div class="sqButton x"></div>
      </div>
    </div>
    <div class="contentContainer">
      <MessageHistory />
      <textarea name="" class="composeArea" id=""></textarea>
      <!-- <input type="text" class="composeArea" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MessageHistory from "@/components/MessageHistory.vue";

export default Vue.extend({
  name: "HelloWorld",
  components: {
    MessageHistory
  },
  props: {
    msg: String
  },
  mounted() {}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$topRightButtonGrey: #d6d6ce;
$windowGeneralGrey: #c0c0c0;

.contentContainer {
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 5px;
}

.composeArea {
  height: 30%;
  border: 1px solid black;
  user-select: none;
  resize: vertical;
  font-size: 115%;
  font-family: "Times New Roman", Times, serif;
}
.composeArea:focus {
  outline: none;
}
.windowTitle {
  color: white;
  width: 50%;
  font-size: 90%;
  margin-left: 5px;
  text-align: left;
  font-family: helvetica;
}
.windowContainer {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 400px;
  width: 500px;
  background-color: $windowGeneralGrey;
  padding: 3px;
  box-shadow: 1px 1px 0 0 #424242;
  border: 1px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  background: silver;
  padding: 2px;
  align-items: center;
}

.sqButtonContainer {
  display: flex;
  align-items: center;
  width: 60px;
  height: 100%;
  justify-content: space-evenly;
  margin-left: auto;

  .sqButton {
    width: 15px;
    height: 15px;
    border: 1px solid #fff;
    border-right-color: #424242;
    border-bottom-color: #424242;
    font-size: 80%;

    background-color: $topRightButtonGrey;
  }
  .sqButton::before {
  }
  .sqButton.x::before {
    content: "X";
  }
  .sqButton.wind::before {
    content: "O";
  }
  .sqButton.minus::before {
    content: "-";
  }
}

.windowTopBar {
  flex-direction: row;
  display: flex;
  background-image: -webkit-linear-gradient(
    left,
    rgb(8, 33, 107),
    rgb(165, 206, 247)
  );
  height: 20px;
  width: 100%;
  align-items: center;
}
</style>
