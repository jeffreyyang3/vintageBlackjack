<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<style scoped>
.home {
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Vuex from 'vuex';

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      asdf: "asdf"
    };
  }
};
</script>
