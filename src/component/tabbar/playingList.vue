<template>
  <div>
    <h1>正在播放列表</h1>
    <ul class="mui-table-view" v-for="(item) in showList" :key="item.id">
      <li class="mui-table-view-cell mui-media">
        <router-link :to="'/home/musinfo/'+item.id" class>
          <img
            class="mui-media-object mui-pull-right"
            :src="item.al.pic?item.al.picUrl:'/src/img/del.png'"
            @mouseover="item.al.pic=false"
            @mouseout="item.al.pic=true"
            @click.prevent="del(item.id)"
          >
          <div class="mui-media-body">
            {{ item.name }}
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
      showList: [],
      imgFlag: []
    };
  },
  created() {
    console.log(this.$store.state.songsListId)
    this.getPlayingList();
  },
  methods: {
    getPlayingList() {
      var Liststr = this.$store.state.songsListId.join(",");
      // console.log(Liststr);
      this.$http
        .get("song/detail?ids=" + Liststr)
        .then(result => {
          if (result.status === 200) {
            this.showList = result.body.songs;
            // console.log(this.showList);
          }
        })
        .catch(res => {
          Toast("播放列表为空");
        });
    },
    delshow() {
      this.imgFlag = false;
    },
    reshow() {
      this.imgFlag = true;
    },
    del(id) {
      this.showList.some((item, i) => {
        if (item.id == id) {
          this.showList.splice(i, 1);
          return true;
        }
      });
      console.log(this.showList);
      this.$store.state.delSongId = id;
      this.$store.commit("del");
      // this.$store.state.songsList.some((item, i) => {
      //   if (item.id == id) {
      //     this.$store.state.songsList.splice(i, 1);
      //     return true;
      //   }
      // });
      // console.log(this.$store.state.songsList);
    }
  }
};
</script>

<style scoped>
</style>

