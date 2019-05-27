<template>
  <div>
    <ul id="list" class="mui-table-view mui-table-view-chevron" v-if="show">
      <li class="mui-table-view-cell mui-media" v-for="(item,index) in SongsRes" :key="item.id">
        <router-link :to="'/home/musinfo/'+item.id">
          <div class="mui-media-object mui-pull-left">
            <p>{{ index+1 }}</p>
            <span class="glyphicon glyphicon-music" aria-hidden="true"></span>
          </div>
          <div class="mui-media-body">
            <h3>{{ item.name }}</h3>
            <p class="mui-ellipsis">{{ item.artists[0].name }}</p>
          </div>
        </router-link>
      </li>
    </ul>
    <mt-spinner type="fading-circle" color="blue" :size="60" v-if="spinnerFlag"></mt-spinner>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { clearTimeout, setTimeout } from "timers";
export default {
  data() {
    return {
      SongsRes: "",
      show: false,
      spinnerFlag: false,
      count: null,
      countFlag: true,
      limit: 10,
      scrollTop: 0,
      windowHeight: 0,
      scrollHeight: 0
    };
  },
  props: ["searchInfo", "go"],
  watch: {
    go: "getRes",
    scrollTop: function() {
      // console.log("======");
      if (this.scrollTop + this.windowHeight >= this.scrollHeight) {
        if (this.spinnerFlag == true) {
          this.addList();
        } else if (this.limit < this.count) {
          this.spinnerFlag = true;
        }
      }

      // console.log("watch");
    }
  },
  created() {
    this.getRes();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getRes() {
      if (this.searchInfo != "") {
        this.$http
          .get("search?keywords=" + this.searchInfo + "&limit=" + this.limit)
          .then(result => {
            console.log(result);
            if (this.countFlag) {
              this.count = result.body.result.songCount;
              this.countFlag = false;
            }
            if (
              result.status === 200 &&
              result.body.result.songs != undefined
            ) {
              this.SongsRes = result.body.result.songs;
              console.log(this.SongsRes);
              this.show = true;
            } else {
              Toast('未找到和"' + this.searchInfo + '"相关的内容');
            }
            this.spinnerFlag = false;
          })
          .catch();
      } else {
        Toast("请输入搜索内容");
      }
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
        _this.limit = _this.limit + 10;
        if (_this.limit >= _this.count) {
          // console.log(_this.count);
          _this.limit = _this.count;
          window.removeEventListener("scroll", this.handleScroll);
        }
        _this.getRes();
      }, 2000);
    }
  }
};
</script>

<style>
</style>
