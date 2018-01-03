<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
      <app-nav/>
    </header>
    <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>

    <main>
      <!-- 主内容区 -->
      <div  class="main-content" >
        <transition name="el-fade-in-linear">
          <router-view class="view"/>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Element from 'element-ui'
  import Navigator from '@/components/Navigator.vue'
  import 'element-ui/lib/theme-chalk/index.css'
  Vue.use(Element)
  export default {
    name: 'app',
    components:{
      'app-nav': Navigator
    },
    data: function (){
      return {
        headerFixed : true
      }
    }
  }
</script>

<style lang="less">
  body{margin: 0;}
  #app {
    min-width: 1200px;
    margin: 0 auto;
    font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
  }
  /* 头部导航 */
  header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
  header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
  header .el-menu-demo{padding-left: 40px!important;}
  /* 主内容区 */
  main{display: flex;  min-height: 1000px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
  main .main-content{flex:1; background-color: #fff; padding: 20px 70px 50px 70px; }
  main .el-menu{background-color: transparent!important;}
</style>
