<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { anilloCMDB,equipo, enlace, ColorEquipo, ImagenEquipo } from "../models/infoCMDB";
import dataTransform from "../utils/dataTransform";
import cmdbAPI from "../services/cmdbAPI";
import GraficaGroup from "../components/GraficaGroup.vue";



const route = useRoute();
const flagDisplay = ref(false);
let promisesCMDB = [];
let arregloEnlaces: any[] = []
let arregloEquipos: equipo[] = []
let arregloAnillos: anilloCMDB[] = [];
let objectGrafica:any = null;
let validacionAnillos = await dataTransform.parseURL(
  route.params.cmdb.toString()
);
if (validacionAnillos.length != 0) {
  arregloAnillos = await cmdbAPI.consultaMultiplesAnillos(validacionAnillos);
  console.log("arregloAnillos1: ", arregloAnillos)

  objectGrafica = await dataTransform.parseToRenderGraph(arregloAnillos);
  console.log("objectGrafica: ", objectGrafica)

  arregloEnlaces = objectGrafica.arregloEnlaces
  arregloEquipos = objectGrafica.arregloEquipos
  
    
} else {
  flagDisplay.value = !flagDisplay.value;
}
</script>

<template  >
  <v-card style="display:none">
    <v-card-title primary-title class="justify-center" v-if="flagDisplay">
      <div>
        <h3 class="headline pink--text text--accent-2">Error URL</h3>
        <div>La url se encuentra mal estructurada</div>
      </div>
    </v-card-title>

    <v-card-title primary-title class="justify-center" v-if="!flagDisplay">
      <div>
        <v-list-item two-line>
          <v-list-item-content>
            <div v-for="(item, index) in arregloAnillos">
              <v-list-item-title>{{ item.nombre }} </v-list-item-title>
              <v-list-item-subtitle>Id: {{ item.id }} </v-list-item-subtitle>
              <v-list-item-subtitle>Region: {{ item.region }} </v-list-item-subtitle>
              <v-list-item-subtitle>Equipos {{ item.arregloEquipos?.length }} </v-list-item-subtitle>
              
            </div>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-card-title>
    
    

  </v-card>
  <!-- -->
  <GraficaGroup :nodes="arregloEquipos" :links="arregloEnlaces"/>



</template>