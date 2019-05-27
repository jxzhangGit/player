// import Vue from "Vue"
import VueRouter from "vue-router"
// Vue.use(VueRouter)

// import store from './store.js'

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
import playlistDetail from "./component/playlist/playlistDetail.vue"

import toplist from "./component/toplist/toplist.vue"
import toplistDetail from "./component/toplist/toplistDetail.vue"

import login from "./component/login/login.vue"
import userInfo from "./component/login/user/userInfo.vue"
import userPlaylist from "./component/login/user/userPlaylist.vue"


import search from "./component/search/search.vue"
import resSongs from "./component/search/resSongs.vue"
import resSongsList from "./component/search/resSongsList.vue"
import resAlbum from "./component/search/resAlbum.vue"
import resAuthor from "./component/search/resAuthor.vue"
import resUser from "./component/search/resUser.vue"



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
    {path:"/playlist/detail/:id", component:playlistDetail},
    {path:"/home/toplist", component:toplist},
    {path:"/home/toplist/:idx", component:toplistDetail},


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

    {path:"/search", component:search,redirect:"/search/resSongs",
    children: [
      {path:"resSongs", component:resSongs},
      {path:"resSongsList", component:resSongsList},
      {path:"resAlbum", component:resAlbum},
      {path:"resAuthor", component:resAuthor},
      {path:"resUser", component:resUser}
    ]},
  ],
  linkActiveClass: "mui-active"
})



export default router;