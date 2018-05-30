import Vue from 'vue'
import Router from 'vue-router'
import indexPage from '../pages/indexPage'
import detailPage from '../pages/detail'
import dataStatisticsPage from '../pages/detail/dataStatistics'
import dataforecastPage from '../pages/detail/dataforecast'
import flowAnalysisPage from '../pages/detail/flowAnalysis'
import advertisingReleasePage from '../pages/detail/advertisingRelease'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: indexPage
    },
    {
      path: '/detail',
      component: detailPage,
      redirect: '/detail/dataStatistics',
      children: [
        {
          path: 'dataStatistics',
          component: dataStatisticsPage,
          name: 'dataStatisticsPage'
        },
        {
          path: 'dataforecast',
          component: dataforecastPage,
          name: 'dataforecastPage'
        },
        {
          path: 'flowAnalysis',
          component: flowAnalysisPage,
          name: 'flowAnalysisPage'
        },
        {
          path: 'advertisingRelease',
          component: advertisingReleasePage,
          name: 'advertisingReleasePage'
        }
      ]
    }
  ]
})
