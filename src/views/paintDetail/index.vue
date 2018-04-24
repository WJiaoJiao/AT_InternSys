<template>
    <div class="content">
      <el-card>
        <el-form ref="form" :model="paintDetail" label-width="130px" label-position="left">
            <el-form-item :label="$t('message.paint')+'ID'">
                <el-input v-model="paintDetail.paint_id" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.readNumber')">
                <el-input v-model="paintDetail.read_num" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.collectNumber')" v-if="type != 'emotionClassify' && type != 'artClassify' && type!='sceneClassify'">
                <el-input v-model="paintDetail.collect_num" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.pictureNumber')">
                <el-input v-model="paintDetail.picture_num" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.title')">
                <el-input v-model="paintDetail.paint_title" :disabled="type == 'emotionClassify' || type == 'artClassify' || type == 'sceneClassify' ? true : false"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.subtitle')" v-if="type != 'emotionClassify' && type != 'artClassify' && type!='sceneClassify'">
                <el-input v-model="paintDetail.sub_title"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.detailedDescription')" v-if="type != 'emotionClassify' && type != 'artClassify' && type!='sceneClassify'">
                <el-input v-model="paintDetail.paint_detail"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.coverOriginal')" v-if="type != 'emotionClassify' && type != 'artClassify' && type!='sceneClassify'">
                <el-button type="primary" plain @click="()=>{this.originPicVisible = true}">{{$t('message.preview')}}</el-button>
                <upload-detail :src="paintDetail.title_detail_url" @setSuccess="setSuccess"></upload-detail>
            </el-form-item>
            <el-form-item :label="$t('message.coverThumbnail')" v-if="type != 'emotionClassify'">
                <el-button type="primary" plain @click="()=>{this.thumbnailPicVisible = true}">{{$t('message.preview')}}</el-button>
                <el-button type="primary" plain @click="editThumbnailPic()" v-if="type != 'artClassify' && type!='sceneClassify'">{{$t('message.modify')}}</el-button>
            </el-form-item>
            <el-form-item :label="$t('message.pictureInformation')">
                <el-table :data="picture_info" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" :empty-text="$t('message.noData')">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="picture_id" :label="$t('message.id')" width="80">
                    </el-table-column>
                    <el-table-column prop="picture_type" :label="$t('message.type')" width="80">
                        <template slot-scope="scope">
                            <span>{{scope.row.picture_type ? (scope.row.picture_type === 1 ? $t('message.horizontal') : $t('message.vertical')) : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.original')"  width="240">
                        <template slot-scope="scope">
                            <el-button type="primary" plain @click="showPic(scope.row.detail_url)">{{$t('message.preview')}}</el-button>
                            <upload-detail :src="scope.row.detail_url" @setSuccess="setSuccess"></upload-detail>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.thumbnail')" width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" plain @click="showThumbnail(scope.row.picture_url)">{{$t('message.preview')}}</el-button>
                            <el-button type="primary" plain @click="editPicture(scope.row.detail_url,scope.row.picture_url)">{{$t('message.modify')}}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.operate')">
                        <template slot-scope="scope">
                            <el-button type="primary" plain @click="getPicInfo(scope.row.picture_id)">{{$t('message.details')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="width: 100%;text-align: center">
                    <el-button type="primary" plain @click="getDetail('loadmore')" :disabled="last_id ? false : true" style="width: 100%;margin-top: 30px" v-if="pictureHasData">{{$t('message.loadMore')}}</el-button>
                </div>
                <div style="margin-top: 20px;text-align: right">
                    <el-button type="primary" @click="addPic">{{$t('message.add')}} {{$t('message.picture')}}</el-button>
                    <el-button type="danger" @click="deletePic">{{$t('message.remove')}} {{$t('message.picture')}}</el-button>
                </div>
                <div style="margin-top: 20px;text-align: right" v-if="type != 'emotionClassify' && type != 'artClassify' && type != 'artClassify' && type!='sceneClassify'">
                    <el-button type="primary" @click="save">{{$t('message.save')}}</el-button>
                </div>
            </el-form-item>
        </el-form>
        <preview-img :title="$t('message.preview')+' '+$t('message.coverOriginal')" :visible="originPicVisible" :src="paintDetail.title_detail_url" @close="()=>{this.originPicVisible = false}"></preview-img>
        <preview-img :title="$t('message.preview')+' '+$t('message.coverThumbnail')" :visible="thumbnailPicVisible" :src="paintDetail.title_url"  @close="()=>{this.thumbnailPicVisible = false}"></preview-img>
        <preview-img :title="$t('message.preview')+' '+$t('message.original')" :visible="originVisible" :src="detail_url"  @close="()=>{this.originVisible = false}"></preview-img>
        <preview-img :title="$t('message.preview')+' '+$t('message.thumbnail')" :visible="thumbnailVisible" :src="picture_url"  @close="()=>{this.thumbnailVisible = false}"></preview-img>
        <upload-thumbnail :title="$t('message.modify')+' '+$t('message.coverThumbnail')" :visible="editThumbnailVisible" :src="paintDetail.title_detail_url" @close="editThumbnailVisible=false" :size="{width: 708,height:336}" :thumbnailUrl="paintDetail.title_url" @setSuccess="setSuccess"></upload-thumbnail>
        <upload-thumbnail :title="$t('message.modify')+' '+$t('message.picture')+' '+$t('message.thumbnail')" :visible="editPictureVisible" :src="detail_url" @close="editPictureVisible=false" :size="{width: 218,height:218}" :thumbnailUrl="picture_url" @setSuccess="setSuccess"></upload-thumbnail>

        <el-dialog
          :title="this.$t('message.pictureDetial')"
          :visible.sync="pictureInfoVisible"
          width="600px">
            <el-form label-position="left" label-width="90px" :model="picture_detail">
                <el-form-item :label="$t('message.id')">
                    <el-input v-model="picture_detail.picture_id"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.image')">
                    <img :src="picture_detail.picture_url" style="width: 200px;height: auto"/>
                </el-form-item>
                <el-form-item :label="$t('message.author')">
                    <el-input v-model="picture_detail.author"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.ceateTime')">
                    <el-input v-model="picture_detail.time"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.size')">
                    <el-input v-model="picture_detail.size"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.introduction')">
                    <el-input v-model="picture_detail.detail"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.videoUrl')">
                    <el-input v-model="picture_detail.video_url"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog :title="$t('message.add')+' '+$t('message.picture')" :visible.sync="addPictureVisible" width="440px" @close="closeDialogAction">
              <el-form :inline="true" class="demo-form-inline" ref="addPictureForm">
                  <el-form-item :label="$t('message.picture')+'ID'" label-width="120px">
                      <el-input v-model="addPictureId"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="confirmPictureId" :disabled="confirmAddDis">{{$t('message.confirm')}}</el-button>
                  </el-form-item>
              </el-form>
              <el-table :data="addPictureIds" :empty-text="$t('message.noData')">
                  <el-table-column property="add_picture_id" :label="$t('message.picture')+'ID'" width="350"></el-table-column>
                  <el-table-column  property="add_picture_id" :label="$t('message.delete')">
                      <template slot-scope="scope">
                          <i class="el-icon-close" style="font-size: 20px" @click="deleteAddPicture(scope.row.add_picture_id)"></i>
                      </template>
                  </el-table-column>
              </el-table>
               <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="addPictureAction" :disabled="addButtonDis">{{$t('message.add')}}</el-button>
              </span>
          </el-dialog>
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {getPaintDetail,updatePaint,getPicInfo,addDeletePaint} from '@/service/paintService.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import PreviewImg from '@/components/PreviewImg.vue'
import UploadThumbnail from '@/components/UploadThumbnail.vue'
import UploadDetail from '@/components/UploadDetail.vue'

export default {
  name: 'paintDetail',
  components:{
    'preview-img': PreviewImg,
    'upload-thumbnail': UploadThumbnail,
    UploadDetail
  },
  data () {
    return {
      multipleSelection: [],
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
      cropper: null,
      picture_ids: [],
      addPictureVisible: false,
      addPictureId: '',
      confirmAddDis: true,
      addPictureIds: [],
      addButtonDis: true,
      add_picture_ids: [],
      detail_url_name: '',
      type: '',
      last_id: '',
      pictureHasData: false
    }
  },
  methods: {
    onSubmit() {
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
        let data = {
            paintId: this.$route.params.paintId
        }
        if(this.last_id){
            data.last_id = {last_id: this.last_id}
        }else{
            data.last_id ={last_id: 0}
        }
        try{
            let respData = await getPaintDetail(data)
            if(respData.last_id){
                this.last_id = respData.last_id
            }else{
                this.last_id = 0
            }
            this.paintDetail = respData.paint_detail
            if(respData.paint_detail.picture_info.length > 0){
                this.picture_info = this.picture_info.concat(respData.paint_detail.picture_info)
                this.pictureHasData = true
            }
            this.detail_url_name = decodeURI(respData.paint_detail.title_detail_url).split('/').pop()
        }catch(e){
            this.$message.error(e.err);
        }
    },
    addPic () {
      this.addPictureVisible = true
    },
    async getPicInfo (picture_id) {
        this.pictureInfoVisible = true
        try{
            let picInfoData = await getPicInfo(picture_id)
            this.picture_detail = picInfoData.picture_detail
        }catch(e){
            this.$message.error(e.err);
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
            this.$message.error(this.$t('message.fillTitle'))
            return
        }
        if(!data.paint_detail){
            this.$message.error(this.$t('message.fillIntro'))
            return
        }
        if(!data.sub_title){
            this.$message.error(this.$t('message.fillSubTitle'))
            return
        }
        try{
            let updatePaintData = await updatePaint(data);
            this.$message.success(this.$t('message.modifySuccess'))
            this.last_id = 0
            this.picture_info = []
            this.getDetail()
        }catch(e){
            this.$message.error(e.err);
        }
    },
    editPicture(detail_url,picture_url) {
        this.editPictureVisible = true
        this.detail_url = detail_url
        this.picture_url = picture_url
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
        let picture_ids = [];
        for(let v of val){
            picture_ids.push(v.picture_id)
        }
        this.picture_ids = picture_ids
    },
    async deletePic() {
      if(this.picture_ids.length === 0){
        this.$message.warning(this.$t('message.checkOneData'))
        return
      }
      try{
          await this.$confirm(this.$t('message.removePictureWarning'), this.$t('message.prompt'), {
              confirmButtonText: this.$t('message.confirm'),
              cancelButtonText: this.$t('message.cancle'),
              type: 'warning',
              center: true
          })
          let data = {
            paint_id: Number(this.$route.params.paintId),
            opr: 2,
            picture_ids: this.picture_ids
          }
          let respData = await addDeletePaint(data)
          this.$message.success(this.$t('message.removeSuccess'))
          this.last_id = 0
          this.picture_info = []
          this.getDetail()
      }catch(e){
          if (e != 'cancel') {this.$message.error(e.err)}
      }
    },
    closeDialogAction() {
        this.$nextTick(function() {
            this.$refs.addPictureForm.resetFields();
            this.picture_ids = []
            this.addPictureId = ''
            this.addPictureIds = []
            this.add_picture_ids = []
        })
    },
    deleteAddPicture(delete_picture_id) {
        _.remove(this.addPictureIds, (item)=> {
            return item.add_picture_id == delete_picture_id;
        })
        _.remove(this.add_picture_ids, (item)=> {
            return item == delete_picture_id;
        })
        this.addPictureIds = [...this.addPictureIds]
        this.add_picture_ids = [...this.add_picture_ids]
    },
    async addPictureAction() {
        let data = {
            paint_id: Number(this.$route.params.paintId),
            opr: 1,
            picture_ids: this.add_picture_ids
        }
        try{
            let respData = await addDeletePaint(data)
            this.$message.success(this.$t('message.addSuccess'))
            this.addPictureVisible = false
            this.last_id = 0
            this.picture_info = []
            this.getDetail()
        }catch(e){
            this.$message.error(e.err)
        }
    },
    confirmPictureId() {
      for(let i = 0; i < this.addPictureIds.length; i++){
          if(this.addPictureId == this.addPictureIds[i].add_picture_id){
              this.$message.warning(this.$t('message.noRepeatAdd'))
              return
          }
      }
      if (!this.checkNumber(this.addPictureId)) {
          this.$message.warning(this.$t('message.enterNumber'))
          return
      }
      this.add_picture_ids.push(Number(this.addPictureId))
      this.addPictureIds.push({add_picture_id: this.addPictureId})
      this.addPaintId = ''
    },
    checkNumber(theObj) {
        return (theObj*1) == (theObj*1)
    },
    setSuccess() {
        this.getDetail()
    }
  },
  watch: {
    addPictureId: function() {
          if(this.addPictureId){
              this.confirmAddDis = false
          }else{
              this.confirmAddDis = true
          }
    },
    addPictureIds: function() {
        if(this.addPictureIds.length > 0){
            this.addButtonDis = false
        }else{
            this.addButtonDis = true
        }
    }
  },
  created() {
      let type = this.$route.params.type
      this.type = type
      let title = ''
      if(type == 'lastedList'){
        title = this.$t('message.menuLasted')
      }
      if(type == 'hottestList'){
        title = this.$t('message.menuHottest')
      }
      if(type == 'todayList'){
        title =  this.$t('message.menuTodayRecommendsBanner')
      }
      if(type == 'artList'){
        title =  this.$t('message.menuArtVanBanner')
      }
      if(type == 'artClassify'){
        title =  this.$t('message.menuArt')
      }
      if(type == 'emotionClassify'){
          title =  this.$t('message.menuEmotion')
      }
      if(type == 'sceneClassify'){
          title =  this.$t('message.menuScene')
      }
      if(type == 'normalList'){
          title =  this.$t('message.menuOrdinaryPainting')
      }
      if(type == 'authorList'){
          title =  this.$t('message.menuAuthorPainting')
      }
      if(type == 'normalList' || type == 'authorList'){
          this.$store.commit(types.SET_BREADCRUMBS, [
            {
                title
            },
            {
                title: this.$t('message.detail')
            }
        ])
      }else{
          this.$store.commit(types.SET_BREADCRUMBS, [
            {
                title: type == 'artClassify' ||  type == 'emotionClassify' || type == 'sceneClassify' ? this.$t('message.menuClassification') : this.$t('message.menuRecommend')
            },
            {
            to: {
                path: '/' + type
            },
            title
            },
            {
            title: this.$t('message.detail')
            }
        ])
      }
      
      this.getDetail()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
