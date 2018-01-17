<template>
  <div id="app">
    <!-- 头部导航 -->
    <header>
      <app-nav></app-nav>
    </header>
    <main class="container">
      <div style="margin-top:20px"><app-breadcrumbs/></div>
      <transition name="el-fade-in-linear">
        <router-view/>
      </transition>
    </main>
    <div style="width: 100%;height: 20px"></div>
  </div>
</template>
<script>
  import Navigator from '@/components/Navigator.vue'
  import BreadCrumbs from '@/components/BreadCrumbs.vue'
  export default {
    name: 'app',
    components:{
      'app-breadcrumbs': BreadCrumbs,
      'app-nav': Navigator
    }
  }
</script>
<style lang="less">
</style>
