<template>
  <el-menu :default-active="defaultActive"  mode="horizontal" :router="true" style="padding:0 1%">
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
    <el-button type="primary" style="margin-top: 14px;float: right" @click="dialogVisible = true">登录</el-button>
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/uploadExcel',
      dialogVisible: false,
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
              title: '作者列表',
              route: '/authorList'
            }
          ]
        },
        {
          title: '最新',
          route: 'lasted',
          children: [
            {
              title: '最新列表',
              route: '/lastedList'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
