import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import uploadPainting from '@/views/uploadPainting/index.vue'
import author from '@/views/author/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'uploadPainting',
      component: uploadPainting
    },
    {
      path: '/uploadPainting',
      name: 'uploadPainting',
      component: uploadPainting
    },
    {
      path: '/author',
      name: 'author',
      component: author
    }
  ]
})
