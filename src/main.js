import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import axios from "@axios";
import router from "@router";
import store from "@store";
// import VueDND from "awe-dnd"



Vue.config.productionTip = false;


new Vue({
  router,
  store,
  axios,
  mounted() {
  },
  render: (h) => h(App),
}).$mount("#app");
