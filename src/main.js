import Vue from "Vue"
// 导入路由
import VueRouter from "vue-router"
Vue.use(VueRouter)
import router from "./router.js"

// 导入vue-resource
import VueResource from "vue-resource"
Vue.use(VueResource);
Vue.http.options.root = "http://localhost:3000"
Vue.http.options.emulateJSON = true;
Vue.http.options.xhr = { withCredentials: true };
import app from "./app.vue"

// 导入mint ui
import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
Vue.use(MintUI);

// 导入MUI
// import "./lib/MUIdist/css/mui.css"
import "./lib/MUIdist/css/mui.min.css"
import "./lib/MUIdist/css/icons-extra.css"
import "./lib/MUIdist/css/iconfont.css"
import "./lib/MUIdist/js/mui.min.js"

// 导入bootstrap
import "bootstrap/dist/css/bootstrap.css"

// 全局变量
import global_ from './component/common/global.vue'
Vue.prototype.GLOBAL = global_;

var vm = new Vue({
  el: "#app",
  data:{
    playsongsList:[],
    playingSongInfo:{},
  },
  render: c => c(app),
  router
})


import moment from "moment"
Vue.filter("dataFormat",function(dataStr,pattern="YYYY-MM-DD HH:MM:SS"){
  var timeStr = new Date(dataStr);
  return moment(timeStr).format(pattern);
})

Vue.filter("genderFormat",function(gender){
  if(gender==1){
    return "男";
  }else return "女";
})