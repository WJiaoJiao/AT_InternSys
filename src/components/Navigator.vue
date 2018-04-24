<template>
  <el-menu :default-active="defaultActive"  mode="horizontal" :router="true" style="padding:0 1%">
    <template v-for="(menu,index) in menus">
      <el-menu-item
      v-if="!menu.hasOwnProperty('children')"
      :index="menu.route"
      >{{menu.title}}</el-menu-item>
        <el-submenu v-else :index="menu.route">
          <!--{{menu.title}}-->
          <template slot="title">{{menu.title}}</template>
          <!--{{subMenu.title}}-->
          <el-menu-item
          v-for="(subMenu,index) in menu.children"
          :key="index"
          :index="subMenu.route">{{subMenu.title}}</el-menu-item>
        </el-submenu>
    </template>
    <el-dropdown style="line-height: 60px" @command="handleCommand">
      <span class="el-dropdown-link">
        {{$t('message.language')}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="Chinese">{{$t('message.chinese')}}</el-dropdown-item>
        <el-dropdown-item command="English">{{$t('message.english')}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <img src="static/logo.png" style="margin-top: 7px;float: right"/>
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
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCommand(command) {
      this.$i18n.locale = command;
      location.reload();      
      localStorage.setItem('language', command);
    }
  },
  computed: {
    menus: function(){
      return [
        {
          title: this.$t('message.menuUpload'),
          route: 'upload',
          children: [
            {
              title: this.$t('message.menuUploadExcel'),
              route: '/uploadExcel'
            },
            {
              title: this.$t('message.menuUploadImage'),
              route: '/uploadImg'
            }
          ]
        },
        {
          title: this.$t('message.menuOrdinaryPainting'),
          route: '/normalList'
        },
        {
          title: this.$t('message.menuAuthorPainting'),
          route: '/authorList'
        },
        {
          title: this.$t('message.menuLastestNews'),
          route: '/latestNews'
        },
        {
          title: this.$t('message.menuRecommend'),
          route: 'paintClassify',
          children: [
            {
              title: this.$t('message.menuLasted'),
              route: '/lastedList'
            },
            {
              title: this.$t('message.menuHottest'),
              route: '/hottestList'
            },
            {
              title: this.$t('message.menuTodayRecommendsBanner'),
              route: '/todayList'
            },
            {
              title: this.$t('message.menuArtVanBanner'),
              route: '/artList'
            }
          ]
        },
        {
          title: this.$t('message.menuArtistsWords'),
          route: '/artistsWordsList'
        },
        {
          title: this.$t('message.menuReadWonder'),
          route: '/readWonderList'
        },
        {
          title: this.$t('message.menuClassification'),
          route: 'classification',
          children: [
            {
              title: this.$t('message.menuArt'),
              route: '/artClassify'
            },
            {
              title: this.$t('message.menuEmotion'),
              route: '/emotionClassify'
            },
            {
              title: this.$t('message.menuScene'),
              route: '/sceneClassify'
            }
          ]
        }
      ]
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
    if(path.indexOf('artistsWordsList') > -1){
      this.defaultActive = '/artistsWordsList'
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
    if(path.indexOf('latestNews') > -1){
      this.defaultActive = '/latestNews'
    }
    if(path.indexOf('authorList') > -1){
      this.defaultActive = '/authorList'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
