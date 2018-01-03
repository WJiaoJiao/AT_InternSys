<template>
  <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" :router="true">
    <template v-for="(menu,index) in menus">
      <el-menu-item
      v-if="!menu.hasOwnProperty('children')"
      :index="menu.route"
      >{{menu.title}}</el-menu-item>
        <el-submenu v-else :index="menu.route">
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
      defaultActive: '/uploadExcel',
      menus: [
        {
          title: '上传',
          route: 'upload',
          children: [
            {
              title: '上传Excel',
              route: '/uploadExcel'
            },
            {
              title: '上传图片',
              route: '/uploadImg'
            }
          ]
        },
        {
          title: '画作',
          route: 'painting',
          children: [
            {
              title: '画作列表',
              route: '/paintingList'
            }
          ]
        },
        {
          title: '作者',
          route: 'author',
          children: [
            {
              title: '上传作者',
              route: '/uploadAuthor'
            },
            {
              title: '作者列表',
              route: '/authorList'
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
