import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import axios from "@axios";
import router from "@router";
import store from "@store";
import HosUI from "hosui";
// import VueDND from "awe-dnd"

require("@assets/index.scss");
require("@assets/zxx.css");

Vue.use(HosUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  mounted() {
  },
  render: (h) => h(App),
}).$mount("#app");
