import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state: {
  displayedMessages: Array<{
    name: string;
    text: string;
    sendDate: Date;
  }>;
  currentUsername: string;
} = {
  displayedMessages: [],
  currentUsername: "userName1"
};

export default new Vuex.Store({
  state,
  getters: {},
  mutations: {
    addMessage(state, message) {
      state.displayedMessages.unshift(message);
      // state.displayedMessages.sort((a,b) => b.sendDate.to - a.sendDate);
      if (state.displayedMessages.length > 20)
        state.displayedMessages = state.displayedMessages.slice(0, 20);
    }
  },
  actions: {},
  modules: {}
});
