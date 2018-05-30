<template>
    <el-upload
        class="upload-demo"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        action="/api/imgs/upload/common_paint"
        :show-file-list="false"
        style="display: inline-block;margin-left: 10px">
        <el-button size="small" type="primary" plain style="display: inline-block">{{$t('message.clickUpload')}}</el-button>
        <el-tooltip class="item" effect="dark" :content="name" placement="top-start">
            <i class="el-icon-question" style="color: #909399;font-size: 18px"></i>
        </el-tooltip>
    </el-upload>
</template>

<script>
export default {
  props:['id','type'],
  data () {
    return {
      name: ''
    }
  },
  methods: {
    beforeUpload(file) {
        if(file.name != this.name){
            this.$message.error(this.$t('message.ensureTheFileName')+'"'+this.name+'"')
            return false
        }else{
            return true
        }
    },
    onSuccess(response) {
        if(response.ret == 0){
            this.$message.success(this.$t('message.uploadSuccess'))
            this.$emit('setSuccess')
        }else{
            this.$message.error(response.err)
        }
    }
  },
  mounted() {
      if(this.type === 'paint'){
         this.name = 'L'+this.id+'.jpg'
      }
      if(this.type === 'picture'){
          this.name = this.id+'.jpg'
      }
      if(this.type === 'h5' && localStorage.getItem('language')==='Chinese'){
          this.name = 'D'+this.id+'C.jpg'
      }
      if(this.type === 'h5' && localStorage.getItem('language')==='English'){
          this.name = 'DE'+this.id+'C.jpg'
      }
  },
  watch:{
      type: function(){
          if(this.type === 'paint'){
             this.name = 'L'+this.id+'.jpg'
          }
          if(this.type === 'picture'){
             this.name = this.id+'.jpg'
          }
          if(this.type === 'h5' && localStorage.getItem('language')==='Chinese'){
             this.name = 'D'+this.id+'C.jpg'
          }
          if(this.type === 'h5' && localStorage.getItem('language')==='English'){
             this.name = 'DE'+this.id+'C.jpg'
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>