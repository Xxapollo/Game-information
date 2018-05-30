<template>
  <div class="index-wrap w">
    <div class="index-left fl al">
      <div class="index-left-block">
        <h2>全部产品</h2>
        <template>
          <div v-for="product in productList" :key="product.id">
            <h3>{{ product.title }}</h3>
            <ul>
              <li v-for="item in product.list" :key="item.id">
                <a :href="item.url">{{ item.title }}</a>
                <p v-if="item.hot" class="hot">HOT</p>
              </li>
            </ul>
            <div v-if="!product.last" class="hr"></div>
          </div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>{{ newsList.title }}</h2>
        <ul>
          <li v-for="item in newsList.list" :key="item.id">
            <a :href="item.url">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right fr">
      <slide-show :slides="slides" :inv="invTime" @onchange="doSomeThing"></slide-show>
      <div class="index-board-list">
        <div class="index-board-item fl" v-for="(item,index) in boardList" :key="item.id" :class="['index-board-' + index, {'line-last': (index + 1) % 2 === 0}]">
          <div class="index-board-item-inner">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="index-board-button">
              <router-link class="button" :to="{path: `detail/${item.path}`}">立即购买</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入轮播组件
import slideShow from '../components/slideShow'

export default {
  data () {
    return {
      productList: {
        game: {
          title: 'PC产品',
          list: [
            {
              title: '数据统计',
              url: 'www.baidu.com',
              hot: true
            },
            {
              title: '数据预测',
              url: 'www.baidu.com'
            },
            {
              title: '流量分析',
              url: 'www.baidu.com'
            },
            {
              title: '广告发布',
              url: 'www.baidu.com'
            }
          ]
        },
        app: {
          title: 'mobile应用类',
          last: true,
          list: [
            {
              title: '91助手',
              url: 'www.baidu.com'
            },
            {
              title: '产品助手',
              url: 'www.baidu.com',
              hot: true
            },
            {
              title: '智能地图',
              url: 'www.baidu.com'
            },
            {
              title: '团队语音',
              url: 'www.baidu.com'
            }
          ]
        }
      },
      newsList: {
        title: '最新资讯',
        list: [
          {
            title: '某主播被实锤开挂',
            url: 'www.baidu.com'
          },
          {
            title: '五五开生前也是个体面人',
            url: 'www.baidu.com'
          },
          {
            title: '卢姥爷和UU婊分手',
            url: 'www.baidu.com'
          },
          {
            title: '灭霸外挂一键灭队吃鸡',
            url: 'www.baidu.com'
          },
          {
            title: '呆妹老女人没有胸',
            url: 'www.baidu.com'
          },
          {
            title: '恭喜RNG获得MSI世界总冠军',
            url: 'www.baidu.com'
          },
          {
            title: '小狗UZI被评为世界第一AD',
            url: 'www.baidu.com'
          },
          {
            title: '拳头老总推特发布某高校男生宿舍夺冠狂欢',
            url: 'www.baidu.com'
          }
        ]
      },
      boardList: [],
      invTime: 3000,
      slides: [
        {
          src: require('../assets/images/0.jpg'),
          title: '我等的人还在遥远的未来',
          href: 'detail/dataStatistics'
        },
        {
          src: require('../assets/images/1.jpg'),
          title: '凌晨四点的洛杉矶',
          href: 'detail/dataforecast'
        },
        {
          src: require('../assets/images/2.jpg'),
          title: '所谓伊人，在水一方',
          href: 'detail/flowAnalysis'
        },
        {
          src: require('../assets/images/3.jpg'),
          title: '以一敌三，谁胜谁负',
          href: 'detail/advertisingRelease'
        }
      ]
    }
  },
  components: {
    slideShow
  },
  methods: {
    // 每一次轮播切换事件
    doSomeThing () {
      // console.log('do some thing run!')
    }
  },
  watch: {
    // 监听路由 跳转滚动条回到顶部
    '$route': (to, from) => {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  created () {
    // 模拟请求接口数据
    this.$http.get('api/board')
      .then((res) => {
        this.boardList = res.body.data
      }, (err) => {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-left {
  width: 300px;
}

.index-right {
  width: 900px;
}

.index-left-block {
  margin: 15px;
  background-color: #fff;
  box-shadow: 0 0 1px #ddd;
}

.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}

.index-left-block .hr {
  height: 1px;
  border-bottom: 1px dotted #ccc;
  margin-bottom: 20px;
}

.index-left-block.lastest-news {
  min-height: 512px;
}

.index-left-block.lastest-news h2 {
  margin-bottom: 0;
}

.index-left-block.lastest-news li a {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.index-left-block.lastest-news li > a:hover {
  color: dodgerblue;
}

.index-left-block h3 {
  color: #222;
  font-weight: bold;
  padding: 0 15px 5px 15px;
}

.index-left-block ul {
  padding: 10px 15px;
}

.index-left-block li {
  padding: 5px;
  display: flex;
  align-items: center;
}

.index-left-block li .hot {
  color: #fff;
  background-color: #e4393c;
  padding: 3px;
  font-size: 12px;
  height: 6px;
  line-height: 6px;
  margin-left: 10px;
}

.index-board-list {
  overflow: hidden;
  padding: 1px;
}

.index-board-item {
  width: 400px;
  background-color: #fff;
  box-shadow: 0 0 1px #ccc;
  padding: 19px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}

.index-board-0 .index-board-item-inner {
  background: url(../assets/images/0.png) no-repeat;
  background-size: 100px 100px;
}

.index-board-1 .index-board-item-inner {
  background: url(../assets/images/1.png) no-repeat;
  background-size: 100px 100px;
}

.index-board-2 .index-board-item-inner {
  background: url(../assets/images/2.png) no-repeat;
  background-size: 100px 100px;
}

.index-board-3 .index-board-item-inner {
  background: url(../assets/images/3.png) no-repeat;
  background-size: 100px 100px;
}

.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}

.line-last {
  margin-right: 0;
}

.index-board-button {
  margin-top: 20px;
}

.index-board-button .button {
  background-color: #4fc08d;
  color: #fff;
  padding: 6px 10px;
  font-size: 13px;
}
</style>
