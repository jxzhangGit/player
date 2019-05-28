<template>
  <div>
    <div style="padding:10px 0;">
      <a-player :music="{}" :showlrc="true" v-if="!playerflag"></a-player>
      <a-player
        :autoplay="true"
        :music="this.$store.state.songsList[songIndex]"
        :list="this.$store.state.songsList"
        :showlrc="true"
        :controls="true"
        @pause="pause1"
        v-if="playerflag"
        :listFolded="true"
      ></a-player>
      <!-- <a-player :music="{}" :showlrc="true" v-if="!playerflag"></a-player> -->
      <!-- <a-player autoplay :music="songInfo"></a-player> -->
    </div>
  </div>
</template> 
  
<script>
import VueAplayer from "vue-aplayer";
import { Toast } from "mint-ui";
import store from "../../store";
export default {
  components: {
    "a-player": VueAplayer
  },
  data() {
    return {
      flag: false,
      playerflag: false,
      songList: this.$store.state.songList,
      songInfo: this.$store.state.songInfo,
      songIndex: 0,
      i: 0,
      songInfoFlag: 0,
      songIdList: []
    };
  },
  created() {
    // this.getSongDetail();
    // this.getSongUrl();
    // this.getSongLrc();
    // console.log(this.$store.state.songsList);
    this.sendSongList();
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    delRequire() {
      return this.$store.state.delRequire;
    }
    // songList(){
    //   return this.$store.state.songList;
    // },
    // songInfo(){
    //   return this.$store.state.songInfo;
    // }
  },
  watch: {
    count: function() {
      // console.log("=");
      if (this.songIdList.indexOf(this.$store.state.songId) == -1) {
        this.songIndex++;
        // console.log(this.$store.state.songId);
        this.songIdList.push(this.$store.state.songId);
        this.playerflag = false;
        this.sendSongList(this.$store.state.songId);
      }
    },
    delRequire: function() {
      this.playerflag = false;
      this.songIndex--;
      this.$store.state.songsList.some((item, i) => {
        if (item.id == this.$store.state.delSongId) {
          this.$store.state.songsList.splice(i, 1);
          return true;
        }
      });
      // console.log(this.$store.state.delSongId);
      // console.log([1,2,3,4]);
      var index = this.$store.state.songsListId.indexOf(this.$store.state.delSongId.toString());
      // console.log(index);
      this.$store.state.songsListId.splice(index, 1);
      // console.log(this.$store.state.songsListId)
      this.playerflag = true;
    }
  },
  methods: {
    // 载入音乐播放器
    sendSongList(songId = null) {
      if (songId == null) {
        // console.log(this.$store.state.songsList);
        // if (this.$store.state.songsList==[]) {
        //   console.log(this.$store.state.songsList);
        // }
        this.playerflag = true;
        this.songInfoFlag = 3;
        return;
      }
      this.$http
        .get("song/detail?ids=" + songId)
        // =========  detail
        .then(result_detail => {
          if (
            result_detail.status === 200 &&
            result_detail.body.songs.length != 0
          ) {
            // console.log(result_detail.songInfo);
            this.songInfoFlag = 2;
            this.$store.state.songInfo.id = songId;
            this.$store.state.songInfo.title = result_detail.body.songs[0].name;
            this.$store.state.songInfo.pic =
              result_detail.body.songs[0].al.picUrl;
            this.$store.state.songInfo.author =
              result_detail.body.songs[0].ar[0].name;
            return this.$http.get("song/url?id=" + songId);
          }
        })
        // =========  url
        .then(result_url => {
          // console.log(result_url)
          if (result_url.body.data[0].url != null) {
            this.$store.state.songInfo.src = result_url.body.data[0].url;
            this.songInfoFlag = 1;
            // console.log(this.$store.state.songInfo);
          } else {
            Toast("未找到歌曲音源");
          }
          return this.$http.get("lyric?id=" + songId);
        })
        // =========  lrc
        .then(result_lrc => {
          // this.songInfoFlag = 0;
          // console.log(result_lrc);
          if (result_lrc.body.lrc) {
            this.$store.state.songInfo.lrc = result_lrc.body.lrc.lyric;
          } else {
            this.$store.state.songInfo.lrc = "暂无歌词";
          }
          let songInfo = cloneObj(this.$store.state.songInfo);
          this.$store.state.songsListId.push(songId);
          this.$store.state.songsList.push(songInfo);
          // this.$store.state.songsList.push(this.$store.state.songInfo);
          // this.$store.commit("pusharr");
          // console.log(this.$store.state.songsList);
          this.playerflag = true;
          this.songInfoFlag = 0;
        })
        .catch(res => {
          // console.log(res);
          switch (this.songInfoFlag) {
            case 2:
              Toast("获取音源失败");
              break;
            case 1:
              Toast("获取歌词失败");
              let songInfo = cloneObj(this.$store.state.songInfo);
              this.$store.state.songsListId.push(songId);
              this.$store.state.songsList.push(songInfo);
              // this.$store.state.songsList.push(this.$store.state.songInfo);
              // this.$store.commit("pusharr");
              this.playerflag = true;
              break;
            case 3:
              break;
            default:
              Toast("获取音乐失败");
              break;
          }
          this.songInfoFlag = 0;
        });
    },
    // 暂停事件
    pause1() {
      // console.log(123);
    }
  }
};
function cloneObj(obj) {
  //1
  var newJsonObj = {};
  newJsonObj = JSON.parse(JSON.stringify(obj));
  //2
  for (var items in obj) {
    if (
      typeof obj[items] == "function" ||
      typeof obj[items] == "undefined" ||
      obj[items] instanceof RegExp
    ) {
      newJsonObj[items] = obj[items];
    }
  }
  //3
  var newObj = new obj.constructor();
  for (items in newJsonObj) {
    newObj[items] = newJsonObj[items];
  }
  return newObj;
}
// getSongUrl() {
//   // 获取url
//   this.$http
//     .get("song/url?id=" + songId)
//     .then(result => {
//       // console.log(result);
//       if (result.body.data[0].url == null) {
//         Toast("未找到歌曲音源");
//       } else {
//         this.$store.state.songInfo.src = result.body.data[0].url;
//       }
//     })
//     .catch(res => {
//       // console.log(res);
//       Toast("歌曲播放失败");
//     });
// },

// // 获取歌词
// getSongLrc() {
//   this.$http
//     .get("lyric?id=" + songId)
//     .then(result => {
//       // console.log(result);
//       this.$store.state.songInfo.lrc = result.body.lrc.lyric;
//       this.$store.state.songsList.push(this.$store.state.songInfo);
//     })
//     .catch(res => {
//       Toast("暂无歌词");
//       this.$store.state.songInfo.lrc = null;
//       this.$store.state.songsList.push(this.$store.state.songInfo);
//     });
// },

// // 获取歌曲详情
// getSongDetail() {
//   this.$http
//     .get("song/detail?ids=" + songId)
//     .then(result => {
//       // console.log(result);
//       this.$store.state.songInfo.title = result.body.songs[0].name;
//       this.$store.state.songInfo.pic = result.body.songs[0].al.picUrl;
//       this.$store.state.songInfo.author = result.body.songs[0].ar[0].name;
//     })
//     .catch(res => {
//       Toast("歌曲信息加载失败");
//     });
// },
</script> 
  
<style scoped>
.aplayer-lrc {
  height: 100px !important;
}
</style>

