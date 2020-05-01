<template>
  <div class="window">
    <div class="title-bar">
      <div class="title-bar-text">A Complete Window</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="options">
      <span>Hello</span>
    </div>

    <div class="contentContainer">
      <BJScreen />
      <!-- <input type="text" class="composeArea" /> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
.contentContainer {
  padding-left: 2px;
  padding-right: 2px;
}

.options {
  padding: 4px 0px 4px 2px;
}
</style>

<script>
import Vue from "vue";
import MessageHistory from "@/components/MessageHistory.vue";
import MessageCompose from "@/components/MessageCompose.vue";
import BJScreen from "@/components/casino/BJScreen.vue";

export default Vue.extend({
  name: "HelloWorld",
  components: {
    MessageHistory,
    MessageCompose,
    BJScreen
  },

  props: {
    msg: String
  },
  mounted() {}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

