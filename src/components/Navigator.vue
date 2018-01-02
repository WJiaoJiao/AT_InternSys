<template>
  <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" :router="true">
    <template v-for="menu in menus">
      <el-menu-item
      v-if="!menu.hasOwnProperty('children')"
      :index="menu.route"
      >{{menu.title}}</el-menu-item>
      <el-submenu v-else>
        <template slot="title">{{menu.title}}</template>
        <el-menu-item
        v-for="(subMenu,index) in menu.children"
        :key="index"
        :index="subMenu.route">{{subMenu.title}}</el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/uploadPainting',
      menus: [
        {
          title: '工作流',
          route: '',
          children: [
            {
              title: '上传画作',
              route: '/uploadPainting'
            },
            {
              title: '作者',
              route: '/author'
            },
            {
              title: '最新',
              route: '/lasted'
            }
          ]
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
