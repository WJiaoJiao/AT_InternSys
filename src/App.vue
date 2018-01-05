<template>
  <div id="app">
    <!-- 头部导航 -->
    <header>
      <app-nav></app-nav>
    </header>
    <main class="container">
      <transition name="el-fade-in-linear">
        <router-view/>
      </transition>
    </main>
    <div style="width: 100%;height: 20px"></div>
  </div>
</template>
<script>
  import Navigator from '@/components/Navigator.vue'
  export default {
    name: 'app',
    components:{
      'app-nav': Navigator
    }
  }
</script>
<style lang="less">
</style>
