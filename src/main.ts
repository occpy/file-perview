import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// @ts-ignore
import {PreviewMore} from "../dist/PreviewMore";
import "../dist/style.css"
createApp(App).component('PreviewMore',PreviewMore).mount('#app')
