<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
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
const flagDisplay = ref(false);

let promisesCMDB = [];
let arregloEnlaces: enlace[] = [];
let arregloEquipos: equipo[] = [];
let arregloAnillos: anilloCMDB[] = [];
let objectGrafica: any = null;


  try {
    let validacionAnillos = JSON.parse(route.params.cmdb.toString());

    if (validacionAnillos.length != 0) {
      arregloAnillos = await cmdbAPI.consultaMultiplesAnillos(
        validacionAnillos
      );
      console.log("arregloAnillos1: ", arregloAnillos);

      objectGrafica = await dataTransform.parseToRenderGraph(arregloAnillos);
      //console.log(JSON.stringify(objectGrafica.arregloEnlaces));
      //console.log(objectGrafica);

      arregloEnlaces = await dataTransform.cleanEnlaces(objectGrafica.arregloEnlaces);
      arregloEquipos = await dataTransform.cleanEquipos(objectGrafica.arregloEquipos)
      
      //arregloEnlaces = await data3.edges;
      //arregloEquipos = await data3.nodes
      

      //arregloEquipos = objectGrafica.arregloEquipos
      //arregloEnlaces = objectGrafica.arregloEnlaces

      //console.log("*******");
      //console.log("arregloEnlaces: ", arregloEnlaces)
      //console.log("arregloEquipos: ", arregloEquipos)
      console.table(arregloEquipos)

      //console.log("arregloEnlaces: ", JSON.stringify(arregloEnlaces))
      //console.log("arregloEquipos: ", JSON.stringify(arregloEquipos))
    } else {
      flagDisplay.value = true;
    }
  } catch (error) {
    flagDisplay.value = true;
    console.log("Error topologia.vue: ", error);
    
  }
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
  <GraficaGroup :nodes="arregloEquipos" :links="arregloEnlaces" />
</template>