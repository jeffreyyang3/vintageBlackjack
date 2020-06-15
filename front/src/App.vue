<template>
  <div id="app">
    <h3>
      hi my name is
      <input type="text" v-model="$store.state.currentUsername" />
    </h3>
    <CreateOrJoin />

    <button class="fake" onclick="alert('No')">turn off hitmarker sound</button>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import css from "98.css";
import CreateOrJoin from "@/components/CreateOrJoin";
export default {
  components: {
    CreateOrJoin
  }
  // computed: {
  //   ...mapState(["currentUsername"])
  // }
};
</script>

<style>
.fake {
  margin-bottom: 10px;
}
body {
  background-color: #3a8181;
}
::-webkit-scrollbar,
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-button {
  width: 16px;
  height: 16px;
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-button {
  background: #c0c0c0;
  border-top: 1px solid #c0c0c0;
  border-left: 1px solid #c0c0c0;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  box-shadow: 1px 1px 0 white inset, -1px -1px 0 #707070 inset;
}
::-webkit-scrollbar-button:hover:active {
  border: 1px solid #7b7b7b;
  box-shadow: none;
}
::-webkit-scrollbar-corner {
  background: #c0c0c0;
}
::-webkit-scrollbar-button {
  background-position: center;
  background-repeat: no-repeat;
}

::-webkit-scrollbar-button:horizontal:decrement:disabled {
  background-position: calc(-24px + 1px) 1px; /* left */
}
::-webkit-scrollbar-button:horizontal:increment:disabled {
  background-position: calc(-36px + 1px) 1px; /* right */
}
::-webkit-scrollbar-button:vertical:decrement:disabled {
  background-position: calc(-12px + 1px) 1px; /* up */
}
::-webkit-scrollbar-button:vertical:increment:disabled {
  background-position: calc(-0px + 1px) 1px; /* down */
}
::-webkit-scrollbar-button:horizontal:decrement {
  background-position: calc(-24px + 1px) calc(-12px + 1px); /* left */
}
::-webkit-scrollbar-button:horizontal:increment {
  background-position: calc(-36px + 1px) calc(-12px + 1px); /* right */
}
::-webkit-scrollbar-button:vertical:decrement {
  background-position: calc(-12px + 1px) calc(-12px + 1px); /* up */
}
::-webkit-scrollbar-button:vertical:increment {
  background-position: calc(-0px + 1px) calc(-12px + 1px); /* down */
}
::-webkit-scrollbar {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAQMAAABIeJ9nAAAABlBMVEW9vb3///8EwsWUAAAADElEQVQI12NoYHAAAAHEAMFJRSpJAAAAAElFTkSuQmCC)
    repeat;
}
::-webkit-scrollbar-track-piece:active {
  background: black;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
