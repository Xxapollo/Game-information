<template>
  <div>
    <thisDialog :is-show="isShowCheckDialog" @on-close="checkStatus">
      请检查您的支付状态!
      <div class="button" @click="checkStatus">
        支付成功
      </div>
      <div class="button" @click="checkStatus">
        支付失败
      </div>
    </thisDialog>
    <thisDialog :is-show="isShowSuccessDialog" @on-close="hideResult">
      购买成功！
    </thisDialog>
    <thisDialog :is-show="isShowFailDialog" @on-close="hideResult">
      购买失败！
    </thisDialog>
  </div>
</template>

<script>
import thisDialog from './base/dialog'

export default {
  components: {
    thisDialog
  },
  props: {
    isShowCheckDialog: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      isShowSuccessDialog: false,
      isShowFailDialog: false
    }
  },
  methods: {
    // 判断支付状态
    checkStatus () {
      this.$http.post('/api/checkOrder', {
        orderId: this.orderId
      }).then((res) => {
        this.isShowSuccessDialog = true
        this.$emit('on-close-check-dialog')
      }, (err) => {
        this.isShowFailDialog = true
        this.$emit('on-close-check-dialog')
        console.log(err)
      })
    },
    // 隐藏结果弹窗
    hideResult () {
      this.isShowSuccessDialog = false
      this.isShowFailDialog = false
    }
  }
}
</script>

<style scoped>
.button {
  width: 80px;
  height: 35px;
  background: #4fc08d;
  color: #fff;
  line-height: 35px;
  text-align: center;
  display: inline-block;
  margin: 15px 5px;
  cursor: pointer;
}
</style>
