import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 首先声明一个状态 state
const state = {   // 要设置的全局访问的state对象
   count: 1
}
// 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理,可以包含异步操作
const actions = {
   saveName({commit}, msg) {
       commit('saveMsg', msg)    // 提交到mutations中处理    
   }
}
// 更新状态
const mutations = {
   addCount(state) {
      state.count++;
      console.log(state.count)
   }
}
// 获取状态信息
const getters = {  // 实时监听state值的变化
   getCount: state => {
      return state.count;
   },
}


export default new Vuex.Store({
   state,
   getters,
   mutations,
   actions
})