<template>
  <div class="login-form" @keyup.enter="onLogin">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" name="" v-model="userModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" name="" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <button class="g-form-button" @click="onLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userModel: '',
      passwordModel: ''
    }
  },
  computed: {
    userErrors () {
      let errorText = ''
      let status = ''
      let _this = this

      if (!/^[a-zA-Z0-9_-]{4,16}$/g.test(this.userModel)) {
        errorText = '4~16数字、字母、下划线和减号组合'
        status = false
      } else {
        errorText = ''
        status = true
      }

      if (!this.userflag) {
        errorText = ''
        _this.userflag = true
      }

      return {
        errorText: errorText,
        status: status
      }
    },
    passwordErrors () {
      let errorText = ''
      let status = ''
      let _this = this

      if (!/^[a-zA-Z\d]{6,8}$/g.test(this.passwordModel)) {
        errorText = '6~8位数字字母组合'
        status = false
      } else {
        errorText = ''
        status = true
      }

      if (!this.passwordflag) {
        errorText = ''
        _this.passwordflag = true
      }

      return {
        errorText,
        status
      }
    }
  },
  methods: {
    onLogin () {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        alert('用户名或密码错误！')
      } else {
        this.$http.post('/api/login')
          .then((res) => {
            this.$emit('has-log', res.body)
          }, (err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
