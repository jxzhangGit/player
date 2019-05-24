<template>
  <div class="musinfo-content">
    <!-- 内容区 -->
    <h3 class="tittle">{{ musinfo[0].name }}</h3>
    <p class="subtittle">
      <span class="arName">{{ musinfo[0].ar[0].name }}</span>
      <a href="#" @click="sendMusId">添加到播放列表</a>
    </p>
    <hr>
    <div class="content"></div>
    <!-- 评论区 -->
    <comment-box></comment-box>
  </div>
</template>

<script>
import comment from "../common/comment.vue"

// import global from "../common/global.vue"

import { Toast } from "mint-ui";
export default {
  data(){
    return {
      id: this.$route.params.id,
      musinfo: [],
      asdf:this.GLOBAL.asdf
    }
  },
  created(){
    this.getMusinfo();
  },
  methods: {
    getMusinfo(){
      console.log(this.asdf+"====");
      this.$http.get("song/detail?ids="+this.id).then(result=>{
        // console.log(result);
        if(result.status===200&&result.body.songs.length!=0){
          this.musinfo = result.body.songs;
        }else{
          Toast("获取歌曲失败")
        }
      })
    },
    sendMusId:function (params) {
      this.$emit("getMusId",this.id);
    }
  },
  components:{
    "comment-box":comment
  }
}
</script>

<style scoped>
  .musinfo-content{
    padding: 0 4px;
  }
  .tittle{
    text-align: center;
    margin: 0 16px;
    /* color: blue; */
  }
  .subtittle{
    margin: 0;
    font-size: 13px;
    color: blue;
    display: flex;
    justify-content: space-between;
  }
  hr{
    margin: 0;
  }
  .arName{
    color: black
  }
  /* .subtittle
  .content */
</style>
