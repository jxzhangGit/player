import Vue from "Vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import home from "./component/tabbar/Home.vue"
import member from "./component/tabbar/Member.vue"
import playingList from "./component/tabbar/playingList.vue"
import user from "./component/tabbar/User.vue"

import newsList from "./component/newsList/newsList.vue"
import musinfo from "./component/newsList/musinfo.vue"

import playlist from "./component/playlist/playlist.vue"
import rePlaylist from "./component/playlist/rePlaylist.vue"
import ChPlaylist from "./component/playlist/ChPlaylist.vue"
import EnPlaylist from "./component/playlist/EnPlaylist.vue"
import JaPlaylist from "./component/playlist/JaPlaylist.vue"
import KoPlaylist from "./component/playlist/KoPlaylist.vue"
import CanPlaylist from "./component/playlist/CanPlaylist.vue"

import login from "./component/login/login.vue"
import userInfo from "./component/login/user/userInfo.vue"
import userPlaylist from "./component/login/user/userPlaylist.vue"


var router = new VueRouter({
  routes: [
    // =====home组件
    {path:"/", redirect:"/home"},
    {path:"/home", component:home},
    {path:"/home/newsList", component:newsList},
    {path:"/home/musinfo/:id", component:musinfo},
    {path:"/home/playlist", component:playlist,
    children: [
      {path:"rePlaylist", component:rePlaylist},
      {path:"ChPlaylist", component:ChPlaylist},
      {path:"EnPlaylist", component:EnPlaylist},
      {path:"JaPlaylist", component:JaPlaylist},
      {path:"KoPlaylist", component:KoPlaylist},
      {path:"CanPlaylist", component:CanPlaylist},
    ]},

    // =====
    {path:"/member", component:member},

    // =====
    {path:"/playingList", component:playingList},

    // =====
    {path:"/user", component:user,
      children: [
        {path:"userInfo", component:userInfo},
        {path:"userPlaylist", component:userPlaylist}
      ]},
    {path:"/user/login", component:login},
  ],
  linkActiveClass: "mui-active"
})

export default router;