import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import visualizar from "../views/visualizar.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,

  },
  {
    path: '/visualizar',
    name: 'visualizar',
    component: visualizar,

  },
  /* {
     path: '/visualizar',
     name: 'visualizar',
     // route level code-splitting
     // this generates a separate chunk (about.[hash].js) for this route
     // which is lazy-loaded when the route is visited.
      '../views/visualizar.vue')
   }*/
]

const router = new VueRouter({
  routes
})

export default router
