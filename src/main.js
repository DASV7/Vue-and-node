import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/tailwind.css'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false

Vue.prototype.$hostname = Vue.config.productionTip
  ? "apiReal"
  : "http://localhost:3000";

new Vue({
  store,
  axios,
  router,
  render: h => h(App)
}).$mount('#app')
