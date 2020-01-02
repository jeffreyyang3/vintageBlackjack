<template>
  <div class="composeContainer">
    <textarea class="composeArea" v-model="currTyped"></textarea>
    <div @click="sendMessage" class="sendButton">send</div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sendButton {
  font-family: Helvetica, sans-serif;
  border: 1px solid black;
  width: max-content;
  height: max-content;
  padding: 2px;
  background-color: #d6d6ce;
  margin-left: auto;
}

.composeContainer {
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //   align-items: center;
  //   justify-content: space-around;
}
.composeArea {
  height: 70%;

  border: 1px solid black;
  user-select: none;
  resize: vertical;
  font-size: 105%;
  font-family: "Times New Roman", Times, serif;
}
.composeArea:focus {
  outline: none;
}
</style>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "MessageHistory",
  props: {
    msg: String
  },
  methods: {
    sendMessage: function() {
      this.$store.commit("addMessage", {
        name: this.$store.state.currentUsername,
        text: this.currTyped
      });
      this.currTyped = "";
    }
  },
  computed: {
    ...mapState(["displayedMessages"])
  },
  mounted() {
    console.log("asdf ", this.displayedMessages);
  },
  data: function() {
    return {
      currTyped: ""
    };
  }
});
</script>
