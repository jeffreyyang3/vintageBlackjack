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
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$topRightButtonGrey: #d6d6ce;
$windowGeneralGrey: #c0c0c0;
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
  min-height: 300px;
  background-color: $windowGeneralGrey;
  padding: 3px;
  box-shadow: 1px 1px 0 0 #424242;
  border: 1px solid #fff;
  border-right-color: #848484;
  border-bottom-color: #848484;
  background: silver;
  padding: 2px;
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
  // background-image: -webkit-linear-gradient(
  //   left,
  //   rgb(8, 33, 107),
  //   rgb(165, 206, 247)
  // );
  height: 20px;
  width: 100%;
  align-items: center;
  background: #000080; /* fallback to standard color */
  background: -moz-linear-gradient(left, #000080 0%, #1084d0 100%); /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0%, #000080),
    color-stop(100%, #1084d0)
  ); /* Chrome, Safari4+ */
  background: -webkit-linear-gradient(
    left,
    #000080 0%,
    #1084d0 100%
  ); /* Chrome10+, Safari5.1+ */
  background: -o-linear-gradient(
    left,
    #000080 0%,
    #1084d0 100%
  ); /* Opera 11.10+ */
  background: -ms-linear-gradient(left, #000080 0%, #1084d0 100%); /* IE10+ */
  background: linear-gradient(to right, #000080 0%, #1084d0 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000080', endColorstr='#1084d0', GradientType=1 ); /* IE6-9 */
}
</style>
