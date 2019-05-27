<template>
  <div>
    <h3>{{ playlistInfo.name }}</h3>
    <ul id="list" class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" v-for="(item,index) in playlist" :key="item.id">
        <router-link :to="'/home/musinfo/'+item.id">
          <!-- <img class="mui-media-object mui-pull-left" data-lazyload-id="0"  :src="item.al.picUrl"> -->
          <div class="mui-media-object mui-pull-left">
            <p>{{ index+1 }}</p>
            <span class="glyphicon glyphicon-music" aria-hidden="true"></span>
          </div>
          <div class="mui-media-body">
            <h3>{{ item.name }}</h3>
            <p class="mui-ellipsis">{{ item.ar[0].name }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      listId: this.$route.params.id,
      playlistInfo: [],
      playlistId: [],
      playlist: []
    };
  },
  created() {
    // console.log(this.listId);
    this.getListDetail();
  },
  methods: {
    getListDetail() {
      this.$http
        .get("playlist/detail?id=" + this.listId)
        .then(result => {
          // console.log(result);
          if (result.status === 200) {
            // console.log(result.body);
            this.playlistInfo = result.body.playlist;
            this.playlist = result.body.privileges;
            console.log(this.playlist);
          } else Toast("获取歌单失败");
        })
        .then(function() {
          for (let index = 0; index < this.playlist.length; index++) {
            this.playlistId.push(this.playlist[index].id);
          }
          this.playlist = [];
          console.log(this.playlistId);
          const idstr = this.playlistId.join(",");
          // console.log(idstr);
          return this.$http.get("song/detail?ids=" + idstr);
        })
        .then(result => {
          console.log(result);
          if (result.status == 200) {
            this.playlist = result.body.songs;
          }
        })
        .catch(res => {
          Toast("获取歌单失败");
        });
    }
  }
};
</script>

<style>
</style>
