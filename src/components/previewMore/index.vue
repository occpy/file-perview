<template>
  <div :style="{ height: props.height,border:'1px solid #333333' }">
    <div
        class="FuncBar"
        v-show="props.showPrint || props.LocalViews || props.showDownLoad"
    >
      <!--      todo  v-show="(props.displayBar && barShow)" -->
      <a href="javascript:;" class="file" v-show="props.LocalViews">
        <svg
            t="1667282993447"
            class="icon"
            viewBox="0 0 1040 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5231"
            width="32"
            height="32"
        >
          <path
              d="M938.80757 410.549473l-81.94081 80.380033-278.598755-273.136035v545.881875H462.18519V217.988569l-279.639274 273.136034L101.190398 410.549473 520.259113 0z"
              p-id="5232"
              fill="#ffffff"
          ></path>
          <path
              d="M1040.518227 1024H0v-377.187857h115.627588v263.251111h809.263051V647.00724H1040.518227z"
              p-id="5233"
              fill="#ffffff"
          ></path>
        </svg>
        <input type="file" name="" id="" @change="handleChange"/>
      </a>
      <div
          style="
          width: 90px;
          border-left: #666 solid 1px;
          border-right: #666 solid 1px;
          display: flex;
          justify-content: center;
        "
          v-show="props.showPrint || props.showDownLoad"
      >
        <button v-show="props.showDownLoad" @click="downloadFile">
          <svg
              t="1667286245523"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8708"
              width="32"
              height="32"
          >
            <path
                d="M877.489158 381.468085 668.638503 381.468085 668.638503 68.191078 355.361497 68.191078l0 313.277006L146.509818 381.468085l365.489158 365.489158L877.489158 381.468085zM146.509818 851.382571l0 104.425328L877.489158 955.807898 877.489158 851.382571 146.509818 851.382571z"
                p-id="8709"
                fill="#ffffff"
            ></path>
          </svg>
        </button>
        &nbsp;
        <button v-print="printObj" v-show="props.showPrint">
          <svg
              t="1667286458176"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10580"
              width="32"
              height="32"
          >
            <path
                d="M783.296381 356.573091l-545.489742 0c-66.204841 0-116.883057 50.67617-116.883057 116.883057l0 233.764068 155.86079 0 0 155.859767 467.529159 0 0-155.859767 155.864884 0 0-233.764068C900.178415 407.250284 849.496106 356.573091 783.296381 356.573091M666.413324 785.180799l-311.664276 0 0-194.787358 311.664276 0L666.413324 785.180799zM783.296381 512.432859c-23.39892 0-38.983873-15.578814-38.983873-38.97671 0-23.401989 15.58393-38.925544 38.983873-38.925544 23.397896 0 38.921451 15.523555 38.921451 38.925544C822.217832 496.854045 806.694277 512.432859 783.296381 512.432859M744.312508 161.786757l-467.529159 0 0 155.862837 467.529159 0L744.312508 161.786757z"
                p-id="10581"
                fill="#ffffff"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="container">
      <div v-show="loading" class="well loading" :style="{ height : componentsHeight}">?????????????????????????????????...</div>
      <div v-show="!loading" class="well" :style="{ height : componentsHeight}" ref="output" id="output_output"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "previewMore",
};
</script>
<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {getExtend, readBuffer, render} from "./util";
import mime from "mime";
import vPrint from "vue3-print-nb";
import axios from "axios";

// todo ?????????????????????
// ???????????????????????????
// const barShow = ref(true);
// ????????????????????????
// const canDownload = ref(false);
// ??????????????????
// const canPrint = ref(false);
// ??????props??????
// const isProps = ref(false);
// ????????????????????????
// const canLocalView = ref(false)
// ??????????????????
const loading = ref(false);
// ??????????????????
let last = "";
// ??????????????????????????????????????????????????????
// const hidden = ref(false);


const props = defineProps({
  dataSource: {
    type: Blob,
    description: "?????????????????????Blob??????",
  },
  dataUrl: {
    type: String,
    description: "????????????",
  },
  fileName: {
    type: String,
    description: "????????????",
  },
  displayBar: {
    type: Boolean,
    description: "???????????????",
    default: true,
  },
  showDownLoad: {
    type: Boolean,
    default: true,
    description: "??????????????????",
  },
  showPrint: {
    type: Boolean,
    default: true,
    description: "??????????????????",
  },
  LocalViews: {
    type: Boolean,
    default: true,
    description: "??????????????????",
  },
  height: {
    type: Number,
    default: 528,
    description: "????????????",
  }
});

// ??????????????????
const componentsHeight = computed(() => {
  let realHeight;
  if (props.showDownLoad || props.showPrint || props.LocalViews) {
    realHeight = props.height - 42;
  } else {
    realHeight = props.height;
  }
  localStorage.removeItem("componentsHeightIP")
  localStorage.setItem("componentsHeightIP", realHeight)
  return realHeight + 'px'
})

watch(
    () => props.dataSource,
    () => {
      // isProps.value = true;
      createdRun();
    }
);
watch(
    () => props.dataUrl,
    () => {
      // isProps.value = true;
      createdRun();
    }
);

let printObj = reactive({
  id: "printValue_p", //??????????????????id
  popTitle: "", //????????????
  // beforeOpenCallback(vue) {
  //   // console.log("????????????");
  // },
  // //????????????????????????????????????
  // openCallback(vue) {
  //   // console.log("???????????????");
  // },
  // //????????????????????????
  // closeCallback(vue) {
  //   // console.log("?????????????????????");
  // },
});

onMounted(() => {
  createdRun();
});
// ???????????????
const createdRun = () => {
  if (props.dataUrl) {
    // isProps.value = true;
    axios({
      url: props.dataUrl,
      method: "get",
      timeout: 5000,
      responseType: "blob",
    })
        .then((data) => {
          if (!data) {
            console.error("??????????????????");
          }
          //       // ???????????????????????????
          const extension = mime.getExtension(data.data.type);
          // ??????????????????
          let fileName = props.fileName || new Date().getTime() + "." + extension;
          const file = new File([data.data], fileName, {});
          // hidden.value = true;
          handleChange({target: {files: [file]}}, extension);
        })
        .catch((reason) => alert("????????????"));
  }

  if (props.dataSource instanceof Blob) {
    // isProps.value = true;
    //       // ???????????????????????????
    const extension1 = mime.getExtension(props.dataSource.type);
    // ??????????????????
    let fileName = props.fileName || new Date().getTime() + "." + extension1;
    const file = new File([props.dataSource], fileName, {});
    // hidden.value = true;
    handleChange({target: {files: [file]}}, extension1);
  }
};

// ??????????????????????????????
const handleChange = async (e, type = "") => {
  loading.value = true;
  if (e) {
    try {
      const [file] = e.target.files;
      // todo ??????????????????
      // if (type) {
      //   if (isProps.value) {
      //     canDownload.value = true;
      //   }
      //   if (type === "pdf" || type === "mp4") {
      //     canDownload.value = false;
      //     canPrint.value = false;
      //   } else {
      //     canPrint.value = true;
      //   }
      // } else {
      //   const types = mime.getExtension(file.type);
      //   if (types === "pdf" || types === "mp4") {
      //     canDownload.value = false;
      //     canPrint.value = false;
      //   } else {
      //     canPrint.value = true;
      //     canDownload.value = false;
      //   }
      // }

      const arrayBuffer = await readBuffer(file);
      loading.value = false;
      last = await displayResult(arrayBuffer, file).then((res) => res);
    } catch (e) {
      // console.error(e);
    } finally {
      loading.value = false;
    }
  }
};
// ???????????????
const output = ref(null);
const displayResult = (buffer, file) => {
  // ???????????????
  const {name} = file;
  // ???????????????
  const extend = getExtend(name);
  // ????????????dom
  const node = document.createElement("div");
  node.setAttribute("id", "printValue_p");

  // ?????????????????????vue????????????dom??????
  if (last) {
    output.value.removeChild(output.value.childNodes[0]);
  }
  const child = output.value.appendChild(node);
  // ??????????????????????????????
  return new Promise((resolve, reject) =>
      resolve(
          render(buffer, extend, child)
              .then((resolve) => resolve)
              .catch(reject)
      )
  );
};
// ????????????
const downloadFile = () => {
  let fileName =
      props.fileName ||
      new Date().getTime() + "." + mime.getExtension(response.data.type);
  if (props.dataUrl) {
    axios({
      url: props.dataUrl,
      methods: "get",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      // props.dataUrl.match(/([^/*.]+)\.\w+$/)[0]
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  } else if (props.dataSource instanceof Blob) {
    const url = window.URL.createObjectURL(props.dataSource);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    // props.dataUrl.match(/([^/*.]+)\.\w+$/)[0]
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.FuncBar {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: right;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 50px;
  background-color: #3b3b3b;
  border-bottom: #4f4f4f 1px solid;
  color: white;
}

.FuncBar button {
  width: 30px;
  height: 30px;
}

.FuncBar svg {
  width: 18px;
  height: 18px;
}

.file {
  position: relative;
  display: inline-block;
  border-radius: 4px;
  padding: 5px 20px;
  overflow: hidden;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
  margin-right: 10px;
}

.file svg {
  width: 14px;
  height: 14px;
}

.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}

.file:hover {
  background: rgba(88, 88, 88, 0.8);
  color: #fff;
  text-decoration: none;
}

.FuncBar button {
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: #3b3b3b;
  color: white;
  padding: 4px;
}

.FuncBar button:hover {
  background-color: rgba(88, 88, 88, 0.8);
}


.hidden .banner {
  display: none;
}

.well {
  height: 488px;
  overflow: auto;
  box-sizing: border-box;
  background-color: #333333;
}

.banner div {
  color: #000;
}

.banner h1 {
  font-size: 20px;
  line-height: 2;
  margin: 0.5em 0;
}

.loading {
  text-align: center;
  padding-top: 50px;
}

.messages .warning {
  color: #cc6600;
}
</style>

<style>
@media print {
  @page {
    size: auto;
  }

  body,
  html {
    height: auto !important;
  }
}

.docx {
  margin: 18px auto 18px auto;
  background-color: #fff;
}
</style>
