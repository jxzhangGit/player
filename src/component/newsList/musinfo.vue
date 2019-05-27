<template>
  <div class="musinfo-content">
    <!-- 内容区 -->
    <h3 class="tittle" v-if="musinfo[0]">{{ musinfo[0].name }}</h3>
    <p class="subtittle">
      <span class="arName" v-if="musinfo[0]&&musinfo[0].ar">{{ musinfo[0].ar[0].name }}</span>
      <a href="" @click.prevent="increment">添加到播放列表</a>
    </p>
    <hr>
    <div class="content"></div>
    <!-- 评论区 -->
    <comment-box></comment-box>
  </div>
</template>

<script>
import comment from "../common/comment.vue";

import Player from "../player/Player.vue";

// import {mapGetters, mapActions} from 'vuex';
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id,
      musinfo: [],
      asdf: this.GLOBAL.asdf
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  watch: {
    count: function() {
      // this.$store.state.songId = this.id;
    }
  },
  created() {
    this.$store.state.songId = this.id;
    this.getMusinfo();
  },
  methods: {
    increment() {
      this.$store.commit("addCount");
    },
    getMusinfo() {
      // console.log(this.asdf + "====");
      this.$http.get("song/detail?ids=" + this.id).then(result => {
        // console.log(result);
        if (result.status === 200 && result.body.songs.length != 0) {
          this.musinfo = result.body.songs;
        } else {
          Toast("获取歌曲失败");
        }
      });
    },
    increment() {
      this.$store.commit("addCount");
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>

<style scoped>
.musinfo-content {
  padding: 0 4px;
}
.tittle {
  text-align: center;
  margin: 0 16px;
  /* color: blue; */
}
.subtittle {
  margin: 0;
  font-size: 13px;
  color: blue;
  display: flex;
  justify-content: space-between;
}
hr {
  margin: 0;
}
.arName {
  color: black;
}
/* .subtittle
  .content */
</style>
