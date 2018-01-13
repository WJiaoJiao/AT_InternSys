<template>
    <el-upload
        class="upload-demo"
        :before-upload="beforeUpload"
        action="/api/imgs/upload/common"
        style="display: inline-block">
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