<template>
  <viewer :images="images" style="height: 800px;">
    <img v-for="item in images" alt="图片" :src="item.src" :key="item.index" class="image" />
  </viewer>
</template>

<script setup lang="ts">
import {computed} from "vue"


const props = defineProps(["image"]);

const images = computed(()=>{
  return props.image ? [{ src: props.image }] : [];
})
</script>

<style scoped>
.image {
  display: block;
  width: auto;
  height: 100%;
  margin: 0 auto;
}
</style>
