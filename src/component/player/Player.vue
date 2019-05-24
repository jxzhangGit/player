<template>
  <div>
    <div style="padding:10px 0;">
      <!-- <a-player
        :music="{author: '信乐团',lrc: '[00:33.45]我曾怀疑我 走在沙漠中↵[00:40.89]从不结果 无论种什么梦↵[00:47.77]才张开翅膀 风却变沉默↵[00:54.09]习惯伤痛能不能算收获↵[01:02.24]庆幸的是我 一直没回头↵[01:09.61]终于发现真的是有绿洲↵[01:16.71]每把汗流了 生命变的厚重↵[01:22.93]走出沮丧才看见 新宇宙↵[01:31.47]海阔天空 在勇敢以后↵[01:38.60]要拿执着 将命运的锁打破↵[01:45.40]冷漠的人↵[01:48.13]谢谢你们曾经看轻我↵[01:53.11]让我不低头 更精彩得活↵[02:11.02]凌晨的窗口 失眠整夜以后↵[02:18.47]看着黎明从云里抬起了头↵[02:25.22]日落是沉潜 日出是成熟↵[02:31.53]只要是光一定会灿烂的↵[02:40.03]海阔天空 在勇敢以后↵[02:47.11]要拿执着 将命运的锁打破↵[02:53.88]冷漠的人↵[02:56.45]谢谢你们曾经看轻我↵[03:01.57]让我不低头 更精彩得活↵[03:41.42]海阔天空 狂风暴雨以后↵[03:48.47]转过头 对旧心酸一笑而过↵[03:55.70]最懂我的人↵[03:57.56]谢谢一路默默地陪我↵[04:03.13]让我拥有 好故事可以说↵[04:10.45]看未来 一步步来了',pic: 'https://p1.music.126.net/U3uwHEdkkp-wXBynNYEVjg==/119846767442613.jpg',src: 'http://m10.music.126.net/20190522230939/ff71adf1e7ed37fba0b826772334e900/ymusic/65d0/72f4/3013/0451fcc1d696f00f108657f026d46124.mp3',title: '海阔天空'}"
        :list="songsList"
        :showlrc="true"
        v-if="true"
      ></a-player>-->
      <a-player :music="GLOBAL.songsList[0]" :list="GLOBAL.songsList" :showlrc="true" v-if="playerflag"></a-player>
      <a-player :music="{}" :showlrc="true" v-if="!playerflag"></a-player>
      <!-- <a-player autoplay :music="songInfo"></a-player> -->
    </div>
  </div>
</template> 
  
<script>
import VueAplayer from "vue-aplayer";
import { Toast } from "mint-ui";
import func from '../../../vue-temp/vue-editor-bridge';
export default {
  components: {
    "a-player": VueAplayer
  },
  data() {
    return {
      flag: false,
      songInfo: {},
      songsList: this.GLOBAL.songsList,
      playerflag: false,
      i: 0,
      songInfoFlag: 0
    };
  },
  created() {
    // this.getSongDetail();
    // this.getSongUrl();
    // this.getSongLrc();
    // console.log(this.GLOBAL.songsList);
    this.sendSongList();
  },
  watch:{
    "this.GLOBAL.songsList":function(){
      
    }
  }
  methods: {
    // getSongUrl() {
    //   // 获取url
    //   this.$http
    //     .get("song/url?id=" + this.GLOBAL.songId)
    //     .then(result => {
    //       // console.log(result);
    //       if (result.body.data[0].url == null) {
    //         Toast("未找到歌曲音源");
    //       } else {
    //         this.GLOBAL.songInfo.src = result.body.data[0].url;
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
    //     .get("lyric?id=" + this.GLOBAL.songId)
    //     .then(result => {
    //       // console.log(result);
    //       this.GLOBAL.songInfo.lrc = result.body.lrc.lyric;
    //       this.GLOBAL.songsList.push(this.GLOBAL.songInfo);
    //     })
    //     .catch(res => {
    //       Toast("暂无歌词");
    //       this.GLOBAL.songInfo.lrc = null;
    //       this.GLOBAL.songsList.push(this.GLOBAL.songInfo);
    //     });
    // },

    // // 获取歌曲详情
    // getSongDetail() {
    //   this.$http
    //     .get("song/detail?ids=" + this.GLOBAL.songId)
    //     .then(result => {
    //       // console.log(result);
    //       this.GLOBAL.songInfo.title = result.body.songs[0].name;
    //       this.GLOBAL.songInfo.pic = result.body.songs[0].al.picUrl;
    //       this.GLOBAL.songInfo.author = result.body.songs[0].ar[0].name;
    //     })
    //     .catch(res => {
    //       Toast("歌曲信息加载失败");
    //     });
    // },

    // 载入音乐播放器
    sendSongList() {
      if(this.GLOBAL.songId==""){
        this.songInfoFlag = 3;
        return;
      }
      this.$http
        .get("song/detail?ids=" + this.GLOBAL.songId)
        // =========  detail
        .then(result_detail => {
          if (
            result_detail.status === 200 &&
            result_detail.body.songs.length != 0
          ) {
            // console.log(result_detail.songInfo);
            this.songInfoFlag = 2;
            this.GLOBAL.songInfo.title = result_detail.body.songs[0].name;
            this.GLOBAL.songInfo.pic = result_detail.body.songs[0].al.picUrl;
            this.GLOBAL.songInfo.author =
              result_detail.body.songs[0].ar[0].name;
            return this.$http.get("song/url?id=" + this.GLOBAL.songId);
          }
        })
        // =========  url
        .then(result_url => {
          // console.log(result_url)
          if (result_url.body.data[0].url != null) {
            this.GLOBAL.songInfo.src = result_url.body.data[0].url;
            this.songInfoFlag = 1;
            // console.log(this.GLOBAL.songInfo);
          } else {
            Toast("未找到歌曲音源");
          }
          return this.$http.get("lyric?id=" + this.GLOBAL.songId);
        })
        // =========  lrc
        .then(result_lrc => {
          // this.songInfoFlag = 0;
          // console.log(result_lrc);
          if(result_lrc.body.lrc){
            this.GLOBAL.songInfo.lrc = result_lrc.body.lrc.lyric;
          }else{
            this.GLOBAL.songInfo.lrc = "暂无歌词"
          }
          this.GLOBAL.songsList.push(this.GLOBAL.songInfo);
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
              this.GLOBAL.songsList.push(this.GLOBAL.songInfo);
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
    }
  }
};
</script> 
  
<style scoped>
.aplayer-lrc {
  height: 100px !important;
}
</style>