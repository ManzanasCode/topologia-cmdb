<script lang='ts' setup>
const possiblesSizes = ["XS", "S", "M", "L", "XL", "XXL"];

//Define propps y define emmits
//toRef()

// JS
/*
const props = defineProps({
  selectedSize: { type: String, required: true }
})

const emits = defineEmits({
  onChangeSize: String
})
*/
// TS
const props = defineProps<{
  selectedSize: String
}>()

const emits = defineEmits<{
  (events: 'onChangeSize', value: string): void
}>()

</script>

<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Hello world component</h1>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12" class="">
        <v-btn class="mx-2" 
        color="primary" :class="{'active': props.selectedSize == size}" 
        elevation="2" v-for="size in possiblesSizes"
        @click="emits('onChangeSize', size)"
        >
          {{ size }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


