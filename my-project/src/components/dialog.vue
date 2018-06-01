<template>
  <div>
    <div class="dialog-cover" v-if="isShow" @click="closemyself"></div>
    <transition name="drop">
      <div class="dialog-wrap" v-if="isShow">
          <div class="dialog-content">
            <p class="dialog-close" @click="closemyself">X</p>
            <slot>empty</slot>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    closemyself () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}

.drop-leave-active {
  transition: all .3s ease;
}

.drop-enter {
  transform: translateY(-500px);
}

.drop-leave-active {
  transform: translateY(-500px);
}

.dialog-cover {
  background: #000;
  opacity: .4;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dialog-wrap {
  position: fixed;
  width: 40%;
  max-height: 52%;
  top: 20%;
  left: 50%;
  margin-left: -20%;
  z-index: 2;
  overflow: hidden;
  border: 1px solid #ccc;
  padding: 1%;
  background: #fff;
  box-shadow: 0 0 10px #464068;
}

.dialog-content {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  padding: 0 10px;
  box-sizing: border-box;
}

.dialog-close {
  position: absolute;
  top: 22px;
  right: 25px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
</style>
