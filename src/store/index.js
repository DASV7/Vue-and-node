import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginTrue: false,
    arrayList: [],
    //end point
    endPoint: "http://localhost:3000",
    //responses
    responses: ""
  },
  mutations: {

    //get product
    async getProducts(state) {
      try {
        await axios.get(state.endPoint + "/posts").then((e) => { state.arrayList = "", state.arrayList = e.data })
          ;
        console.log(state.arrayList)
      } catch (err) {
        console.log("data" + err);
      }
    },
    //Agg method
    async aggProduct(state, dataJson) {
      try {
        console.log(dataJson)
        await axios.post(state.endPoint + "/posts", dataJson).then((e) => { state.responses = console.log(e) })
      }
      catch (e) {
        console.log("error" + e)
      }
    },
    //delete by items
    async deleteposts(state, id) {
      try {
        await axios.delete(state.endPoint + "/posts/" + id).then((e) => state.responses = e)
      }
      catch (e) {
        console.log("error" + e)
      }
    },
    //Edit posts
    async edisPosts(state, array) {
      const data = {
        title: array.titulo,
        description: array.description
      }
      try {
        await axios.patch(state.endPoint + "/posts/" + array._id, data).then((e) => state.responses = e)
      } catch (e) {
        console.log(e)

      }
    },
    //register users
    async registerUser(state, dataJson) {
      try {
        console.log(dataJson)
        await axios.post(state.endPoint + "/users", dataJson).then((e) => { state.responses = console.log(e) })
      }
      catch (e) {
        console.log("error" + e)
      }
    },
    //Login    
    async login(state, dataJson) {
      try {
        await axios.post(state.endPoint + "/users/login", dataJson).then((e) => {
          state.responses = console.log(e), state.loginTrue = true,
            router.push("/visualizar")
        })
      }
      catch (e) {
        console.log("error" + e);
        state.responses = "Usuario O Clave incorrecto";
      }


    },



  },
  actions: {
  },
  modules: {
  }
})
