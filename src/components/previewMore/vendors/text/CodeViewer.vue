<template>
  <pre class="code-area">
    {{ value }}
  </pre>
</template>

<script setup lang="ts">
import {getCurrentInstance} from "vue"

const i = getCurrentInstance();
const props = defineProps({
  value: {
    type: String,
    description: '值'
  }
});
</script>

<style scoped>
.code-area {
  margin: 18px auto;
  font-size: 12px;
  width: 96%;
  background: #F7F7F7;
  word-break: break-word;
  white-space: break-spaces;
  color: #000;
  padding: 10px;
  box-sizing: border-box;
}
</style>
