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
          <Vcounter :max="20" :min="1" @on-change="showCou"></Vcounter>
        </div>
      </div>
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          产品类型：
        </div>
        <div class="selas-board-line-right">
          <VmoreChoose :selections="productTypes" @on-change="showIndex"></VmoreChoose>
        </div>
      </div>
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          有效时间：
        </div>
        <div class="selas-board-line-right">
          半年
        </div>
      </div>
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          总价：
        </div>
        <div class="selas-board-line-right">
          500元
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
import VmoreChoose from '../../components/moreChoose'
import Vcounter from '../../components/counter'

export default {
  components: {
    VmoreChoose,
    Vcounter
  },
  data () {
    return {
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
      }]
    }
  },
  methods: {
    showIndex (index) {
      console.log(index)
    },
    showCou (num) {
      console.log(num)
    }
  }
}
</script>

<style scoped>

</style>
