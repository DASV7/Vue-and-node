<template>
  <div id="fondo">
    <div v-if="loginTrue">
      <div class="grid grid-cols-8 p-2 h-14 bg-blue-900" v-if="loginTrue">
        <div class="text-white p-1 whitespace-nowrap">
          <p>Prueba Tecnica Diego</p>
        </div>
        <div class="col-start-8 text-right mx-2">
          <div class="dropdown mr-15">
            <span class="text-white">Hola </span>
            <span class="text-white">Diego</span>
            <div class="dropdown-content whitespace-nowrap border">
              <a href="/">Cerrar sesion</a>
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
export default {
  name: "app",
  components: {},
  data() {
    return {};
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
