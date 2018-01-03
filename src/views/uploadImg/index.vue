<template>
    <div class="content">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb">
        <el-breadcrumb-item>上传</el-breadcrumb-item>
        <el-breadcrumb-item>上传图片</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-upload class="upload-demo" drag action="/api/img/upload/capsule" multiple :on-success="uploadSuccess" :on-remove="removeAction" :before-upload="beforeAvatarUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-card>
    </div>
</template>

<script>
import {getTest} from '@/service/test.js'
export default {
  name: 'UploadExcel',
  data () {
    return {}
  },
  methods: {
    uploadSuccess: function (response, file, fileList) {
      console.log(response)
    },
    removeAction: function(){
    },
    beforeAvatarUpload: function(file){
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      console.log(file.type)
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!');
      }
      return isJPG;
    }
  },
  created(){
    getTest().then(function(resp){
      console.log(resp)
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
