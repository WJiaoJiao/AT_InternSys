<template>
    <div class="content">
      <el-card>
            <div slot="header" v-if="isSearch">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item :label="$t('message.paint')+'ID'">
                        <el-input v-model="formInline.id" :placeholder="$t('message.paint')+'ID'"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.keyword')">
                        <el-input v-model="formInline.keyWords" :placeholder="$t('message.keyword')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">{{$t('message.search')}}</el-button>
                        <el-tooltip class="item" effect="dark" :content="$t('message.searchInfo')" placement="top-start">
                            <i class="el-icon-question" style="color: #909399;font-size: 18px"></i>
                        </el-tooltip>
                    </el-form-item>
                    <el-button type="primary" @click="onSearchAll" class="fr">{{$t('message.searchAllThePaintings')}}</el-button>
                </el-form>
            </div>
            <el-table stripe border ref="multipleTable" :data="paintList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-if="hasData" v-loading="loading" :empty-text="$t('message.noData')">
                <el-table-column type="selection" width="55" v-if="type != 'author'"></el-table-column>
                <el-table-column :label="$t('message.cover')" width="220">
                    <template slot-scope="scope">
                        <img :src="scope.row.title_url ? scope.row.title_url : ''" style="width: 200px;height: auto"/>
                    </template>
                </el-table-column>
                <el-table-column prop="paint_id" :label="$t('message.paint')+'ID'" width="120"></el-table-column>
                <el-table-column prop="paint_title" :label="$t('message.title')"></el-table-column>
                <el-table-column prop="read_num" :label="$t('message.readNumber')" width="120"></el-table-column>
                <el-table-column prop="collect_num" :label="$t('message.collectNumber')" width="120"></el-table-column>
                <el-table-column prop="picture_num" :label="$t('message.pictureNumber')" width="120"></el-table-column>
                <el-table-column prop="flag" :label="$t('message.showOnTheFrontPage')" width="120" v-if="type == 2 || type == 3">
                    <template slot-scope="scope">
                        <span style="color: #409EFF">{{scope.row.flag ? scope.row.flag === 1 ? $t('message.yes') : '' : ''}}</span>
                        <span>{{scope.row.flag ? scope.row.flag === 2 ? $t('message.no') : '' : ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="flag" :label="$t('message.operate')" show-overflow-tooltip width="100">
                    <template  slot-scope="scope">
                        <el-button type="primary" plain @click="showDetail(scope.row.paint_id)">{{$t('message.details')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="width: 100%;text-align: center">
                <el-button type="primary" plain @click="onSearchAll('loadmore')" :disabled="last_id ? false : true" style="width: 100%;margin-top: 30px" v-if="hasData && (searchType=='searchAll' || type=='author')">加载更多</el-button>
            </div>
            <div style="margin: 20px 0;text-align: right" v-if="hasData">
                <el-button @click="toggleSelection()" v-if="type != 'author'">{{$t('message.cancle')}}</el-button>
                <el-button type="primary" @click="homeShowAction" v-if="type == 2 || type == 3">{{$t('message.setShowOnTheFrontPage')}}</el-button>
                <el-button type="primary" @click="addPaint" v-if="type==1 || type==2 || type==3 || type==4">{{$t('message.add')}}{{$t('message.paint')}}</el-button>
                <el-button type="danger" @click="deletePaints" v-if="type != 'author'">{{$t('message.delete')}}</el-button>
            </div>
            <el-dialog :title="$t('message.add')+$t('message.paint')" :visible.sync="addPaintVisible" width="440px" @close="closeDialogAction">
                <el-form :inline="true" class="demo-form-inline" ref="addPaintForm">
                    <el-form-item :label="$t('message.paint')+'ID'" label-width="100px">
                        <el-input v-model="addPaintId"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="confirmPaintId" :disabled="confirmAddDis">{{$t('message.confirm')}}</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="addPaintIds" :empty-text="$t('message.noData')">
                    <el-table-column property="add_paint_id" :label="$t('message.paint')+'ID'" align="left"></el-table-column>
                    <el-table-column  property="add_paint_id" :label="$t('message.delete')" align="right">
                        <template slot-scope="scope">
                            <i class="el-icon-close" style="font-size: 20px" @click="deleteAddPaints(scope.row.add_paint_id)"></i>
                        </template>
                    </el-table-column>
                </el-table>
                 <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addPaintAction" :disabled="addButtonDis">{{$t('message.add')}}</el-button>
                </span>
            </el-dialog>
      </el-card>
    </div>
</template>

<script>
import _ from 'lodash';
import * as types from '@/store/types'
import {getPaintList,deletePaint,getPaintListById,getPaintListByKw,setPaintList,deleteNormalPaint,addPaintList,getAllPaintList} from '@/service/paintService.js'

export default {
  name: 'PaintList',
  props: ['paintList','isSearch','type','lastId'],
  data () {
    return {
        multipleSelection: [],
        formInline: {
          id: '',
          keyWords: '',
        },
        paint_ids: [],
        hasData: false,
        infoText: '',
        addPaintVisible: false,
        add_paint_ids: [],
        addPaintIds: [],
        addPaintId: '',
        confirmAddDis: true,
        addButtonDis: true,
        last_id: '',
        loading: false,
        searchType: ''
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
        let paint_ids = [];
        for(let v of val){
            paint_ids.push(v.paint_id)
        }
        this.paint_ids = paint_ids
    },
    toggleSelection(rows) {
        this.$refs.multipleTable.clearSelection();
    },
    async deletePaints() {
        if(this.paint_ids.length === 0){
            this.$message.warning(this.$t('message.deletePaintsInfo'))
            return
        }
        if(this.paint_ids.length > 10){
            this.$message.warning(this.$t('message.deletePaintsLimitInfo'))
            return
        }
        if(this.type == 'normal'){
            try{
                await this.$confirm(this.$t('message.deleteWarning'), this.$t('message.prompt'), {
                    confirmButtonText: this.$t('message.confirm'),
                    cancelButtonText: this.$t('message.cancle'),
                    type: 'warning',
                    center: true
                })
                let respData = await deleteNormalPaint({paint_ids: this.paint_ids})
                this.$message.success(this.$t('message.deleteSuccess'))
                if(this.searchType == 'search'){
                    this.onSearch()
                }else{
                    this.last_id = ''
                    this.onSearchAll()
                }
            }catch(e){
                if (e != 'cancel') {this.$message.error(e.err)}
            }
        }else{
            try{
                await this.$confirm(this.$t('message.removeWarning'), this.$t('message.prompt'), {
                    confirmButtonText: this.$t('message.confirm'),
                    cancelButtonText: this.$t('message.cancle'),
                    type: 'warning',
                    center: true
                })
                let data = {
                    type_id: this.type == 2 ? 2 : this.type == 3 ? 3 : this.type == 1 ? 1 : this.type == 4 ? 4 : null,
                    cq_ids: this.paint_ids
                }
                let respData = await deletePaint(data);
                this.$message.success(this.$t('message.removeSuccess'))
                this.$emit('setSuccess')
            }catch(e){
                if (e != 'cancel') {this.$message.error(e.err)}
            }
        }
    },
    async onSearch() {
        this.searchType = 'search'
        this.$emit('setData',{paintList: [],type: 'search'});
        let id = this.formInline.id
        let keyWords = this.formInline.keyWords
        if(!id && !keyWords){
            this.$message.warning('请填写查询条件：编号或者关键词！')
            return
        }
        if(id){
            try{
                let paintListData = await getPaintListById({paintId: id,last_id: {last_id: 0}})
                if(paintListData.paint_detail){
                    this.hasData = true
                    let paintList = [paintListData.paint_detail]
                    this.$emit('setData',{paintList: paintList,type: 'search'});
                }else{
                    this.$message('没有数据！');
                }
            }catch(e){
                this.$message.error(e.err);
            }
            return
        }
        if(keyWords){
            try{
                let paintListData = await getPaintListByKw(keyWords)
                if(paintListData.paint_info && paintListData.paint_info.length > 0){
                    this.hasData = true
                    let paintList = paintListData.paint_info
                    this.$emit('setData',{paintList: paintList,type: 'search'});
                }else{
                    this.$message('没有数据！');
                }
            }catch(e){
                this.$message.error(e.err);
            }
        }
    },
    async onSearchAll(type) {
        this.searchType = 'searchAll'
        if(this.type == 'author'){
            this.$emit('loadmore')
            return
        }
        if(type != 'loadmore'){
            this.last_id = ''
            this.$emit('setData',{paintList: [],type: 'search'});
        }
        try{
            let data = {}
            if(this.last_id){
                data.last_id = this.last_id
            }
            let respData = await getAllPaintList(data)
            if(respData.paint_list && respData.paint_list.length > 0){
                this.hasData = true
                this.$emit('setData',{paintList: respData.paint_list,type: 'searchAll'});
                if(respData.last_id){
                    this.last_id = respData.last_id
                }else{
                    this.last_id = ''
                }
            }else{
                this.$emit('setData',{paintList: [],type: 'searchAll'});
            }
        }catch(e){
            this.$message.error(e.err);
        }
        this.loading = false
    },
    async homeShowAction() {
        if(this.type == 2 || this.type == 3 ){
            if(this.paint_ids.length != 2){
                this.$message.warning(this.infoText)
                return
            }
        }
        if(this.type == 1 || this.type == 4 ){
            if(this.paint_ids.length == 0){
                this.$message.warning(this.infoText)
                return
            }
        }
        let data = {
            type_id: Number(this.type),
            cq_ids: this.paint_ids
        }
        try{
            let respData = await setPaintList(data);
            this.$message.success('设置成功！')
            this.paint_ids = []
            this.$emit('setSuccess')
        }catch(e){
            this.$message.error(e.err);
        }
    },
    addPaint() {
        this.addPaintVisible = true
    },
    confirmPaintId() {
        for(let i = 0; i < this.addPaintIds.length; i++){
            if(this.addPaintId == this.addPaintIds[i].add_paint_id){
                this.$message.warning(this.$t('message.noRepeatAdd'))
                return
            }
        }
        if (!this.checkNumber(this.addPaintId)) {
            this.$message.warning(this.$t('message.enterNumber'))
            return
        }
        this.add_paint_ids.push(Number(this.addPaintId))
        this.addPaintIds.push({add_paint_id: this.addPaintId})
        this.addPaintId = ''
    },
    deleteAddPaints(delete_paint_id) {
        _.remove(this.addPaintIds, (item)=> {
            return item.add_paint_id == delete_paint_id;
        })
        _.remove(this.add_paint_ids, (item)=> {
            return item == delete_paint_id;
        })
        this.addPaintIds = [...this.addPaintIds]
        this.add_paint_ids = [...this.add_paint_ids]
    },
    async addPaintAction() {
        let data = {
            type_id: this.type == 2 ? 2 : this.type == 3 ? 3 : this.type == 1 ? 1 : this.type == 4 ? 4 : null,
            cq_ids: this.add_paint_ids
        }
        try{
            let respData = await addPaintList(data)
            this.$message.success(this.$t('message.addSuccess'))
            this.addPaintVisible = false
            this.$emit('setSuccess')
        }catch(e){
            this.$message.error(e.err)
        }
    },
    checkNumber(theObj) {
        return (theObj*1) == (theObj*1)
    },
    closeDialogAction() {
        this.$nextTick(function() {
            this.$refs.addPaintForm.resetFields();
            this.addPaintIds = []
            this.add_paint_ids = []
            this.addPaintId = ''
        })
    }
  },
  watch:{
      paintList: function() {
        if(this.paintList.length > 0){
            this.hasData = true
        }else{
            this.hasData = false
        }
      },
      addPaintId: function() {
          if(this.addPaintId){
              this.confirmAddDis = false
          }else{
              this.confirmAddDis = true
          }
      },
      addPaintIds: function() {
          if(this.addPaintIds.length > 0){
              this.addButtonDis = false
          }else{
              this.addButtonDis = true
          }
      },
      lastId: function(){
          if(this.type == 'author' && this.lastId){
             this.last_id = this.lastId
          }
      }
  },
  async created(){
    if(this.type == 2 || this.type == 3 ){
        this.infoText = this.$t('message.setTwoData')
    }
    if(this.type == 1 || this.type == 4 ){
        this.infoText = this.$t('message.checkOneData')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
