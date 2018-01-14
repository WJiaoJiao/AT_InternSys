<template>
    <div class="content">
      <el-card>
        <el-upload class="upload-demo" drag action="/api/file/execl_upload" multiple :on-success="uploadSuccess" :on-remove="removeAction" :before-upload="beforeAvatarUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
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
      console.log(response)
    },
    removeAction: function(){
      var tableData = this.tableData;
      tableData.shift()
    },
    beforeAvatarUpload: function(file){
      const isXLSX = file.name.endsWith('xlsx') || file.name.endsWith('xls')
      if (!isXLSX) {
        this.$message.error('上传文件只能是 xlsx 格式!');
      }
      return isXLSX;
    }
  },
  created() {
    this.$store.commit(types.SET_BREADCRUMBS, [
          {
              title: '上传'
          },
          {
              title: '上传Excel'
          }
      ]
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
