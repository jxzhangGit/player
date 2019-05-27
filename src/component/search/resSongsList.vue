<template>
  <div>
    <ul id="list" class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" v-for="item in Res" :key="item.id">
        <router-link :to="'/home/musinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" data-lazyload-id="0" :src="item.coverImgUrl">
          <div class="mui-media-body">
            <h4>{{ item.name }}</h4>
            <div class="songslist-info">
              <span class="mui-ellipsis" v-text="item.trackCount+'首'"></span>
              <span class="mui-ellipsis" v-text="'by '+item.creator.nickname"></span>
            </div>
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
      Res: null,
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
    // console.log(this.go);
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
          .get(
            "search?keywords=" +
              this.searchInfo +
              "&type=1000" +
              "&limit=" +
              this.limit
          )
          .then(result => {
            // console.log(result);
            if (this.countFlag) {
              this.count = result.body.result.playlistCount;
              this.countFlag = false;
            }
            if (
              result.status === 200 &&
              result.body.result.playlists != undefined
            ) {
              //
              this.Res = result.body.result.playlists;
              console.log(this.Res);
              this.show = true;
            } else {
              Toast('未找到和"' + this.searchInfo + '"相关的内容');
            }
            this.spinnerFlag = false;
          })
          .catch();
      } else {
        Toast("内容不能为空");
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

<style scoped>
.songslist-info {
  display: flex;
}
</style>
