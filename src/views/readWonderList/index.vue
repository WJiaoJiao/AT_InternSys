<template>
    <div class="content">
      <el-card>
            <el-table stripe border ref="multipleTable" :data="classic_quote" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-if="hasData">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column :label="$t('message.icon')" width="170">
                    <template slot-scope="scope">
                        <img :src="scope.row.cq_img_url" style="width: 150px;height: auto"/>
                    </template>
                </el-table-column>
                <el-table-column prop="cq_id" :label="$t('message.id')" width="100"></el-table-column>
                <el-table-column prop="cq_title" :label="$t('message.title')" width="200"></el-table-column>
                <el-table-column prop="cq_content" :label="$t('message.introduction')"></el-table-column>
                <el-table-column :label="'H5 ' + $t('message.picture')" width="240">
                    <template slot-scope="scope">
                        <el-button type="primary" plain @click="showH5Img(scope.row.cq_h5_url)">{{$t('message.preview')}}</el-button>
                        <upload-detail :src="scope.row.cq_h5_url" @setSuccess="setSuccess"></upload-detail>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.showOnTheFrontPage')" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.flag ? scope.row.flag === 1 ? $t('message.yes') : $t('message.no') : ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('message.operate')" show-overflow-tooltip width="100">
                    <template  slot-scope="scope">
                        <el-button type="primary" plain @click="editAction(scope.row)">{{$t('message.modify')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 20px 0;text-align: right" v-if="hasData">
                <el-button @click="toggleSelection()">{{$t('message.cancle')}}</el-button>
                <el-tooltip class="item" effect="dark" :content="$t('message.setTwoData')" placement="top-start">
                    <el-button type="primary" @click="homeShowAction">{{$t('message.setShowOnTheFrontPage')}}</el-button>
                </el-tooltip>
                <el-button type="danger" @click="deleteGrandCafes">{{$t('message.delete')}}</el-button>
            </div>
            <el-dialog
                :title="$t('message.modify')"
                :visible.sync="editVisible"
                @close="close"
                width="50%">
                <el-form label-position="left" label-width="140px" :model="cq_detail">
                    <el-form-item :label="$t('message.id')">
                        <el-input v-model="cq_detail.cq_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.title')">
                        <el-input v-model="cq_detail.cq_title"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.introduction')">
                        <el-input type="textarea" v-model="cq_detail.cq_content"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="saveAction">{{$t('message.save')}}</el-button>
                </span>
            </el-dialog>
            <preview-img :title="$t('message.preview')+' H5 '+$t('message.picture')" :visible="h5PicVisible" :src="cq_h5_url" @close="()=>{this.h5PicVisible = false}"></preview-img>
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {getReadWonderList,setPoineerCq,setCqList,deleteCqList} from '@/service/paintService.js'
import PreviewImg from '@/components/PreviewImg.vue'
import UploadDetail from '@/components/UploadDetail.vue'
export default {
  name: 'ReadWonderList',
  components:{
    'preview-img': PreviewImg,
    UploadDetail
  },
  data () {
    return {
        multipleSelection: [],
        cq_ids: [],
        hasData: false,
        classic_quote: [],
        editVisible: false,
        cq_detail: {},
        h5PicVisible: false,
        cq_h5_url: ''
    }
  },
  methods: {
    showDetail (id) {
      let breads = [...this.$store.state.common.breadcrumbs]
      breads.push({title: this.$t('message.detail')})
      this.$store.commit(types.SET_BREADCRUMBS, breads)
      let type = document.location.hash.split('/')[1];
      this.$router.push({path: `/paintDetail/${type}/${id}`})
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
        let cq_ids = [];
        for(let v of val){
            cq_ids.push(v.cq_id)
        }
        this.cq_ids = cq_ids
    },
    toggleSelection(rows) {
        this.$refs.multipleTable.clearSelection()
    },
    editAction(cq_detail) {
        this.cq_detail = cq_detail
        this.editVisible = true
    },
    async getReadWonderList() {
        try{
            let respData = await getReadWonderList()
            if(respData.classic_quote && respData.classic_quote.length > 0){
                this.classic_quote = respData.classic_quote
            }else{
                this.$message(this.$t('message.noData'))
            }
        }catch(e){
            this.$message.error(e.err);
        }
    },
    async saveAction() {
        if(!this.cq_detail.cq_title){
            this.$message.warning(this.$t('message.fillTitle'))
            return
        }
        if(!this.cq_detail.cq_content){
            this.$message.warning(this.$t('message.fillIntro'))
            return
        }
        let data = {
            cq_id: this.cq_detail.cq_id,
            cq_title: this.cq_detail.cq_title,
            cq_content: this.cq_detail.cq_content
        }
        try{
            let respData = await setCqList(data)
            this.$message.success(this.$t('message.saveSuccess'))
            this.editVisible = false
            this.getReadWonderList()
        }catch(e){
            this.$message.error(e.err)
        }
    },
    async homeShowAction() {
        if(this.cq_ids.length != 2){
            this.$message.warning(this.$t('message.setTwoData'))
            return
        }
        try{
            let respData = await setPoineerCq({cq_ids: this.cq_ids})
            this.$message.success(this.$t('message.setUpSuccess'))
            this.cq_ids = []
            this.getReadWonderList()
        }catch(e){
            this.$message.error(e.err)
        }
    },
    async deleteGrandCafes() {
        var that = this
        if(this.cq_ids.length > 10){
            this.$message.warning(this.$t('message.deletePaintsLimitInfo'))
            return
        }
        if(this.cq_ids.length === 0){
            this.$message.warning(this.$t('message.deleteDataInfo'))
            return
        }
        try{
            await this.$confirm(this.$t('message.deleteWarning'), this.$t('message.prompt'), {
              confirmButtonText: this.$t('message.confirm'),
              cancelButtonText: this.$t('message.cancle'),
              type: 'warning',
              center: true
            })
          let respData = await deleteCqList({cq_ids: that.cq_ids})
          that.$message.success(this.$t('message.deleteSuccess'))
          that.cq_ids = []
          this.getReadWonderList()
        }catch(e){
            if (e != 'cancel') {this.$message.error(e.err)}
        }
    },
    close() {
        this.getReadWonderList()
    },
    showH5Img(cq_h5_url) {
        this.h5PicVisible = true
        this.cq_h5_url = cq_h5_url
    },
    setSuccess() {
        this.getReadWonderList()
    }
  },
  computed: {
    breadCrumbs : function(){
      return  [
          {
              title: this.$t('message.menuReadWonder')
          }
      ]
    }
  },
  watch: {
      classic_quote: function() {
          if(this.classic_quote.length > 0){
              this.hasData = true
          }else{
              this.hasData = false
          }
      },
      breadCrumbs: function (newValue, oldValue) {
          this.$store.commit(types.SET_BREADCRUMBS, newValue)
      }
  },
  created() {
     this.$store.commit(types.SET_BREADCRUMBS, this.breadCrumbs)
     this.getReadWonderList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
