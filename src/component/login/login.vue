<template>
  <div>
    <p>未登录，请先登录网易云音乐账号</p>
    <div class="input-group input-group-lg">
      <span class="input-group-addon" id="basic-addon1">账号</span>
      <input
        type="text"
        class="form-control"
        placeholder="Username"
        aria-describedby="basic-addon1"
        v-model="phone"
      >
    </div>
    <div class="input-group input-group-lg">
      <span class="input-group-addon" id="basic-addon1">密码</span>
      <input
        :type="inputType"
        class="form-control"
        placeholder="Password"
        aria-describedby="basic-addon1"
        v-model="password"
      >
      <span class="input-group-addon mui-icon mui-icon-eye" id="basic-addon1" @click="changeInpType"></span>
    </div>

    <div class="mui-button-row">
      <button type="button" class="mui-btn mui-btn-primary" @click="submit">确认</button>&nbsp;&nbsp;
      <button type="button" class="mui-btn mui-btn-danger" @click="reset">重设</button>
    </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  data(){
    return {
      phone:"",
      password:"",
      inputType:"password",
    }
  },
  methods: {
    changeInpType(){
      if(this.inputType=="password"){
        this.inputType = "text";
      }else if(this.inputType=="text"){
        this.inputType = "password";
      }
    },
    submit(){
      if(this.phone==""){
        Toast("账号不能为空");
      }else if(this.password==""){
        Toast("密码不能为空");
      }else
      // console.log(this.phone+"===="+this.password);
      this.$http.get("login/cellphone?phone="+this.phone+"&password="+this.password).then(result=>{
        console.log(result);
        if(result.status==200){
          Toast("登录成功");
          this.$router.push({path:"/user"})
        }
      }).catch(res=>{
        console.log(res);
        switch (res.status) {
          case 400: Toast("请输入手机号码"); break;
          case 501: Toast("账号不存在"); break;
          case 502: Toast("密码不正确"); break;
          default:
            break;
        }
      })
    },
    reset(){
      this.phone = "";
      this.password = "";
    }
  }
};
</script>

<style>
</style>
