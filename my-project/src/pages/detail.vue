<template>
  <div class="detail-wrap w">
    <div class="detail-left">
      <div class="product-board">
        <img :src="imgMap[$route.path]">
        <ul>
          <router-link v-for="item in products" :key="item.id" :to="{ path: item.path }" tag="li" active-class="active">
            {{ item.name }}
          </router-link>
        </ul>
      </div>
    </div>
    <div class="detail-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [{
        name: '数据统计',
        path: 'dataStatistics',
        active: false
      },
      {
        name: '数据预测',
        path: 'dataforecast',
        active: false
      },
      {
        name: '流量分析',
        path: 'flowAnalysis',
        active: false
      },
      {
        name: '广告发布',
        path: 'advertisingRelease',
        active: false
      }],
      imgMap: {
        '/detail/dataStatistics': require('../assets/images/0.png'),
        '/detail/dataforecast': require('../assets/images/1.png'),
        '/detail/flowAnalysis': require('../assets/images/2.png'),
        '/detail/advertisingRelease': require('../assets/images/3.png')
      }
    }
  }
}
</script>

<style>
.detail-left {
  float: left;
  width: 200px;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0 0 10px #ccc;
}

.detail-right {
  float: left;
  width: 980px;
  margin-left: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px #ccc;
}

.product-board {
  background: #fff;
  padding: 20px 0;
}

.product-board ul {
  margin-top: 20px;
}

.product-board li {
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
}

.product-board li.active,.product-board li:hover {
  background: #4fc08d;
  color: #fff;
}

.product-board li a {
  display: block;
}

.selas-board-form {
  padding: 30px 20px;
  font-size: 14px;

}

.selas-board-intor h2 {
  font-size: 20px;
  padding: 20px;
}

.selas-board-intor p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
}

.selas-board-line {
  margin: 10px;
}

.selas-board-line-left {
  display: inline-block;
  width: 100px;
}

.selas-board-line-right {
  display: inline-block;
  width: 75%;
}

.selas-board-line-right .button {
  width: 80px;
  height: 35px;
  color: #fff;
  background: #4fc08d;
  cursor: pointer;
}

.selas-board-des {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.selas-board-des p {
  line-height: 1.6;
}

.selas-board-des h2 {
  font-size: 20px;
  padding-bottom: 15px;
}

.selas-board-des h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}

.selas-board-des li {
  padding: 5px 0;
}

.selas-board-table {
  width: 100%;
  margin-top: 20px;
}

.selas-board-table th {
  background: #4fc08d;
  color: #fff;
}

.selas-board-table td {
  border: 1px solid #f0f2f5;
  padding: 15px;
}
</style>
