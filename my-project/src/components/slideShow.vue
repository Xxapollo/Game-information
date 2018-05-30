<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="silde-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="silde-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prev)">&lt;</li>
      <li v-for="(item, index) in slides" :key="item.id" @click="goto(index)">
        <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(next)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  // 获取父组件传递的轮播数据和时间参数
  props: {
    slides: {
      type: Array
    },
    inv: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  computed: {
    // 上一页
    prev () {
      if (this.nowIndex === 0) return this.slides.length - 1
      else return this.nowIndex - 1
    },
    // 下一页
    next () {
      if (this.nowIndex === this.slides.length - 1) return 0
      else return this.nowIndex + 1
    }
  },
  methods: {
    // 轮播方法和过度效果
    goto (index) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
        this.$emit('onchange', index)
      }, 10)
    },
    // 启动定时器
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.next)
      }, this.inv)
    },
    // 清除定时器
    clearInv () {
      clearInterval(this.invId)
    }
  },
  // 挂载自动启动
  mounted () {
    this.runInv()
  }
}
</script>

<style scoped>
.silde-trans-enter-active {
  transition: all .6s;
}

.silde-trans-enter {
  transform: translateX(900px);
}

.silde-trans-old-leave-active {
  transition: all .6s;
  transform: translateX(-900px);
}

.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 450px;
  overflow: hidden;
}

.slide-img {
  width: 100%;
}

.slide-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  left: 0;
  text-align: left;
  padding-left: 15px;
}

.slide-pages {
  position: absolute;
  right: 15px;
  bottom: 0;
  height: 30px;
  display: flex;
  justify-content: space-around;
}

.slide-pages li {
  color: #fff;
  cursor: pointer;
  padding: 8px;
}

.slide-pages li:hover,.slide-pages li:hover a {
  color: #4fc08d;
}

.slide-pages li a {
  color: #fff;
}

.slide-pages li a.on {
  color: #4fc08d;
}

</style>
