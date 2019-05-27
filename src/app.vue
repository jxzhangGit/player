<template>
  <div>
    <player class="player"></player>
    <div :class="{content:true,contentplayer:true}">
      <mt-header fixed title="张家欣项目">
        <router-link to="/home" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <router-link to="/search" slot="right">
          <mt-button icon="search"></mt-button>
        </router-link>
      </mt-header>
      <!-- <a href="#" @click="player.created">asdfadsfasdf</a> -->
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/member">
          <span class="mui-icon mui-icon-email"></span>
          <span class="mui-tab-label">消息</span>
        </router-link>
        <router-link class="mui-tab-item" to="/playingLIst">
          <span class="mui-icon iconfont iconyinle">
            <span class="mui-badge">{{ this.$store.state.songsListId.length }}</span>
          </span>
          <span class="mui-tab-label">播放列表</span>
        </router-link>
        <router-link class="mui-tab-item" to="/user">
          <span class="mui-icon mui-icon-contact mui-icon-icon-contact"></span>
          <span class="mui-tab-label">用户</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import player from "./component/player/Player.vue";
export default {
  data() {
    return {
      songidMsg: 347230,
      isactive: true
    };
  },
  components: {
    player: player
  },
  methods: {
    showChildMsg(data) {
      console.log(data);
    }
  }
};
</script>


<style scoped>
.content {
  width: 80%;
  min-width: 350px;
  padding-top: 40px;
  padding-bottom: 50px;
  margin: 0 auto;
  overflow-x: hidden;
}
.contentplayer {
  padding-top: 150px;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.iconyinle {
  width: 100%;
  height: 100%;
}
.player {
  width: 90%;
  min-width: 300px;
  position: fixed;
  margin-left: -45%;
  margin-top: 25px;
  left: 50%;
  display: block;
  z-index: 2000;
}
</style>
