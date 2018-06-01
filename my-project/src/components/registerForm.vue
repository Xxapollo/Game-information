<template>
  <div class="login-form" @keyup.enter="onRegister">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" name="" v-model="userModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">手机号：</span>
        <div class="g-form-input">
          <input type="text" name="" v-model="phoneModel" placeholder="请输入手机号" :maxlength="11">
        </div>
        <span class="g-form-error">{{ phoneErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">邮箱：</span>
        <div class="g-form-input">
          <input type="email" name="" v-model="emailModel" placeholder="请输入邮箱">
        </div>
        <span class="g-form-error">{{ emailErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">验证码：</span>
        <div class="g-form-input">
          <input type="text" name="" v-model="verificationModel" placeholder="请输入验证码" :maxlength="6">
        </div>
        <button class="send-code" @click="sndCode" :disabled="disabled"> {{ btnText }} </button>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" name="" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <button class="g-form-button" @click="onRegister">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userModel: '',
      phoneModel: '',
      emailModel: '',
      verificationModel: '',
      passwordModel: '',
      btnText: '发送验证码',
      sendTime: 60,
      disabled: false
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
    phoneErrors () {
      let errorText = ''
      let status = ''
      let _this = this

      if (!/^1[3|4|5|7|8][0-9]{9}$/g.test(this.phoneModel)) {
        errorText = '手机号码格式不正确'
        status = false
      } else {
        errorText = ''
        status = true
      }

      if (!this.phoneflag) {
        errorText = ''
        _this.phoneflag = true
      }

      return {
        errorText: errorText,
        status: status
      }
    },
    emailErrors () {
      let errorText = ''
      let status = ''
      let _this = this

      if (!/^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/g.test(this.emailModel)) {
        errorText = '邮箱格式不正确'
        status = false
      } else {
        errorText = ''
        status = true
      }

      if (!this.emailflag) {
        errorText = ''
        _this.emailflag = true
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
    sndCode () {
      if (this.phoneModel !== '' && this.phoneErrors.status) {
        this.disabled = true
        this.timeInv()
      }
    },
    timeInv () {
      this.ivId = setInterval(() => {
        this.btnText = `${this.sendTime}秒后重新发送`
        if (this.sendTime === 0) {
          this.btnText = '发送验证码'
          this.sendTime = 60
          this.disabled = false
          clearInterval(this.ivId)
        }
        this.sendTime--
      }, 1000)
    },
    onRegister () {
      if (!this.userErrors.status || !this.passwordErrors.status || !this.phoneErrors.status || !this.emailErrors.status) {
        alert('填写信息有误!')
      } else {
        console.log(`${this.userModel},${this.passwordModel},${this.phoneModel},${this.emailModel}`)
        alert('注册成功!')
        this.$emit('on-close')
      }
    }
  }
}
</script>

<style scoped>

</style>
