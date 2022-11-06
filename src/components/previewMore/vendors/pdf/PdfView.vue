
<template>
  <div>
    <iframe :src="bufferUrl" :style="{width: '100%',height: componentsHeightIP}"></iframe>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref} from "vue"

// 计算高度
const componentsHeightIP = computed(()=> {
  const inject1 = localStorage.getItem("componentsHeightIP");
  return inject1 - 6 + 'px'
})

const props = defineProps({
  // @ 文件地址-->
  data: {
    type: ArrayBuffer,
  },
  // 缩放比例
  scale: {
    type: Number,
    default: 1,
  }
});

onMounted(() => {
    getPdf()
})

const bufferUrl = ref("")

const getPdf = () => {

  let blob = new Blob([props.data], {type: "application/pdf"});
  bufferUrl.value = URL.createObjectURL(blob);
}
onUnmounted(()=> {
  if (bufferUrl.value){
    URL.revokeObjectURL(bufferUrl.value)
  }
})
</script>

<style scoped>

</style>