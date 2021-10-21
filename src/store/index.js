import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
Vue.use(Vuex)
//produccion or not    
var productionTip = false
export default new Vuex.Store({
  state: {
    loginTrue: false,
    arrayList: [],    
    //end point
    endPoint: productionTip ? "http://localhost:3000/api" : "https://node-prueba-diego.herokuapp.com/api",
    //responses
    responses: "",
    //Login
    responseLogin: ""
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
        state.responseLogin=""
        await axios.post(state.endPoint + "/users/login", dataJson).then((e) => {
          state.responseLogin = e.data.data, state.loginTrue = true,
            router.push("/visualizar")
          console.log(e.data.data)
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
