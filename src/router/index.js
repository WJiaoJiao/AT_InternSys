import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import uploadExcel from '@/views/uploadExcel/index.vue'
import uploadImg from '@/views/uploadImg/index.vue'
import paintingList from '@/views/painting/paintingList.vue'
import author from '@/views/author/index.vue'
import lastedList from '@/views/lastedList/index.vue'
import paintDetail from '@/views/paintDetail/index.vue'
import hottestList from '@/views/hottestList/index.vue'
import todayList from '@/views/todayList/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'uploadExcel',
        component: uploadExcel
      }
    },
    {
      path: '/uploadExcel',
      name: 'uploadExcel',
      component: uploadExcel
    },
    {
      path: '/uploadImg',
      name: 'uploadImg',
      component: uploadImg
    },
    {
      path: '/paintingList',
      name: 'paintingList',
      component: paintingList
    },
    {
      path: '/lastedList',
      name: 'lastedList',
      component: lastedList
    },
    {
      path: '/paintDetail/:type/:paintId',
      name: 'paintDetail',
      component: paintDetail
    },
    {
      path: '/hottestList',
      name: 'hottestList',
      component: hottestList
    },
    {
      path: '/todayList',
      name: 'todayList',
      component: todayList
    }
  ]
})
