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
    <!--<el-button type="primary" style="margin-top: 14px;float: right" @click="dialogVisible = true">登录</el-button>-->
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
      defaultActive: '/',
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
          title: '普通画单',
          route: '/normalList'
        },
        {
          title: '作者画单',
          route: '/authorList'
        },
        {
          title: '首页推荐',
          route: 'paintClassify',
          children: [
            {
              title: '最新',
              route: '/lastedList'
            },
            {
              title: '最热',
              route: '/hottestList'
            },
            {
              title: '今日推荐Banner',
              route: '/todayList'
            },
            {
              title: '艺术先锋Banner',
              route: '/artList'
            }
          ]
        },
        {
          title: '大咖说',
          route: '/grandCafeList'
        },
        {
          title: '读精彩',
          route: '/readWonderList'
        },
        {
          title: '分类',
          route: 'classification',
          children: [
            {
              title: '艺术',
              route: '/artClassify'
            },
            {
              title: '心情',
              route: '/emotionClassify'
            },
            {
              title: '场景',
              route: '/sceneClassify'
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
  },
  created() {
    let path = document.location.hash
    if(path.indexOf('normalList') > -1){
      this.defaultActive = '/normalList'
    }
    if(path.indexOf('hottestList') > -1){
      this.defaultActive = '/hottestList'
    }
    if(path.indexOf('lastedList') > -1){
      this.defaultActive = '/lastedList'
    }
    if(path.indexOf('artList') > -1){
      this.defaultActive = '/artList'
    }
    if(path.indexOf('todayList') > -1){
      this.defaultActive = '/todayList'
    }
    if(path.indexOf('grandCafeList') > -1){
      this.defaultActive = '/grandCafeList'
    }
    if(path.indexOf('readWonderList') > -1){
      this.defaultActive = '/readWonderList'
    }
    if(path.indexOf('uploadExcel') > -1){
      this.defaultActive = '/uploadExcel'
    }
    if(path.indexOf('uploadImg') > -1){
      this.defaultActive = '/uploadImg'
    }
    if(path.indexOf('artClassify') > -1){
      this.defaultActive = '/artClassify'
    }
    if(path.indexOf('sceneClassify') > -1){
      this.defaultActive = '/sceneClassify'
    }
    if(path.indexOf('emotionClassify') > -1){
      this.defaultActive = '/emotionClassify'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
