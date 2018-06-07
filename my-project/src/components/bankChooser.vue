<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in banks" :key="item.id" :title="item.label" :class="[item.name, {active: index === nowIndex}]" @click="chooseSelection(index)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowIndex: 0,
      banks: [{
        id: 201,
        label: '招商银行',
        name: 'zhaoshang'
      },
      {
        id: 301,
        label: '中国建设银行',
        name: 'jianshe'
      },
      {
        id: 401,
        label: '中国工商银行',
        name: 'gongshang'
      },
      {
        id: 501,
        label: '中信银行',
        name: 'zhongxin'
      },
      {
        id: 601,
        label: '交通银行',
        name: 'jiaotong'
      },
      {
        id: 701,
        label: '中国银行',
        name: 'zhongguo'
      },
      {
        id: 801,
        label: '浦发银行',
        name: 'pufa'
      },
      {
        id: 901,
        label: '中国邮政储蓄银行',
        name: 'youzheng'
      },
      {
        id: 1001,
        label: '中国民生银行',
        name: 'minsheng'
      },
      {
        id: 1101,
        label: '中国光大银行',
        name: 'guangda'
      },
      {
        id: 1201,
        label: '北京银行',
        name: 'beijing'
      },
      {
        id: 1301,
        label: '华夏银行',
        name: 'huaxia'
      }]
    }
  },
  methods: {
    // 选择银行
    chooseSelection (index) {
      this.nowIndex = index
      this.$emit('on-change', this.banks[index])
    }
  }
}
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}

.chooser-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.chooser-list li {
  width: 80px;
  height: 32px;
  margin: 5px;
  border: 1px solid #e3e3e3;
  cursor: pointer;
  background-image: url("../assets/banks.png");
  background-repeat: no-repeat;
}

.chooser-list li.active {
  border: 1px solid #4fc08d;
}

.zhaoshang {
  background-position: -320px 0;
}

.jianshe {
  background-position: -800px 0;
}

.gongshang {
  background-position: -478px 0;
}

.zhongxin {
  background-position: -240px 0;
}

.jiaotong {
  background-position: -720px 0;
}

.zhongguo {
  background-position: -400px 0;
}

.pufa {
  background-position: -80px 0;
}

.youzheng {
  background-position: 0 0;
}

.minsheng {
  background-position: -160px 0;
}

.guangda {
  background-position: -560px 0;
}

.beijing {
  background-position: -640px 0;
}

.huaxia {
  background-position: -880px 0;
}
</style>
