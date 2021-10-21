<template>
  <div class="grid grid-rows-1 grid-cols-2">
    <div v-if="tipos == 'crear'">
      <div
        class="row-span-1 w-24 h-8 mt-2 m-2 border"
        :class="
          crear
            ? 'bg-gray-400 rounded'
            : ' m-2 rounded shadow border-black hover:bg-green-300'
        "
      >
        <button
          @mousedown="ocultarmenu('crear')"
          class="border shadow bg-white rounded w-24 h-8 flex"
          :style="crear ? 'background-color: #f93a5a;' : ''"
        >
          <img
            class="p-1 w-8"
            :class="crear ? 'filter invert' : 'opacity-70'"
            :src="create"
            alt="lideres"
          />
          <p
            class="text-xs font-bold mt-2 mx-3 whitespace-nowrap"
            v-text="'+ Crear'"
          ></p>
        </button>
      </div>
    </div>
    <div v-else>
      <button
        @mousedown="ocultarmenu('crear')"
        class="border shadow bg-white rounded w-24 h-8 flex"
        :style="crear ? 'background-color: #f93a5a;' : ''"
      >
        <p
          class="text-xs font-bold mt-2 mx-3 whitespace-nowrap"
          v-text="'Editar'"
        ></p>
      </button>
    </div>
    <div v-show="modal">
      <div :class="fondoclass" class="grid justify-items-center border">
        <div
          :class="classModal"
          class="h-4/5 sm:h-3/5 max-h-2/5 justify-items-center shadow"
        >
          <div
            class="
              w-10
              h-10
              border
              shadow
              mt-1
              rounded-full
              px-4
              p-1
              bg-red-500
              hover:bg-red-600
            "
          >
            <button @click="ocultarmenu('cerrar')" class="font-bold">x</button>
          </div>
          <div class="overflow-auto h-full">
            <p v-if="tipos == 'crear'" class="my-10 text-4xl just">
              Crear productos
            </p>
            <p v-else class="my-10 text-4xl just">Editar Descripcion</p>
            <label class="text-gray-600 font-light">Nombre Producto</label>
            <input
              type="text"
              v-model="titulo"
              :disabled="tipos != 'crear'"
              placeholder="Ingrese el nombre aqui"
              class="
                w-full
                mt-2
                mb-6
                px-4
                py-2
                border
                rounded-lg
                text-gray-700
                focus:outline-none focus:border-green-500
              "
            />
            <label class="text-gray-600 font-light">Descripcion Producto</label>
            <input
              v-model="description"
              type="text"
              placeholder="Ingresa la descripcion aqui"
              class="
                w-full
                mt-2
                mb-6
                px-4
                py-2
                border
                rounded-lg
                text-gray-700
                focus:outline-none focus:border-green-500
              "
            />
            <p>
              {{ message }}
            </p>
            <button
              @click="callMethod()"
              class="
                bg-white
                hover:bg-gray-100
                text-gray-800
                font-semibold
                py-2
                px-4
                border border-gray-400
                rounded
                shadow
              "
            >
              Guardar
            </button>
            <p class="font-bold text-red-600 mt-3">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import create from "../assets/create.png";
export default {
  name: "Menu",
  props: {
    tipo: String,
    descriptions: String,
    title: String,
    idposts: String,
  },
  data() {
    return {
      //v-models
      titulo: "",
      tipos: "",
      message: "",
      description: "",
      idpost: "",
      //button push
      crear: false,
      //img
      create: create,
      //modal create
      modal: false,
      //clas style dinamic
      classModal:
        "border border-4 border-gray-400 shadow rounded shadow bg-white  grid grid-cols-1 w-auto  sm:w-1/4     relative mx-2 z-50  px-3  flex justify-items-center  rounded absolute right-0 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 mt-10 lg:mt-20",
      fondoclass:
        "z-10 z-40 overflow-auto scrolling-touch p-3 left-0 top-0 bottom-0 right-0  fixed bg-opacity-50 h-4/9 bg-gray-900",
    };
  },

  methods: {
    //create call modal
    ocultarmenu(x) {
      switch (x) {
        case "crear":
          (this.crear = true),
            (this.modal = true),
            (this.message = ""),
            (this.description = this.$props.descriptions),
            (this.titulo = this.$props.title);
          this.idpost = this.$props.idposts;
          break;
        case "cerrar":
          (this.modal = false),
            (this.crear = false),
            (this.message = ""),
            (this.description = ""),
            (this.titulo = "");
          break;
        default:
          (this.modal = false),
            (this.crear = false),
            (this.message = ""),
            (this.description = ""),
            (this.titulo = "");
          break;
      }
    },
    // method agg
    ...mapMutations(["aggProduct", "getProducts", "edisPosts"]),
    callMethod() {
      if (this.description != "" && this.titulo != "") {
        this.$confirm("¿Seguro que quiere crear o modificar?").then(() => {
          this.aggProductAux();
        });
      } else {
        this.$fire({
          title: "Verifique la informacion",
          text: "Todos los campos deben estar completos",
          type: "warning",
          timer: 10000,
        }).then(() => {
          this.mensaje = "";
        });
      }
    },
    aggProductAux() {
      //json string
      const jsonData = {
        title: this.titulo,
        description: this.description,
        _id: this.idpost,
      };
      if (jsonData.titulo != "" && jsonData.description != "") {
        if (
          this.$props.tipo == "edit" &&
          jsonData.titulo != "" &&
          jsonData.description != ""
        ) {
          this.edisPosts(jsonData);
          this.message = "";
          this.ocultarmenu("cerrar");
          setTimeout(() => {
            this.array = this.arrayList;
            this.getProducts();
          }, 500);
        } else {
          this.aggProduct(jsonData);
          this.message = "";
          this.ocultarmenu("cerrar");
          this.getProducts();
          setTimeout(() => {
            this.array = this.arrayList;
            this.getProducts();
          }, 500);
        }
      } else {
        this.message = "Agrege los compos correctamente";
      }
    },
  },
  mounted() {
    this.tipos = this.$props.tipo;
  },
};
</script>


