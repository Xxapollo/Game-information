<template>
  <div class="selas-board">
    <div class="selas-board-intor">
      <h2>数据统计</h2>
      <p>统计数据是统计工作活动过程中所取得的反映国民经济和社会现象的数字资料以及与之相联系的其他资料的总称。
        统计数据作为统计工作日产品，从统计工作过程来看，统计数据质量是“符合标准”，要准确的反映客观现实。</p>
    </div>
    <div class="selas-board-form">
      <div class="selas-board-line">
        <div class="selas-board-line-left">
          购买数量：
        </div>
        <div class="selas-board-line-right">
          <Vcounter :max="30" :min="1" @on-change="onParamChange('buyNum', $event)"></Vcounter>
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
      <p>统计数据是表示某一地理区域自然经济要素特征、规模，结构、水平等指标的数据。是定性、定位和定量统计分析的基础数据。比如我们通常所说的统计年鉴。</p>
      <h3>统计数据分类</h3>
      <ul>
        <li>分区统计。即用图形的面积或同样图形的个数，代表所在区划单元内全部同类现象的总和；如2008美国社区调查一年数据样本文件总体</li>
        <li>分区统计。即用图形的面积或同样图形的个数，代表所在区划单元内全部同类现象的总和；如2008美国社区调查一年数据样本文件总体</li>
        <li>定位统计。以统计图表形式表示某一点上的特种现象和变化规律。</li>
      </ul>
      <h3>统计数据的类型</h3>
      <ul>
        <li>定类数据——表现为类别，但不区分顺序，是由定类尺度计量形成的。</li>
        <li>定序数据——表现为类别，但有顺序，是由定序尺度计量形成的。</li>
        <li>定距数据——表现为数值，可进行加、减运算，是由定距尺度计量形成的。</li>
        <li>定比数据——表现为数值，可进行加、减、乘、除运算，是由定比尺度计量形成的。</li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Vselection from '../../components/base/selection'
import Vcounter from '../../components/base/counter'
import Vchoose from '../../components/base/choose'

export default {
  components: {
    Vselection,
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
