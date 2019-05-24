<template>
  <div>
    <h3>{{ day | dataFormat("YYYY-MM-DD") }}</h3>
    <ul id="list" class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/musinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" data-lazyload-id="0"  :src="item.picUrl">
          <div class="mui-media-body">
            <h4>{{ item.name }}</h4>
            <p class="mui-ellipsis">{{ item.artists[0].name }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import { Toast } from "mint-ui";


export default {
  data() {
    return {
      newsList: [],
      day:new Date()
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get("top/album?limit=10").then(result => {
        if (result.status === 200) {
          // console.log(result.body.albums);
          this.newsList = result.body.albums;
        } else Toast("获取列表失败");
      });
    }
  }
};
</script>

<style>


</style>
