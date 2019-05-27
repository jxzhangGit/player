<template>
  <div>
    <h1>推荐歌单</h1>
    <div class="row">
      <div v-for="item in rePlaylist" :key="item.id" class="listBox">
        <router-link :to="'/playlist/detail/'+item.id" class="thumbnail">
          <img :src="item.coverImgUrl" alt class="listImg">
        </router-link>
        <p class="line-limit-length">{{ item.description | descriptionFilter }}</p>
      </div>
    </div>
    <mt-spinner type="fading-circle" color="blue" :size="60" v-if="spinnerFlag"></mt-spinner>
  </div>
</template>

<script>

import { Toast } from "mint-ui";
import Vue from "Vue";
import { constants } from "crypto";
import { clearTimeout, setTimeout } from "timers";



export default {
  data() {
    return {
      rePlaylist: [],
      limit: 12,
      spinnerFlag: false,
      scrollTop: 0,
      windowHeight: 0,
      scrollHeight: 0
    };
  },
  mounted() {
    //给window添加一个滚动滚动监听事件
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.getPlaylist();
  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    scrollTop: function() {
      // console.log("======")
      if (this.scrollTop + this.windowHeight >= this.scrollHeight) {
        if (this.spinnerFlag == true) {
          return this.addList();
        } else if(this.limit<100){
          this.spinnerFlag = true;
        }
      }

      // console.log("watch");
    }
  },
  methods: {
    getPlaylist() {
      this.$http
        .get("top/playlist?limit=" + this.limit + "&order=new")
        .then(result => {
          if (result.status === 200) {
            // console.log(result);
            this.rePlaylist = result.body.playlists;
          } else {
            Toast("获取歌单失败");
          }
          this.spinnerFlag = false;
        })
        .catch(res => {
          Toast("获取歌单失败");
        });
    },
    handleScroll() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      this.windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      this.scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
    },
    addList() {
      var t;
      var _this = this;
      clearTimeout(t);
      t = setTimeout(function() {
        _this.limit = _this.limit + 12;
        if (_this.limit >= 100) {
          _this.limit = 100;
          window.removeEventListener("scroll", this.handleScroll);
        }
        _this.getPlaylist();
      }, 2000);
    }
  }
};

</script>

<style scoped>
.line-limit-length {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.listBox {
  height: 280px;
  width: 260px;
  display: inline-block;
  margin-left: 15px;
}
.listBox a img {
  height: 270px;
}
.thumbnail {
  margin-bottom: 0;
}
</style>
