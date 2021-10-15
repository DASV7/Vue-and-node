<template>
  <div id="login" v-show="!loginTrue" class="Login grid grid-rows-8">
    <main class="max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <section>
        <div class="flex justify-center bg-gray-600 p-2 rounded-lg mt-2">
          <p class="text-white">Prueba de seleccion</p>
        </div>
      </section>
      <div class="flex p-2 mx-2">
        <button
          @click="registerOrLogin('true')"
          :class="loginOrRegister ? 'bg-black rounded text-white' : ''"
          class="border rounded mx-1 p-1 font-bold shadow text-black"
        >
          inicio de seccion
        </button>
        <button
          @click="registerOrLogin('false')"
          :class="!loginOrRegister ? 'bg-black rounded text-white' : ''"
          class="border rounded mx-1 p-1 font-bold shadow text-black"
        >
          Registrarse
        </button>
      </div>
      <section v-if="loginOrRegister" class="mt-10">
        <p class="text-gray-600 pt-2">Iniciar sesion.</p>
        <div class="flex flex-col">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="email"
              >Usuario:</label
            >
            <input
              v-model="user"
              type="text"
              id="user"
              class="
                bg-blue-100
                rounded
                w-full
                text-gray-700
                focus:outline-none
                border-b-4 border-gray-300
                focus:border-blue-600
                transition
                duration-500
                px-3
                pb-3
              "
            />
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="password"
              >Clave:</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              class="
                bg-blue-100
                rounded
                w-full
                text-gray-700
                focus:outline-none
                border-b-4 border-gray-300
                focus:border-blue-600
                transition
                duration-500
                px-3
                pb-3
              "
            />
          </div>

          <button
            class="
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              rounded
              shadow-lg
              hover:shadow-xl
              transition
              duration-200
            "
            @click="loginAux()"
          >
            Iniciar sesion
          </button>
          <p>{{ mensaje }}</p>
          <p>{{responses}}</p>
        </div>
      </section>
      <section v-else class="mt-10">
        <p class="text-gray-600 pt-2">Registrarse</p>
        <div class="flex flex-col">
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="email"
              >Usuario:</label
            >
            <input
              v-model="user"
              type="text"
              id="user"
              class="
                bg-blue-100
                rounded
                w-full
                text-gray-700
                focus:outline-none
                border-b-4 border-gray-300
                focus:border-blue-600
                transition
                duration-500
                px-3
                pb-3
              "
            />
          </div>
          <div class="mb-6 pt-3 rounded bg-gray-200">
            <label
              class="block text-gray-700 text-sm font-bold mb-2 ml-3"
              for="password"
              >Clave:</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              class="
                bg-blue-100
                rounded
                w-full
                text-gray-700
                focus:outline-none
                border-b-4 border-gray-300
                focus:border-blue-600
                transition
                duration-500
                px-3
                pb-3
              "
            />
          </div>

          <button
            class="
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              rounded
              shadow-lg
              hover:shadow-xl
              transition
              duration-200
            "
            @click="register()"
          >
            Crear Cuenta
          </button>
          <p>{{ mensaje }}</p>
        </div>
      </section>
    </main>

    <footer class="max-w-lg mx-auto flex justify-center">
      <span class="mx-3">•</span
      ><a
        href="https://www.linkedin.com/in/diegosepulvedavelez/"
        target="_black"
        class="hover:underline"
        >Linkeding</a
      >
    </footer>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: "",
      password: "",
      show: true,
      loginOrRegister: true,
      mensaje: "",
    };
  },
  methods: {
    ...mapMutations(["login", "registerUser"]),
    //method login or register
    registerOrLogin(x) {
      this.loginOrRegister = x == "true" ? true : false;
    },
    //register
    register() {
      let data = {
        user: this.user,
        password: this.password,
      };
      if (this.user != "" || this.password != "") {
        this.registerUser(data);
      } else {
        this.mensaje = "Llene ambos campos correctamente";
      }
    },
    //login call
    loginAux() {
      if (this.user != "" || this.password != "") {
        const data = {
          user: this.user,
          password: this.password,
        };
        this.login(data);
      } else {
        this.mensaje = "Llene ambos campos correctamente";
      }
    },
  },
  computed: {
    ...mapState(["loginTrue","responses"]),
  },
};
</script>
