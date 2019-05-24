<template>
  <div class="userInfo_content">
    <h4>歌单</h4>
    <div class="media" v-for="item in playlist" :key="item.id">
      <div class="media-left media-middle">
        <a href="#">
          <img class="media-object" :src="item.coverImgUrl" alt="...">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">{{ item.name }}</h4>
        {{ item.trackCount }}首，播放{{ item.playCount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlist: []
    };
  },
  created() {
    this.getPlaylist();
  },
  methods: {
    getPlaylist() {
      this.$http
        .get("user/playlist?uid=" + this.$route.query.uid)
        .then(result => {
          console.log(result);
          this.playlist = result.body.playlist;
        })
        .catch(res => {
          console.log("===" + res);
        });
    }
  }
};
</script>

<style scoped>
.userInfo_content {
  width: 250px;
  margin: 0 auto;
  text-align: left;
}
.userInfo_content .media-object{
  width: 50px;
  height: 50px;
}
</style>
