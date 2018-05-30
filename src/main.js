// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import '@/assets/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
import {Ch} from '@/assets/translate/Chinese.js'
import {En} from  '@/assets/translate/English.js'
import VueI18n from 'vue-i18n'

Vue.use(Element,{ size: 'small' })
Vue.config.productionTip = false
Vue.use(VueI18n)

var locale
if(localStorage.getItem('language')){
  locale = localStorage.getItem('language')
}else{
  locale = 'Chinese'
  localStorage.setItem('language','Chinese')
}

const i18n = new VueI18n({
  locale: locale, // 语言标识
  messages:{
    Chinese : Ch,
    English : En
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
