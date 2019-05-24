<template>
  <div>
    <div id="slider" class="mui-slider" fixed>
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div fixed class="mui-scroll">
          <router-link to="/home/playlist/rePlaylist"
            class="mui-control-item mui-active"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
          >推荐</router-link>
          <router-link to="/home/playlist/ChPlaylist" class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">华语</router-link>
          <router-link to="/home/playlist/CanPlaylist" class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">粤语</router-link>
          <router-link to="/home/playlist/EnPlaylist" class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">欧美</router-link>
          <router-link to="/home/playlist/JaPlaylist" class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">日语</router-link>
          <router-link to="/home/playlist/KoPlaylist" class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">韩语</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  data(){
    return {
    }
  },
  created(){
    // this.getPlaylistCatlist();
  },
  methods:{
    // 0流行  2华语  24粤语 9欧美 14日语  19韩语 25小语种  
    getPlaylistCatlist(){
      this.$http.get("playlist/catlist").then(result=>{
        if(result.status==200){
          console.log(result);
        }else{
          Toast("获取歌单失败");
        }
      }).catch(res=>{
        Toast("获取歌单失败");
      })
    }
  }
};
</script>

<style>
</style>
