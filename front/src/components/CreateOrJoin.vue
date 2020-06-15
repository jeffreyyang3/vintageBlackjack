<template>
  <div class="createOrJoin">
    <input type="text" v-model="gameName" />
    <button @click="createGame">create game</button>
    <button @click="joinGame">joinGame</button>
  </div>
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
        creatorUsername: this.$store.state.currentUsername,
        gameName: this.gameName
      });
      console.log(res.data);
      if (res.data.gameName) {
        this.joinGame();
      }
    },

    async joinGame() {
      const res = await axios.get("/api/joinGame", {
        params: {
          gameName: this.gameName,
          username: this.$store.state.currentUsername
        }
      });
      if (res.data.success) {
        this.$set(this.$store.state, "currentGameName", res.data.gameName);
        //this.$store.state.currentGameName = res.data.gameName;
        return;

        //this.$router.push({ path: "/" });
      }
      console.log("error joining");
      console.log(res);
    }
  },

  props: { onOwnPage: Boolean },
  computed: {},
  mounted() {}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
