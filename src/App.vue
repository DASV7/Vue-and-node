<template>
  <div id="fondo">
    <div v-if="loginTrue">
      <div class="grid grid-cols-8 p-2 h-14 bg-blue-900" v-if="loginTrue">
        <div class="text-white p-1 whitespace-nowrap">
          <p>Prueba Tecnica</p>
        </div>
        <div class="col-start-8 text-right mx-2">
          <div class="dropdown mr-15 ">
            <button class="text-white mb-1 mx-10 hover:bg-blue-500 p-1 rounded shadow bg-blue-700 flex whitespace-nowrap w-max"
              >
              <img :src="loginImg" class="w-7 h-7  filter invert" alt="Icon">
              <p class="mt-2">Cuenta</p>
            </button>
            <div class="dropdown-content mx-10 whitespace-nowrap border">
              <a href=".">Cerrar sesion</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import login from "../src/assets/login.png"
export default {
  name: "app",
  components: {},
  data() {
    return {
      loginImg:login
    };
  },
  computed: {
    ...mapState(["loginTrue"]),
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 2px 2px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
