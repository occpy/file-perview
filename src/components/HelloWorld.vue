<script setup lang="ts">
import { ref } from 'vue'
// import PreviewMore from "./previewMore/index.vue";
// import PreviewMore from "./previewMore/index.vue";
// import PreviewMore from "./previewMore/index.vue";
defineProps<{ msg: string }>()
</script>

<template>
  <PreviewMore></PreviewMore>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
