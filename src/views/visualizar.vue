<template>
  <div class="visualizar">
    <div v-if="responseLogin == 'bienvenido'">
      <div class="flex">
        <app-menu :tipo="'crear'"></app-menu>
        <input
          v-model="findbydata"
          @keyup="findPosts()"
          class="p-1 m-2 border shadow rounded"
          placeholder="Buscar por nombre"
          type="text"
        />
      </div>

      <div class="col-span-8 flex">
        <div
          class="
            grid grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            w-7/9
            border
            p-5
            overflow-auto
          "
        >
          <div
            :key="arra._id"
            v-for="arra of array"
            class="border shadow p-5 m-5"
          >
            <div>
              <img
                src="../assets/bak.jpg"
                class="rounded shadow hover:bg-gradient-to-tl"
                alt=""
              />
            </div>
            <div>
              Nombre Post:
              <p class="font-bold">{{ arra.title }}</p>
              <p>Descripcion:{{ arra.description }}</p>
            </div>
            <div
              class="shadow flex p-2 w-2/3 mx-10 rounded ustify-items-center"
            >
              <app-menu
                :tipo="'edit'"
                :descriptions="arra.description"
                :title="arra.title"
                :idposts="arra._id"
              ></app-menu>

              <button
                @click="deletePostsAux(arra._id)"
                class="
                  border
                  hover:bg-red-300
                  shadow
                  rounded
                  text-white
                  font-bold
                  bg-red-500
                  mx-1
                  p-1
                "
              >
                eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-center mt-10 p-2 border shadow mx-10">
        <p class="font-bold">
          vuelve al Iniciar sesión
          <a href="." class="bg-blue-400 rounded p-1"> Aqui</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import menu from "../components/menu.vue";

export default {
  name: "visualizar",
  components: { "app-menu": menu },
  data() {
    return {
      array: [],
      findbydata: "",
    };
  },
  computed: {
    ...mapState(["arrayList", "responseLogin"]),
  },
  methods: {
    ...mapMutations(["getProducts", "deleteposts"]),
    //search by title
    findPosts() {
      let aux = this.arrayList.filter((x) =>
        x["title"].includes(this.findbydata)
      );
      console.log(aux.length);
      if (this.array.length != 0) {
        this.array = aux;
      } else {
        this.array = this.arrayList;
      }
    },
    async load() {
      await this.getProducts();
      setTimeout(() => {
        this.array = this.arrayList;
      }, 500);
    },
    //delete post
     deletePostsAux(x) {
      this.$fire({
        title: "¿Esta seguro?",
        text: "Se eliminara permanetemente",
        type: "warning",
        timer: 10000,
      }).then(() => {
         this.deleteposts(x);
        setTimeout(() => {
          this.getProducts();
          this.array = this.arrayList;
          
        }, 200);
      });
    },
  },
  watch: {
    arrayList(newValue, oldValue) {
      console.log("El nombre pasó de ser '%s' a '%s'", oldValue, newValue);
      this.array = newValue;
    },
  },

  created() {
    this.load();
  },
  mounted() {
    this.array = this.arrayList;
  },
};
</script>
<style scoped>
</style>
