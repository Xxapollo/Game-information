<template>
  <div class="selas-board">
    <div class="selas-board-intor">
      <h2>数据预测</h2>
      <p>统计预测是对事物的发展趋势和在未来时期的数量表现作出推测和估计的理论和技术。统计预测以自然现象和社会现象发展规律为依据，以充分的统计资料和最新信息为基础，以统计方法和数学方法为手段，配合适当的数学模型，通过推理和计算，找出该事物数量变化的规律性，对事物未来情况从数量上作出比较肯定的推断，即从该事物未来可能出现的多种数量表现中，指出在一定概率保证下的可能范围。统计预测作为一种预测技术被广泛应用于社会现象和自然现象的各个方面，在经济预测、社会预测、气象预测及科学技术预测各个领域中起着重要的作用。</p>
    </div>
    <div class="selas-board-form">
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          购买数量：
        </div>
        <div class="selas-board-line-right">
          <Vcounter :max="10" :min="1" @on-change="onParamChange('buyNum', $event)"></Vcounter>
        </div>
      </div>
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          产品类型：
        </div>
        <div class="selas-board-line-right">
          <Vchoose :selections="productTypes" @on-change="onParamChange('buyType', $event)"></Vchoose>
        </div>
      </div>
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          有效时间：
        </div>
        <div class="selas-board-line-right">
          <Vchoose :selections="validTime" @on-change="onParamChange('buyTime', $event)"></Vchoose>
        </div>
      </div>
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          总价：
        </div>
        <div class="selas-board-line-right">
          {{ amout }}元
        </div>
      </div>
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          &nbsp;
        </div>
        <div class="selas-board-line-right">
          <button class="button">立即购买</button>
        </div>
      </div>
    </div>
    <div class="selas-board-des">
      <h2>产品说明</h2>
      <p>统计预测是研究概率分布随机过程与时间序列的未来观测值或未来样本的观测值及其统计量的预测问题，详细来说，给出概率分布、随机过程与时间序列的样本的未来观测值及其统计量的预测，称为单样预测（One-Sample Prediction）。给出概率分布、随机过程、时间序列的未来样本的观测值及其统计量的预测，分两种情况：若未来样本只有一个，称为双样预测（Two-Sample Prediction）。因为这种预测的基础数据是过去样本；若未来样本有两个或两个以上，称为多样预测（MuIti-Sample Prediction）。双样预测与多样预测合在一起称为新样预测（New-Sample Prediction）。与之相应，单样预测亦称为样内预测（Within-Sample Prediction）。
        统计预测三要素：实际资料室预测的依据，经济理论是预测的基础，预测模型是预测的手段。</p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Vchoose from '../../components/choose'
import Vcounter from '../../components/counter'

export default {
  components: {
    Vchoose,
    Vcounter
  },
  data () {
    return {
      buyNum: 0,
      buyType: {},
      buyTime: {},
      amout: 0,
      productTypes: [{
        label: '入门版',
        value: 0
      },
      {
        label: '中级版',
        value: 1
      },
      {
        label: '高级版',
        value: 2
      }],
      validTime: [{
        label: '半年',
        value: 0
      },
      {
        label: '一年',
        value: 1
      },
      {
        label: '三年',
        value: 2
      }]
    }
  },
  methods: {
    onParamChange (attr, val) {
      this[attr] = val
      this.getPrice()
    },
    getPrice () {
      let buyVersionsArr = _.map(this.buyVersions, (item) => {
        return item.value
      })
      let reqParam = {
        buyNum: this.buyNum,
        buyType: this.buyType.value,
        buyTime: this.buyTime.value,
        buyVersions: buyVersionsArr.join(',')
      }
      this.$http.get('/api/getPrice', reqParam).then((res) => {
        this.amout = res.body.data.amout
      }, (err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.buyNum = 0
    this.buyType = this.productTypes[0]
    this.buyTime = this.validTime[0]
    this.getPrice()
  }
}
</script>

<style scoped>

</style>
