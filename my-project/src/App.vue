<template>
  <div id="app">
    <div :class="['app-header', searchBarFixed == true ? 'isFixed' :'']">
      <div class="app-header-inner">
        <div class="header-logo">
          <router-link :to="{ path: '/' }">
            <img src="./assets/logo.png" alt="Logo" class="pointer">
          </router-link>
          <p>{{ title }}</p>
        </div>
        <div class="header-nav">
          <ul class="nav-list">
            <li class="pointer user-name" @mouseover="userShow" @mouseout="userHide">
              {{ username }}
              <ol v-if="usershow">
                <li>个人中心</li>
                <li @click="quit">退出</li>
              </ol>
            </li>
            <li class="pointer" v-if="username === ''" @click="login">登录</li>
            <li class="nav-pile">|</li>
            <li class="pointer" @click="register">注册</li>
            <li class="nav-pile">|</li>
            <li class="pointer" @click="about">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-footer ac">
      <p> © 2018 China King </p>
    </div>
    <my-dialog :is-show="isShowLogin" @on-close="closeDialog('isShowLogin')">
      <log-form @has-log="onSuccessLog"></log-form>
    </my-dialog>
    <my-dialog :is-show="isShowRegister" @on-close="closeDialog('isShowRegister')">
      <reg-form @on-close="closeDialog('isShowRegister')"></reg-form>
    </my-dialog>
    <my-dialog :is-show="isShowAbout" @on-close="closeDialog('isShowAbout')">
      <p class="about-content">为游戏玩家提供导购、资讯、攻略、论坛等全游戏生命周期内的一站式服务，为游戏发行商提供综合营销解决方案，是面向游戏玩家、运营商、发行商的矩阵化、多平台、综合性游戏媒体群。</p>
    </my-dialog>
  </div>
</template>

<script>
import Dialog from './components/dialog'
import logForm from './components/loginForm'
import regForm from './components/registerForm'

export default {
  data () {
    return {
      title: '产品数据+',
      searchBarFixed: false,
      isShowLogin: null,
      isShowRegister: null,
      isShowAbout: null,
      username: '',
      usershow: false
    }
  },
  components: {
    MyDialog: Dialog,
    logForm,
    regForm
  },
  methods: {
    // 监听滚动改变头部
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('.app-header').offsetTop

      if (scrollTop > offsetTop) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
    },
    // 登录弹窗
    login () {
      this.isShowLogin = true
    },
    // 注册弹窗
    register () {
      this.isShowRegister = true
    },
    // 关于弹窗
    about () {
      this.isShowAbout = true
    },
    // 关闭弹窗
    closeDialog (attr) {
      this[attr] = false
    },
    // 登录成功
    onSuccessLog (res) {
      this.username = res.data.username
      sessionStorage.setItem('username', this.username)
      this.closeDialog('isShowLogin')
      return this.$store.dispatch('login')
    },
    // 悬停显示个人菜单
    userShow () {
      this.usershow = true
    },
    // 悬停隐藏个人菜单
    userHide () {
      this.usershow = false
    },
    // 退出登录
    quit () {
      this.$http.get('/api/quit')
        .then((res) => {
          if (res.body.data.status === 200) {
            this.username = ''
            this.usershow = false
            return this.$store.dispatch('logout')
          }
        }, (err) => {
          console.log(err)
        })
    }
  },
  // 监听滚动
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  // 卸载滚动
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img {
  margin: 0;
  padding: 0;
}

fieldset, img, input, button,textarea {
  /*fieldset组合表单中的相关元素*/
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
}

ul, ol {
  list-style: none; /*清除列表风格*/
}

input {
  padding-top: 0;
  padding-bottom: 0;
  font-family: "SimSun", "宋体";
}

select, input {
  vertical-align: middle;
}

select, input, textarea {
  font-size: 12px;
  margin: 0;
}

textarea {
  resize: none;
}

/*防止多行文本框拖动*/
img {
  border: 0;
  vertical-align: middle;
}

/*  去掉图片低测默认的3像素空白缝隙*/
table {
  border-collapse: collapse; /*合并外边线*/
}

a {
  color: #666;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  text-decoration: none;
  font-weight: normal;
  font-size: 100%;
}

s, i, em {
  font-style: normal;
  text-decoration: none;
}

/*公共类*/
.w {
  /*版心 提取 */
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.fl {
  float: left
}

.fr {
  float: right
}

.al {
  text-align: left
}

.ac {
  text-align: center
}

.ar {
  text-align: right
}

.hide {
  display: none;
}

.pointer{
  cursor:pointer;
}

/***********/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
}

/* header */
.app-header {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 0 10px #666;
  color: #000;
  transition: all .3s;
}

.app-header.isFixed {
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: #363636;
  color: #b2b2b2;
}

.app-header-inner {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  display: flex;
  align-items: center;
}

.header-logo img {
  width: 40px;
  height: 40px;
}

.header-logo > p {
  margin: 0 10px;
  font-size: 18px;
}

.header-nav {
  height: 100%;
}

.nav-list {
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.nav-list > li {
  height: 100%;
  margin: 0 5px;
  line-height: 60px;
}

.nav-list li.pointer:hover {
  color: #666;
}

.user-name {
  position: relative;
}

.user-name ol {
  position: absolute;
  top: 45px;
  left: 0;
  width: 80px;
  padding: 5px;
  box-shadow: 0 0 10px #666;
  background: #fff;
  z-index: 1;
}

.user-name ol li {
  padding: 10px 0;
  text-align: center;
  line-height: normal;
}

  /* footer */
.app-footer {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #eeeeee;
  color: #666;
}

/* form */
.g-form-line {
  padding: 15px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.g-form-label {
  width: 15%;
  font-size: 16px;
  color: #666;
}

.g-form-input {
  width: 30%;
  height: 35px;
}

.g-form-input input {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.send-code {
  display: inline-block;
  width: 17%;
  height: 32px;
  background: #4fc08d;
  color: #fff;
  margin-left: 20px;
  cursor: pointer;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
}

.g-form-button {
  width: 15%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #4fc08d;
  color: #fff;
  font-weight: bold;
  margin: 0 auto;
  cursor: pointer;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
}

.g-form-button:hover {
  background: #4fc066;
}

.g-form-error {
  color: red;
  padding-left: 15px;
  line-height: 30px;
}

.about-content {
  margin: 10px;
}
</style>
