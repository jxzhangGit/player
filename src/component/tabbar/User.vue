<template>
  <div>
    <div class="profile">
      <img :src="profile.avatarUrl" alt class="profile-photo">
      <h3 class="profile_nickname">{{profile.nickname}}</h3>
      <ul class="nav nav-pills">
        <li role="presentation" class="active">
          <router-link :to="'/user/userInfo?uid='+this.profile.userId">关于我</router-link>
        </li>
        <li role="presentation">
          <router-link :to="'/user/userPlaylist?uid='+this.profile.userId">音乐</router-link>
        </li>
        <li role="presentation">
          <router-link to="#">动态</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      profile: {},
      userid: null,
      active: "active",
      activeFlag: false
    };
  },
  created() {
    var userid = this.getLoginStatus();
  },
  methods: {
    getLoginStatus() {
      this.$http
        .get("login/status")
        .then(result => {
          // console.log(result);
          this.profile = result.body.profile;
        })
        .catch(res => {
          // console.log(res);
          this.$router.push({ path: "/user/login" });
        });
    }
  },
  // watchs: {

  // }
};
</script>

<style scoped>
.profile {
  width: 80%;
  margin: 3% auto;
  text-align:center;
}
.profile-photo {
  height: 30%;
  width: 30%;
  min-height: 100px;
  min-width: 100px;
}
.profile ul{
  display: inline-block;
}
</style>