<template>
  <v-app>
    <v-main>
      <!-- 
      <Grafica />
      
      <HelloWorld :selected-size="selectedSize" @on-change-size="selectedSize = $event"/>

      -->
      <!---->
      <router-view/>
      
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import HelloWorld from "./components/HelloWorld.vue";
import Grafica from "./components/Grafica.vue";

import { ref } from "vue";

const selectedSize = ref("M");

let uri = window.location.search.substring(1);
let params = new URLSearchParams(uri);
console.log("params: ", params.get("cmdb"));
</script>
<style>
.active {
  font-size: 35px;
}
</style>