<template>
  <div>
    <h4>评论区</h4>
    <textarea placeholder="请输入评论" maxlength="120" v-model="newComment"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="comment-list" v-for="item in comments" :key="item.time">
      <div class="comment-title">
        <!-- <span>{{index+1}}楼</span> -->
        <span>{{item.user.nickname}}</span>
        <span>{{item.time | dataFormat("YYYY-MM-DD HH:MM:SS")}}</span>
      </div>
      <div class="comment-body">{{item.content==="undefined"?"此用户没发表评论":item.content}}</div>
    </div>

    <mt-button type="danger" size="large" plain @click="addmore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: this.$route.params.id,
      comments: [],
      pageindex: 1,
      newComment: ""
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    getComment() {
      this.$http
        .get("comment/music?id=" + this.id + "&limit=" + this.pageindex * 10)
        .then(result => {
          // console.log(result);
          if (result.status === 200) {
            this.comments = result.body.comments;
          } else {
            Toast("获取评论失败");
          }
        });
    },
    addmore() {
      this.pageindex++;
      this.getComment();
    },
    postComment() {
      if (this.newComment.trim().length===0) {
        return Toast("请输入评论");
      }
      // this.$http.get("login/cellphone?phone=13066974842&password=67373(wangyiyun)").then(result=>{
      //   console.log(result);
      // })
      this.$http.get("comment?t=1&type=0&id="+this.id+"&content="+this.newComment).then(result=>{
        console.log(result);
        Toast("评论成功");
        this.getComment();
      }).catch(res=>{
        switch (res.status) {
          case 301:Toast("请先登录");break;
          case 401:Toast("无法评论该资源");break;
          // case 200:Toast("评论成功");break;
          default:
            break;
        }
      })
      // this.comments.unshift(this.newComment);
    }
  }
};
</script>

<style scoped>
textarea {
  font-size: 15px;
  margin: 0;
}
.comment-list {
  margin: 5px 0;
}
.comment-list .comment-title {
  line-height: 30px;
  font-size: 15px;
  background-color: #bbb;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
.comment-list .comment-body {
  line-height: 50px;
  font-size: 12px;
  text-indent: 2em;
}
</style>
