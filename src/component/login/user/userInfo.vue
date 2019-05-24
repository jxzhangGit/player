<template>
  <div class="userInfo_content">
    <h4>个人信息</h4>
    <p>等级：{{ userInfo.level }}</p>
    <p>性别：{{ `userInfo.profile.gender` | genderFormat }}</p>
    <p>听歌数目：{{ userInfo.listenSongs }}</p>
    <h4>个人介绍</h4>
    <p>个人介绍：{{ userInfo.profile.signature | signatureFormat}}</p>
  </div>
</template>

<script>
import Vue from "Vue"
Vue.filter("signatureFormat",function(signature=""){
  if(signature==""){
    return "还没有填写个人介绍";
  }else return signature;
})
export default {
  data() {
    return {
      userInfo:{}
    }
  },
  created(){
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      // console.log(this.$route.query.uid)
      this.$http
        .get("user/detail?uid="+this.$route.query.uid)
        .then(result => {
          // console.log(result);
          this.userInfo = result.body;
        })
    }
  }
};
</script>

<style scoped>
.userInfo_content {
  margin: 0 auto;
  width: 200px;
  text-align: left;
}
</style>
