<template>
  <div class="createOrJoin">
    <div class="upperContent">
      <div class="textFields">
        <div class="textPair">
          Game Name:
          <input type="text" v-model="gameName" />
        </div>
        <div class="textPair">
          Game Name:
          <input type="text" v-model="gameName" />
        </div>
        <div class="textPair">
          Game Name:
          <input type="text" v-model="gameName" />
        </div>
      </div>
      <div class="verticalLine"></div>
    </div>
    <div class="bottomButtons">
      <button @click="createGame">create game</button>
      <button @click="joinGame">joinGame</button>
    </div>


  </div>
</template>
<style scoped lang="scss">
.createOrJoin {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.verticalLine {
  margin-left: 20px;
  margin-right: 20px;
  background-color: pink;
  height: 70%;
  width: 1px;

}

.upperContent {
  input {
    width: 150px;
  }
  height: 70%;
  display: flex;
}

.bottomButtons {
  margin-top: auto;
  display: flex;
  flex-direction: row-reverse;
  button {
    margin-left: 6px;

  }
}

.textFields {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

</style>

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
        console.log("set to", this.$store.state.currentGameName);
        //this.$store.state.currentGameName = res.data.gameName;
        if(this.onOwnPage) this.$router.push({path: "/game"});
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

<!-- Add "scoped" attribute to limit CSS to this component only -->  ````12