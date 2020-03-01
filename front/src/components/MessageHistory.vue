<template>
  <div class="messageHistoryBox">
    <div
      class="message"
      v-for="msg in displayedMessages"
      :key="msg.name + msg.date"
    >
      <span class="userName me">{{ msg.name }}:</span>
      <span class="msgContent"> {{ msg.text }}</span>
      <!-- {{ msg.text }} -->
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.userName {
  font-weight: bold;
  font-size: 115%;
}

.userName.other {
  color: red;
}

.userName.me {
  color: blue;
}
.messageHistoryBox {
  font-family: "Times New Roman", Times, serif;
  border: 1px solid black;
  height: 50%;
  background-color: white;
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
  computed: {
    ...mapState(["displayedMessages"])
  },
  mounted() {
    console.log("asdf ", this.displayedMessages);
  },
  data: function() {
    const old = new Date();
    old.setDate(old.getDate() - 5);
    return {};
  }
});
</script>
