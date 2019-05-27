<template>
  <div>
    <div class="col-lg-6">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search for..."
          v-model="searchInfo"
          @keyup.enter="search()"
        >
        <span class="input-group-btn">
          <button class="btn btn-default" type="button" @click="search()">Go!</button>
        </span>
      </div>
    </div>
    <ul class="nav nav-tabs nav-justified" v-if="show">
      <li role="presentation" :class="active[0]" @click="activeFlag(0)">
        <router-link to="/search/resSongs">单曲</router-link>
      </li>
      <li role="presentation" :class="active[1]" @click="activeFlag(1)">
        <router-link to="/search/resAlbum">专辑</router-link>
      </li>
      <li role="presentation" :class="active[2]" @click="activeFlag(2)">
        <router-link to="/search/resAuthor">歌手</router-link>
      </li>
      <li role="presentation" :class="active[3]" @click="activeFlag(3)">
        <router-link to="/search/resSongsList">歌单</router-link>
      </li>
      <li role="presentation" :class="active[4]" @click="activeFlag(4)">
        <router-link to="/search/resUser">用户</router-link>
      </li>
      <!-- <li role="presentation" class="active[5]" @click="activeFlag(0)">
        <router-link to="">MV</router-link>
      </li>
      <li role="presentation" class="active[6]" @click="activeFlag(0)">
        <router-link to="">歌词</router-link>
      </li>
      <li role="presentation" class="active[7]" @click="activeFlag(0)">
        <router-link to="">电台</router-link>
      </li>
      <li role="presentation" class="active[8]" @click="activeFlag(0)">
        <router-link to="">视频</router-link>
      </li> -->
    </ul>
    <router-view :searchInfo="searchInfo" :go="go"></router-view>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      searchInfo: "",
      SongsRes: [],
      active: ["active",null,null,null,null],
      go: true,
      show:false
    };
  },
  methods: {
    activeFlag(index) {
      this.active = [null,null,null,null,null];
      this.active[index] = "active";
    },
    search() {
      this.go = !this.go;
      this.show = true;
    }
  }
};
</script>

<style scoped>
</style>
