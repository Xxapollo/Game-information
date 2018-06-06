<template>
  <div class="selas-board">
    <div class="selas-board-intor">
      <h2>流量分析</h2>
      <p>流量分析是“存量分析”的对称。对一定时期内经济体系中各种经济总量的变动及其相互影响进行的分析。流量是经济变量在一定时期中变动的数量，它必须按同一时期进行测算。在宏观经济体系中，总收入、总投资、总消费、总储蓄等都是流量。这些流量的变动直接制约着国民收入水平和社会就业水平，直接影响着社会经济的波动和增长，因此流量分析在经济分析中占有重要的地位。</p>
    </div>
    <div class="selas-board-form">
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          购买数量：
        </div>
        <div class="selas-board-line-right">
          <Vcounter :max="20" :min="1" @on-change="onParamChange('buyNum', $event)"></Vcounter>
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
      <p>但是流量分析离不开存量分析，这是因为： (1) 流量来源于存量，流量要受存量变动的影响。(2) 社会的经济周期、经济增长、社会经济的发展程度和人民实际生活的水平，不仅要受流量的制约，而且要受存量的影响。</p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Vcounter from '../../components/base/counter'
import Vchoose from '../../components/base/choose'

export default {
  components: {
    Vcounter,
    Vchoose
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
