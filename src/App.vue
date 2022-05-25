<template>
  <!-- 
      <Grafica />
      
      <HelloWorld :selected-size="selectedSize" @on-change-size="selectedSize = $event"/>

      -->
  <!--
      
      -->
  <router-view v-slot="{ Component }">
    <suspense>
      <component :is="Component"></component>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </suspense>
  </router-view>
</template>

<script lang="ts" setup>
import HelloWorld from "./components/HelloWorld.vue";


//import { ref } from "vue";

//const selectedSize = ref("M");
</script>
<style>
.active {
  font-size: 35px;
}
</style>