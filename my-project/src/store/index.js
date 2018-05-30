import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录状态为没登录
    logined: false,
    // 用户信息数据,目前只需要avatar和name,还是把username也加上吧
    LoginedUser: {
      username: ''
    }
  },
  getters: {
    getLogined (state) {
      return state.logined
    }
  },
  mutations: {
    // 登录
    LOGIN (state) {
      // 先让登录状态变为登录了
      state.logined = true
      // 然后去sessionStorage取用户数据
      let user = sessionStorage.getItem('username')
      // 再把用户数据发下去
      state.LoginedUser.username = user
    },
    // 登出
    LOGOUT (state) {
      // 这个同理
      state.logined = false
      state.LoginedUser.username = ''
    }
  },
  actions: {
    // 登录
    login (context) {
      context.commit('LOGIN')
    },
    // 退出
    logout (context) {
      context.commit('LOGOUT')
    }
  }
})
