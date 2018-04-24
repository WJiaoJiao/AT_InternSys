<template>
    <div class="content">
      <el-card>
        <el-upload class="upload-demo" drag action="/api/file/execl_upload" multiple :on-success="uploadSuccess" :on-remove="removeAction" :before-upload="beforeAvatarUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">{{$t('message.dragTheFileHere')}}，{{$t('message.or')}} <em>{{$t('message.clickUpload')}}</em></div>
            <div class="el-upload__tip" slot="tip">{{$t('message.onlyUpload')}} xlsx {{$t('message.file')}}</div>
        </el-upload>
        <!--<el-button type="primary" class="fr" style="margin-bottom: 20px">查询最新一次上传记录</el-button>-->
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
export default {
  name: 'UploadExcel',
  data () {
    return {
    
    }
  },
  methods: {
    uploadSuccess: function (response, file, fileList) {
    },
    removeAction: function(){
    },
    beforeAvatarUpload: function(file){
      const isXLSX = file.name.endsWith('xlsx') || file.name.endsWith('xls')
      if (!isXLSX) {
        this.$message.error(this.$t('message.uploadExcelInfo'));
      }
      return isXLSX;
    }
  },
  computed: {
    breadCrumbs : function(){
      return [
          {
              title: this.$t('message.menuUpload')
          },
          {
              title: this.$t('message.menuUploadExcel')
          }
      ]
    }
  },
  watch: {
    breadCrumbs: function (newValue, oldValue) {
      this.$store.commit(types.SET_BREADCRUMBS, newValue)
    }
  },
  created() {
     this.$store.commit(types.SET_BREADCRUMBS, this.breadCrumbs)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
