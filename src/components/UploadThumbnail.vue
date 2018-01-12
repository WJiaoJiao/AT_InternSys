<template>
    <el-dialog
      :title="title"
      :visible="visible"
      @close="close"
      width="645px">
      <div class="inlineBlock" v-if="visible">
        <img class="app-image" crossOrigin="anonymous" :src="src" style="max-width: 100%;width:300px;height:auto"/>
      </div>
      <div class="inlineBlock" style="vertical-align: top">
        <img class="block app-temp" width="300"  height="auto" />
        <el-button type="primary" @click="uploadThumbnail" class="fr" style="margin-top:20px">上传</el-button>
      </div>
    </el-dialog>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import {uploadPicture} from '@/service/paintService.js'
export default {
  name: 'UploadThumbnail',
  props: ['title','visible','src','size','thumbnailUrl'],
  data () {
    return {
      cropper: null
    }
  },
  methods: {
    uploadThumbnail() {
      var that = this
      let fileName = decodeURI(this.thumbnailUrl).split('/').pop().split('.').shift()
      console.log(fileName)
      this.cropper.getCroppedCanvas().toBlob(async function (blob) {
        var formData = new FormData()
        formData.append('file', blob, fileName)
        try{
          let respData = await uploadPicture(formData)
          that.$message.success('修改成功')
          that.$emit('close');
          that.$emit('setSuccess')
        }catch(e){
          that.$message.error(e.err)
        }
      });
    },
    close() {
        this.$emit('close');
    }
  },
  async created(){

  },
  watch: {
    visible: function(){
      console.log(this)
      if(this.visible){
        var that = this;
        this.$nextTick(_ => {
            var image = this.$el.querySelector('.app-image');
            var cropper = new Cropper(image, {
              aspectRatio: that.size.width / that.size.height,
              viewMode: 3,
              checkCrossOrigin: true
            });
            function showThumbnail(){
              that.$el.querySelector('.app-temp').src = cropper.getCroppedCanvas({
                width: that.size.width,
                height: that.size.height
              }).toDataURL()
            }
            image.addEventListener('ready', () => {
                showThumbnail()
            });
            image.addEventListener('cropend', () => {
                showThumbnail()
            });
            image.addEventListener('zoom', () => {
                showThumbnail()
            });
            this.cropper = cropper
        })
      }else{
        this.cropper && this.cropper.destroy()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
