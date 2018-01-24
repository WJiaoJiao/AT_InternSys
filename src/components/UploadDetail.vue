<template>
    <el-upload
        class="upload-demo"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        action="/api/imgs/upload/common"
        :show-file-list="false"
        style="display: inline-block;margin-left: 10px">
        <el-button size="small" type="primary" plain style="display: inline-block">点击上传</el-button>
        <el-tooltip class="item" effect="dark" :content="name" placement="top-start">
            <i class="el-icon-question" style="color: #909399;font-size: 18px"></i>
        </el-tooltip>
    </el-upload>
</template>

<script>
export default {
  props:['src'],
  data () {
    return {
      name: ''
    }
  },
  methods: {
    beforeUpload(file) {
        if(file.name != this.name){
            this.$message.error('请保证文件名为'+'"'+this.name+'"')
            return false
        }else{
            return true
        }
    },
    onSuccess(response) {
        if(response.ret == 0){
            this.$message.success('上传成功！')
            this.$emit('setSuccess')
        }else{
            this.$message.error(response.err)
        }
    }
  },
  mounted() {
      if(this.src){
         this.name = decodeURI(this.src).split('/').pop()
      }
  },
  watch:{
      src: function(){
          if(this.src){
              this.name = decodeURI(this.src).split('/').pop()
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>