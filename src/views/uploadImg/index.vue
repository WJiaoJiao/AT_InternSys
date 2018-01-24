<template>
    <div class="content">
      <el-card>
        <el-upload class="upload-demo" drag action="/api/imgs/upload/common" multiple :on-success="uploadSuccess" :on-remove="removeAction" :before-upload="beforeAvatarUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
export default {
  name: 'UploadExcel',
  data () {
    return {}
  },
  methods: {
    uploadSuccess: function (response, file, fileList) {
    },
    removeAction: function(){
    },
    beforeAvatarUpload: function(file){
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!');
      }
      return isJPG;
    }
  },
  created(){
    this.$store.commit(types.SET_BREADCRUMBS, [
          {
              title: '上传'
          },
          {
              title: '上传图片'
          }
      ]
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
