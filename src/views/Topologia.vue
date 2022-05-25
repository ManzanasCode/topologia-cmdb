<script lang="ts" setup>


import { getCurrentInstance, watch } from "vue";
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  anilloCMDB,
  equipo,
  enlace,
  ColorEquipo,
  ImagenEquipo,
} from "../models/infoCMDB";
import dataTransform from "../utils/dataTransform";
import cmdbAPI from "../services/cmdbAPI";
import GraficaGroup from "../components/GraficaGroup.vue";
import data3 from "../demoConfigs/data3";

const route = useRoute();
const router = useRouter()

const flagDisplay = ref(false);
let renderComponent = ref(true);
const  emit  = getCurrentInstance();

let currentAnillo = ref("");
const instance = getCurrentInstance();

let arregloEnlaces: enlace[] = [];
let arregloEquipos: equipo[] = [];
let arregloAnillos: anilloCMDB[] | any = [];

let objectGrafica: any = null;

let anillosDisplay = [""];
let busquedaGrupo = "";

try {
  let validacionAnillos = JSON.parse(route.params.cmdb.toString());

  if (validacionAnillos.length != 0) {
    arregloAnillos = await cmdbAPI.consultaMultiplesAnillos(validacionAnillos);
    console.error("arregloAnillos: ", arregloAnillos);

    anillosDisplay = arregloAnillos
      .map((anillo: any) => {
        return anillo.nombre.replaceAll("_", " ");
      })
      .filter((grupo: string, index: number, self: any) => {
        return self.indexOf(grupo) == index;
      });

    objectGrafica = await dataTransform.parseToRenderGraph(arregloAnillos);
    //console.log(JSON.stringify(objectGrafica.arregloEnlaces));
    console.log("ARREGLO GLOBAL: ", objectGrafica.arregloGlobal);

    arregloEnlaces = await dataTransform.cleanEnlaces(
      objectGrafica.arregloEnlaces
    );
    arregloEquipos = await dataTransform.cleanEquipos(
      objectGrafica.arregloEquipos
    );

    //arregloEnlaces = await data3.edges;
    //arregloEquipos = await data3.nodes
    //arregloEquipos = objectGrafica.arregloEquipos
    //arregloEnlaces = objectGrafica.arregloEnlaces

    //console.log("*******");
    console.log("arregloEnlaces: ", arregloEnlaces);
    console.log("arregloEquipos: ", arregloEquipos);
    console.table(arregloEquipos);

    //console.log("arregloEnlaces: ", JSON.stringify(arregloEnlaces))
    //console.log("arregloEquipos: ", JSON.stringify(arregloEquipos))
  } else {
    flagDisplay.value = true;
  }
} catch (error) {
  flagDisplay.value = true;
  console.log("Error topologia.vue: ", error);
}



const changeSelect = async (event: any) => {
  console.error("changeSelect3")

  let tempArray=[{"id":"0x71515e1e66f82b40bc3b4740ebb86a80","nombre":"PALMAS_A","region":"R1"},{"id":"0x9452054dd4f3224e8f1277162dbaaee1","nombre":"PALMAS_B","region":"R1"}]
  let url = `http://192.168.0.205:3000/#/topologia/${JSON.stringify(tempArray)}`
  let url2 = `http://192.168.0.205:3000/#/demo`

router.push({ name: 'Topologia', params: { cmdb:  JSON.stringify(tempArray)} })

//router.push(`topologia/${JSON.stringify(tempArray)}`); 
  //window.location.href = url
}

const changeSelect2 = async (event: any) => {
  console.log("ANILLO: ", event.target.value);
  console.error("before Resort: ", arregloAnillos);
  renderComponent.value = false;

  var anilloMove = event.target.value.replaceAll(" ", "_");

  let objectFind = arregloAnillos.find(
    (anillo: anilloCMDB) => anillo.nombre == anilloMove
  );
  console.log("objectFind: ", objectFind);

  arregloAnillos = arregloAnillos.filter(
    (item: anilloCMDB) => item.nombre !== anilloMove
  );
  arregloAnillos.unshift(objectFind);

  console.log("Resort !!!!!! ");
  console.error("after Resort: ", arregloAnillos);

  let temp2 = dataTransform.parseToRenderGraph(arregloAnillos);

  arregloEnlaces = [];
  arregloEquipos = [];

  arregloEnlaces = await dataTransform.cleanEnlaces(temp2.arregloEnlaces);
  arregloEquipos = await dataTransform.cleanEquipos(temp2.arregloEquipos);


  renderComponent.value = true;
  //instance?.proxy?.$forceUpdate();

  console.log("arregloEnlaces: ", arregloEnlaces);
  console.log("arregloEquipos: ", arregloEquipos);
  console.table(arregloEquipos);


};

watch(renderComponent, async (newQuestion) => {
  console.error("WATCH !!! ")
})

</script>

<template  >
  <v-card>
    <v-card-title primary-title class="justify-center" v-if="flagDisplay">
      <div>
        <h3 class="headline pink--text text--accent-2">Error URL</h3>
        <div>La url se encuentra mal estructurada</div>
      </div>
    </v-card-title>

    <v-card-title
      primary-title
      class="justify-center"
      v-if="!flagDisplay"
      style="display: none"
    >
      <div>
        <v-list-item two-line>
          <v-list-item-content>
            <div v-for="(item, index) in arregloAnillos">
              <v-list-item-title>{{ item.nombre }} </v-list-item-title>
              <v-list-item-subtitle>Id: {{ item.id }} </v-list-item-subtitle>
              <v-list-item-subtitle
                >Region: {{ item.region }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                >Equipos {{ item.arregloEquipos?.length }}
              </v-list-item-subtitle>
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card-title>
  </v-card>
  <!-- -->

  <span>Marcar anillo: </span>
  <select @change="changeSelect($event)" class="form-control">
    <option :value="item" v-for="item in anillosDisplay">{{ item }}</option>
  </select>

  <GraficaGroup
    v-if="renderComponent"
    :nodes="arregloEquipos"
    :links="arregloEnlaces"
    :busquedaGrupo="busquedaGrupo"
    @change="changeSelect"
  />
</template>