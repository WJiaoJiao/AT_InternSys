import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import uploadExcel from '@/views/uploadExcel/index.vue'
import uploadImg from '@/views/uploadImg/index.vue'
import paintingList from '@/views/painting/paintingList.vue'
import lastedList from '@/views/lastedList/index.vue'
import paintDetail from '@/views/paintDetail/index.vue'
import hottestList from '@/views/hottestList/index.vue'
import todayList from '@/views/todayList/index.vue'
import artList from '@/views/artList/index.vue'
import normalList from '@/views/normalList/index.vue'
import grandCafeList from '@/views/grandCafeList/index.vue'
import readWonderList from '@/views/readWonderList/index.vue'
import authorList from '@/views/authorList/index.vue'
import artClassify from '@/views/artClassify/index.vue'
import sceneClassify from '@/views/sceneClassify/index.vue'
import emotionClassify from '@/views/emotionClassify/index.vue'

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
    },
    {
      path: '/artList',
      name: 'artList',
      component: artList
    },
    {
      path: '/normalList',
      name: 'normalList',
      component: normalList
    },
    {
      path: '/grandCafeList',
      name: 'grandCafeList',
      component: grandCafeList
    },
    {
      path: '/readWonderList',
      name: 'readWonderList',
      component: readWonderList
    },
    {
      path: '/authorList',
      name: 'authorList',
      component: authorList
    },
    {
      path: '/artClassify',
      name: 'artClassify',
      component: artClassify
    },
    {
      path: '/sceneClassify',
      name: 'sceneClassify',
      component: sceneClassify
    },
    {
      path: '/emotionClassify',
      name: 'emotionClassify',
      component: emotionClassify
    }
  ]
})
