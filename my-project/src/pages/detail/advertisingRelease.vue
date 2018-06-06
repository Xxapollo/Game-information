<template>
  <div class="selas-board">
    <div class="selas-board-intor">
      <h2>广告发布</h2>
      <p>指利用一定媒介或形式，发布各类广告，利用其他形式发布带有广告性质的信息的经营活动。</p>
    </div>
    <div class="selas-board-form">
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          购买数量：
        </div>
        <div class="selas-board-line-right">
          <Vcounter :max="66" :min="1" @on-change="onParamChange('buyNum', $event)"></Vcounter>
        </div>
      </div>
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          产品类型：
        </div>
        <div class="selas-board-line-right">
          <Vselection :selections="productTypes" @on-change="onParamChange('buyType', $event)"></Vselection>
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
          产品版本：
        </div>
        <div class="selas-board-line-right">
          <VmoreChoose :selections="versions" @on-change="onParamChange('buyVersions', $event)"></VmoreChoose>
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
      <p>广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。
        对于不同媒介，广告作品的发布形式是不同的，如印刷媒介则是制成有关印刷品，把广告作品刊登出来，电视和无线电广播则是以电波信号的形式播放。因此，不同的媒介要求有不同的作品，而广告机构的媒介部门的人员对不同媒介的广告监督也具有不同的内容。对印刷品，主要检查其印刷质量，图文是否清晰、整洁；而对电波媒介，则监督其播放质量，图象是否清晰，声音是否清新悦耳等。总之，广告的发布是广告活动的扫尾工序，余下的只有广告效果测试。因此，应对发布质量严格把关，力求使好的广告作品能有好的宣传效果。</p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Vselection from '../../components/selection'
import Vcounter from '../../components/counter'
import Vchoose from '../../components/choose'
import VmoreChoose from '../../components/moreChoose'

export default {
  components: {
    Vselection,
    Vcounter,
    Vchoose,
    VmoreChoose
  },
  data () {
    return {
      buyNum: 0,
      buyType: {},
      buyTime: {},
      buyVersions: [],
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
      }],
      versions: [{
        label: '开发版',
        value: 0
      },
      {
        label: '测试版',
        value: 1
      },
      {
        label: '生产版',
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
    this.buyVersions = [this.versions[0]]
    this.getPrice()
  }
}
</script>

<style scoped>

</style>
