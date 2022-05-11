<template>
  <v-app>
    <v-main>
      <Grafica/>
      <!-- 
      <HelloWorld :selected-size="selectedSize" @on-change-size="selectedSize = $event"/>
      -->
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import HelloWorld from "./components/HelloWorld.vue";
import Grafica from "./components/Grafica.vue";

import { ref } from 'vue'

const selectedSize = ref('M')

</script>
<style>
.active{
  font-size: 35px;
}
</style>