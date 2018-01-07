<template>
    <div class="content">
      <el-card>
        <el-form ref="form" :model="paintDetail" label-width="100px" label-position="left">
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
                <el-checkbox v-model="paintDetail.flag" :true-label="2" :false-label="1" disabled></el-checkbox>
            </el-form-item>
            <el-form-item label="封面原图">
                <el-button type="primary" plain @click="()=>{this.originPicVisible = true}">预览</el-button>
                <el-button type="primary" plain>修改</el-button>
            </el-form-item>
            <el-form-item label="封面缩略图">
                <el-button type="primary" plain @click="()=>{this.thumbnailPicVisible = true}">预览</el-button>
                <el-button type="primary" plain @click="editThumbnailPic()">修改</el-button>
            </el-form-item>
            <el-form-item label="画作信息">
                <el-table :data="picture_info" border style="width: 100%">
                    <el-table-column prop="picture_id" label="编号" width="80">
                    </el-table-column>
                    <el-table-column prop="picture_type" label="类型" width="80">
                        <template slot-scope="scope">
                            <span>{{scope.row.picture_type ? (scope.row.picture_type === 1 ? '横图' : '竖图') : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="原图"  width="120">
                        <template slot-scope="scope">
                            <el-button type="primary" plain @click="showPic(scope.row.detail_url)">预览</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="缩略图" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" plain @click="showThumbnail(scope.row.picture_url)">预览</el-button>
                            <el-button type="primary" plain @click="editPicture(scope.row.detail_url)">修改</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" plain @click="getPicInfo(scope.row.picture_id)">详情</el-button>
                            <el-button type="danger" plain>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px;text-align: right">
                    <el-button type="primary" @click="addPic">添加画作</el-button>
                    <el-button type="primary" @click="save">保存</el-button>
                </div>
            </el-form-item>
        </el-form>
        <preview-img title="预览封面原图" :visible="originPicVisible" :src="paintDetail.title_detail_url" @close="()=>{this.originPicVisible = false}"></preview-img>
        <preview-img title="预览封面缩略图" :visible="thumbnailPicVisible" :src="paintDetail.title_url"  @close="()=>{this.thumbnailPicVisible = false}"></preview-img>
        <preview-img title="预览原图" :visible="originVisible" :src="detail_url"  @close="()=>{this.originVisible = false}"></preview-img>
        <preview-img title="预览缩略图" :visible="thumbnailVisible" :src="picture_url"  @close="()=>{this.thumbnailVisible = false}"></preview-img>
        <upload-thumbnail title="修改封面缩略图" :visible="editThumbnailVisible" :src="paintDetail.title_detail_url" @close="editThumbnailVisible=false" :size="{width: 346,height:210}"></upload-thumbnail>
        <upload-thumbnail title="修改画作缩略图" :visible="editPictureVisible" :src="detail_url" @close="editPictureVisible=false" :size="{width: 218,height:218}"></upload-thumbnail>

        <el-dialog
          title="画作详情"
          :visible.sync="pictureInfoVisible"
          width="600px">
            <el-form label-position="left" label-width="80px" :model="picture_detail">
                <el-form-item label="编号">
                    <el-input v-model="picture_detail.picture_id"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <img :src="picture_detail.picture_url" style="width: 200px;height: auto"/>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="picture_detail.author"></el-input>
                </el-form-item>
                <el-form-item label="创作年代">
                    <el-input v-model="picture_detail.time"></el-input>
                </el-form-item>
                <el-form-item label="尺寸">
                    <el-input v-model="picture_detail.size"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="picture_detail.detail"></el-input>
                </el-form-item>
                <el-form-item label="视频地址">
                    <el-input v-model="picture_detail.video_url"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {getPaintDetail,updatePaint,getPicInfo,uploadThumbnail} from '@/service/paintService.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import PreviewImg from '@/components/PreviewImg.vue'
import UploadThumbnail from '@/components/UploadThumbnail.vue'
export default {
  name: 'paintDetail',
  components:{
    'preview-img': PreviewImg,
    'upload-thumbnail': UploadThumbnail
  },
  data () {
    return {
      paintDetail: {},
      picture_info: [],
      originPicVisible: false,
      thumbnailPicVisible: false,
      editThumbnailVisible: false,
      originVisible: false,
      thumbnailVisible: false,
      pictureInfoVisible: false,
      editPictureVisible: false,
      detail_url: '',
      picture_url: '',
      picture_detail: {},
      cropper: null
    }
  },
  methods: {
    onSubmit() {
        console.log('submit!');
    },
    editThumbnailPic() {
        this.editThumbnailVisible = true
    },
    showPic(detail_url) {
        this.originVisible = true
        this.detail_url = detail_url
    },
    showThumbnail(picture_url) {
        this.thumbnailVisible = true
        this.picture_url = picture_url
    },
    async getDetail(){
        try{
            let paintDetailData = await getPaintDetail(this.$route.params.paintId)
            this.paintDetail = paintDetailData.paint_detail
            this.picture_info = paintDetailData.paint_detail.picture_info
        }catch(e){
            this.$message.error(e.error);
        }
    },
    addPic () {

    },
    async getPicInfo (picture_id) {
        this.pictureInfoVisible = true
        console.log(picture_id)
        try{
            let picInfoData = await getPicInfo(picture_id)
            this.picture_detail = picInfoData.picture_detail
            console.log(picInfoData.picture_detail)
        }catch(e){
            this.$message.error(e.error);
        }
    },
    async save() {
        let data = {
            paint_id: this.paintDetail.paint_id,
            paint_title: this.paintDetail.paint_title,
            paint_detail: this.paintDetail.paint_detail,
            sub_title: this.paintDetail.sub_title
        }
        if(!data.paint_title){
            this.$message.error('请填写标题！')
            return
        }
        if(!data.paint_detail){
            this.$message.error('请填写简介！')
            return
        }
        if(!data.sub_title){
            this.$message.error('请填写副标题！')
            return
        }
        try{
            let updatePaintData = await updatePaint(data);
            console.log(updatePaintData)
            if(updatePaintData.ret === 0){
                this.$message.success('修改成功！')
                this.getDetail()
            }
        }catch(e){
            this.$message.error(e.error);
        }
    },
    editPicture(detail_url) {
      this.editPictureVisible = true
      this.detail_url = detail_url
    }
  },
  created() {
      let type = this.$route.params.type
      let title = ''
      if(this.$route.params.type == 'lastedList'){
        title = '最新列表'
      }
      if(this.$route.params.type == 'hottestList'){
        title = '最热列表'
      }
      if(this.$route.params.type == 'todayList'){
        title =  '今日推荐列表'
      }
      this.$store.commit(types.SET_BREADCRUMBS, [
        {
          to: {
            path: '/'+type
          },
          title
        },
        {
          title: '详情'
        }
      ])

      this.getDetail()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
