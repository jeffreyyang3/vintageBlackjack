<template>
  <div class="createOrJoin">create or join</div>
</template>
<style scoped lang="scss"></style>

<script>
import Vue from "vue";
import MessageHistory from "@/components/MessageHistory.vue";
import MessageCompose from "@/components/MessageCompose.vue";
import BJScreen from "@/components/casino/BJScreen.vue";
import axios from "axios";
import { mapState } from "vuex";

export default Vue.extend({
  name: "CreateOrJoin",
  components: {},
  data: function() {
    return {
      gameName: "newgame"
    };
  },
  methods: {
    async createGame() {
      const res = await axios.post("/api/createGame", {
        creatorName: "coolman",
        gameName: "coolgame"
      });
      console.log(res.data);
    }
  },

  props: {},
  computed: {},
  mounted() {
    this.createGame();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
