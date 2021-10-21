import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/tailwind.css'
import router from './router'
import axios from 'axios';
import VueSimpleAlert from "vue-simple-alert"; 
Vue.use(VueSimpleAlert);

new Vue({
  store,
  axios,
  router,
  render: h => h(App)
}).$mount('#app')
