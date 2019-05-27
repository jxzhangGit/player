<template>
  <div>
    <h3>排行榜</h3>
    <div class="row">
      <div class="col-sm-6 col-md-4" v-for="(item,index) in toplist" :key="item.id">
        <router-link :to="'/home/toplist/'+index">
          <div class="thumbnail">
            <img :src="item.coverImgUrl" :alt="item.name" class="toplistImg">
            <div class="caption">
              <h4>{{ item.name }}</h4>
              <p>{{ item.updateFrequency }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      toplist: []
    };
  },
  created() {
    this.getToplist();
    // this.getListDetail();
  },
  methods: {
    getToplist() {
      this.$http
        .get("toplist/detail")
        .then(result => {
          if (result.status === 200) {
            this.toplist = result.body.list;
            console.log(this.toplist);
          }
        })
        .catch(res => {
          Toast("获取排行榜失败");
        });
    }
    // getListDetail(index=1){
    //   this.$http.get("top/list?idx="+index).then(result=>{
    //     console.log(result);
    //   }).catch();
    // }
  }
};
</script>

<style scoped>
.toplistImg {
  width: 100%;
  height: 100%;
}
</style>
