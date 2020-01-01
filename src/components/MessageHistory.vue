<template>
  <div class="messageHistoryBox"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MessageHistory",
  props: {
    msg: String
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.messageHistoryBox {
  font-family: "Times New Roman", Times, serif;
  border: 1px solid black;
  height: 40%;
  background-color: white;
}
</style>
