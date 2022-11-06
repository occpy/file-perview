# 组件 : CoderPreview
## 使用:
### 组件标签
>  ` <PreviewMore></PreviewMore>` 
### 组件参数
>   dataSource: {
type: Blob,
description: "需要展示文件的Blob格式",
}<br />
>dataUrl: {
type: String,
description: "文件地址",
} <br />
>displayBar:{
type: Boolean,
description: "功能栏显示",
default:true
} // 已弃用 <br />
>   showDownLoad: {
type: Boolean,
default: true,
description: "下载按钮显示",
}<br />
> showPrint: {
type: Boolean,
default: true,
description: "打印按钮显示",
}<br />
> LocalViews: {
type: Boolean,
default: true,
description: "打印按钮显示",
}<br />
> height: {
type: Number,
default: 528,
description: "组件高度",
}
### 方法
```
######    src/main.ts  #####

//组件引入

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// @ts-ignore
import {PreviewMore} from "PreviewMore";
import "PreviewMore/style.css"
createApp(App).component('PreviewMore',PreviewMore).mount('#app')

#####     业务文件   ########

// 组件使用

<template>
  <div>
      <PreviewMore></PreviewMore>
  </div>
</template>

<script setup>
</script>

```
### 注意
> 直接使用url作为参数传入可能存在跨域问题