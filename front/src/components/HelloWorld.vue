<template>
  <div class="window bjWindow">
    <div class="title-bar">
      <div class="title-bar-text">{{ barInfo }}</div>
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
.bjWindow {
  width: 650px;
  height: 600px;
  display: flex;
  flex-direction: column;


}
.contentContainer {
  padding-left: 2px;
  flex-grow: 1;
  padding-right: 2px;
  margin-bottom: 4px;
}

.options {
  padding: 4px 0 4px 2px;
}
</style>

<script>
import Vue from "vue";
import MessageHistory from "@/components/MessageHistory.vue";
import MessageCompose from "@/components/MessageCompose.vue";
import BJScreen from "@/components/casino/BJScreen.vue";
import { mapState } from "vuex";

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
  computed: {
    ...mapState(["userInfo"]),
    barInfo(){
      return ["Blackjack", ...this.userInfo].join(" - ")

    }



  },
  mounted() {}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

