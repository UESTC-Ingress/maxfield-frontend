import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawerShow: false,
    aboutShow: false,
    newUserPrompt: false,
    submitSucPrompt: false,
    userID: ""
  },
  mutations: {
    toggleDrawer(state) {
      state.drawerShow = !state.drawerShow;
    },
    updateDrawer(state, val) {
      state.drawerShow = val;
    },
    updateAbout(state, val) {
      state.aboutShow = val;
    },
    updateNewUserPrompt(state, val) {
      state.newUserPrompt = val;
    },
    updateSubmitSucPrompt(state, val) {
      state.submitSucPrompt = val;
    },
    updateUserID(state, val) {
      state.userID = val;
    }
  }
});
