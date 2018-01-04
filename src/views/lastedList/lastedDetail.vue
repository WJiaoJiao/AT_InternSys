<template>
    <div class="content">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb">
        <el-breadcrumb-item>最新</el-breadcrumb-item>
        <el-breadcrumb-item to="/lastedList">最新列表</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-form ref="form" :model="paintDetail" label-width="100px">
            <el-form-item label="编号">
                <el-input v-model="paintDetail.paint_id" disabled></el-input>
            </el-form-item>
            <el-form-item label="浏览数量">
                <el-input v-model="paintDetail.read_num" disabled></el-input>
            </el-form-item>
            <el-form-item label="收藏数量">
                <el-input v-model="paintDetail.collect_num" disabled></el-input>
            </el-form-item>
            <el-form-item label="作品数量">
                <el-input v-model="paintDetail.picture_num" disabled></el-input>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="paintDetail.paint_title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="paintDetail.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="详细描述">
                <el-input v-model="paintDetail.paint_detail"></el-input>
            </el-form-item>
            <el-form-item label="是否收藏">
                <el-checkbox v-model="paintDetail.flag" :true-label="2" :false-label="1">收藏</el-checkbox>
            </el-form-item>
            <el-form-item label="封面原图">
                <el-button type="primary" plain @click="showOriginPic()">预览</el-button>
                <el-button type="primary" plain>修改</el-button>
            </el-form-item>
            <el-form-item label="封面缩略图">
                <el-button type="primary" plain @click="showThumbnailPic()">预览</el-button>
                <el-button type="primary" plain @click="editThumbnailPic()">修改</el-button>
            </el-form-item>
            <el-form-item label="画作信息">
                <el-input v-model="paintDetail.flag"></el-input>
            </el-form-item>
        </el-form>
        <el-dialog
          title="预览封面图片"
          :visible.sync="originPicVisible"
          width="340px">
          <img :src="paintDetail.title_detail_url" style="width: 300px;height:auto"/>
        </el-dialog>
        <el-dialog
          title="预览封面缩略图片"
          :visible.sync="thumbnailPicVisible"
          width="340px">
          <img :src="paintDetail.title_url" style="width: 300px;height:auto"/>
        </el-dialog>
        <el-dialog
          title="修改封面缩略图片"
          :visible.sync="editThumbnailVisible"
          width="400px">
          <div>
            <img id="image" src="static/logo.png" style="max-width: 100%;width:300px;height:auto"/>
          </div>
          <img id="temp"  src="static/logo.png"/>
        </el-dialog>
      </el-card>

    </div>
</template>

<script>
import {getPaintDetail} from '@/service/getPaintList.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      paintDetail: {},
      originPicVisible: false,
      thumbnailPicVisible: false,
      editThumbnailVisible: false
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    showOriginPic() {
      this.originPicVisible = true
    },
    showThumbnailPic() {
      this.thumbnailPicVisible = true
    },
    editThumbnailPic() {
      this.editThumbnailVisible = true
      this.$nextTick(_ => {
        var image = this.$el.querySelector('#image');
        var cropper = new Cropper(image, {
          viewMode: 3,
          checkCrossOrigin: false,

        });
        image.addEventListener('cropend', () => {
          console.log(this.$el.querySelector('#temp'))
          this.$el.querySelector('#temp').src = cropper.getCroppedCanvas().toDataURL()
        });
      })

    }
  },
  async created(){
    console.log(this.$route.params.paintId)
    try{
        let paintDetailData = await getPaintDetail(this.$route.params.paintId)
        this.paintDetail = paintDetailData.paint_detail
        console.log(paintDetailData.paint_detail)
    }catch(e){
        console.log(e)
        this.$message.error(e.error);
    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
