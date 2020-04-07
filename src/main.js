import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import axios from "axios";
import VueAxios from "vue-axios";

import { VueReCaptcha } from "vue-recaptcha-v3";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

Vue.use(VueReCaptcha, { siteKey: "6LduZ90UAAAAAMECSUKKXvvbJe6mFx0S-ko6q7xv" });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
