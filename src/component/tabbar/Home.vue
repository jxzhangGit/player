<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in slideshowList" :key="item.bannerId">
        <img :src="item.pic" alt="">
      </mt-swipe-item>
    </mt-swipe>

    
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="home/newslist">
          <img src="../../img/menu1.png" alt="">
          <div class="mui-media-body">每日新歌</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="home/toplist">
          <img src="../../img/menu2.png" alt="">
          <div class="mui-media-body">排行榜</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="home/playlist/rePlaylist">
          <img src="../../img/menu3.png" alt="">
          <div class="mui-media-body">歌单</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../img/menu4.png" alt="">
          <div class="mui-media-body">电台</div>
        </a>
      </li>
      <!-- <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../img/menu5.png" alt="">
          <div class="mui-media-body">直播</div>
        </a>
      </li> -->
    </ul>
  </div>
</template>


<script>
import { Toast } from "mint-ui";
import { constants } from "crypto";

export default {
  data() {
    return {
      slideshowList: []
    };
  },
  created() {
    this.getSlideshow();
  },
  methods: {
    getSlideshow() {
      this.$http.get("banner?type=2").then(result => {
        // console.log(result.body.banners);
        // for (let index = 0; index < result.body.albums.length; index++) {
        //   this.slideshowList.push(result.body.albums[index]);
        // }
        this.slideshowList = result.body.banners;
        // console.log(result.body);
      });
    }
  }
};
</script>

<style scoped>
.mint-swipe {
  height: 300px;
}
.mint-swipe-item img {
  /* background-color: red; */
  width: 100%;
  height: 100%;
}
.mui-table-view-cell{
  width: 25%;
}
.mui-grid-view.mui-grid-9{
  background-color: #fff;
  border: none;
  min-width: 350px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border: none;
}
.mui-grid-view.mui-grid-9 img{
  width: 50%;
  height: 50%;
}
</style>


