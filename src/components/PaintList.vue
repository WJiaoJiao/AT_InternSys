<template>
    <div class="content">
      <el-card>
            <div slot="header" v-if="isSearch">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="画单ID">
                        <el-input v-model="formInline.id" placeholder="画单ID"></el-input>
                    </el-form-item>
                    <el-form-item label="关键词">
                        <el-input v-model="formInline.keyWords" placeholder="关键词"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch">查询</el-button>
                        <el-tooltip class="item" effect="dark" content="若同时填写了编号和关键词，编号查询优先！" placement="top-start">
                            <i class="el-icon-question" style="color: #909399;font-size: 18px"></i>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
            </div>
            <el-table stripe border ref="multipleTable" :data="paintList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-if="hasData">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="封面" width="220">
                    <template slot-scope="scope">
                        <img :src="scope.row.title_url" style="width: 200px;height: auto"/>
                    </template>
                </el-table-column>
                <el-table-column prop="paint_id" label="画单ID" width="100"></el-table-column>
                <el-table-column prop="paint_title" label="标题"></el-table-column>
                <el-table-column prop="read_num" label="阅读数量" width="100"></el-table-column>
                <el-table-column prop="collect_num" label="收藏数量" width="100"></el-table-column>
                <el-table-column prop="picture_num" label="作品张数" width="100"></el-table-column>
                <el-table-column prop="flag" label="是否在首页中展示" width="120">
                    <template slot-scope="scope">
                    <span>{{scope.row.flag ? scope.row.flag === 1 ? '是' : '否' : ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="flag" label="操作" show-overflow-tooltip width="100">
                    <template  slot-scope="scope">
                    <el-button type="primary" plain @click="showDetail(scope.row.paint_id)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 20px 0;text-align: right" v-if="hasData">
                <el-button @click="toggleSelection()">取消选择</el-button>
                <el-tooltip class="item" effect="dark" :content="infoText" placement="top-start" v-if="type != 'normal'">
                    <el-button type="primary" @click="homeShowAction">设置在首页中显示</el-button>
                </el-tooltip>
                <el-button type="primary" @click="homeShowAction" v-if="type != 'normal'">添加画单</el-button>
                <el-button type="danger" @click="deletePaints">删除</el-button>
            </div>
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {getPaintList,deletePaint,getPaintListById,getPaintListByKw,setPaintList,deleteNormalPaint} from '@/service/paintService.js'
export default {
  name: 'PaintList',
  props: ['paintList','isSearch','type'],
  data () {
    return {
        multipleSelection: [],
        formInline: {
          id: '',
          keyWords: '',
        },
        paint_ids: [],
        hasData: false,
        infoText: ''
    }
  },
  methods: {
    showDetail (id) {
      let breads = [...this.$store.state.common.breadcrumbs]
      breads.push({title: '详情'})
      this.$store.commit(types.SET_BREADCRUMBS, breads)
      let type = document.location.hash.split('/')[1];
      this.$router.push({path: `/paintDetail/${type}/${id}`})
    },
    handleSelectionChange(val) {
        console.log(val)
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
        if(this.type == 'normal'){
            if(this.paint_ids.length === 0){
                this.$message.warning('请选择需要删除的画单！')
                return
            }
            if(this.paint_ids.length > 10){
                this.$message.warning('一次最多删除10条数据！')
                return
            }
            try{
                await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                })
                console.log('111111')
                // let respData = await deleteNormalPaint(this.paint_ids)
                this.$message.success('删除成功')
                this.onSearch()
            }catch(e){
                if (e != 'cancel') {this.$message.error(e.err)}
            }
        }else{
            try{
                await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                })
                console.log('222222')
                // let deletePaint = await deletePaint(this.paint_ids);
                this.$message.success('删除成功')
                // this.$emit('setSuccess')
            }catch(e){
                if (e != 'cancel') {this.$message.error(e.err)}
            }
        }
    },
    async onSearch(){
        this.$emit('setData',[]);
        let id = this.formInline.id
        let keyWords = this.formInline.keyWords
        if(!id && !keyWords){
            this.$message.warning('请填写查询条件：编号或者关键词！')
            return
        }
        if(id){
            try{
                let paintListData = await getPaintListById(id)
                if(paintListData.paint_detail){
                    this.hasData = true
                    let paintList = [paintListData.paint_detail]
                    this.$emit('setData',paintList);
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
                    this.$emit('setData',paintList);
                }else{
                    this.$message('没有数据！');
                }
            }catch(e){
                this.$message.error(e.error);
            }
        }
    },
    async homeShowAction() {
        if(this.type == 2 || this.type == 3 ){
            if(this.paint_ids.length != 2){
                this.$message.warning(this.infoText)
                return
            }
        }
        if(this.type == 1 || this.type == 4 ){
            if(this.paint_ids.length != 5){
                this.$message.warning(this.infoText)
                return
            }
        }
        let data = {
            type_id: Number(this.type),
            cq_ids: this.paint_ids
        }
        console.log(data)
        try{
            let respData = await setPaintList(data);
            this.$message.success('设置成功！')
            this.paint_ids = []
            this.$emit('setSuccess')
            console.log(respData)
        }catch(e){
            this.$message.error(e.err);
        }
    }
  },
  watch:{
      paintList: function(){
        if(this.paintList.length > 0){
            this.hasData = true
        }else{
            this.hasData = false
        }
      }
  },
  async created(){
    if(this.type == 2 || this.type == 3 ){
        this.infoText = '必须设置两条数据！'
    }
    if(this.type == 1 || this.type == 4 ){
        this.infoText = '必须设置五条数据！'
    }
    console.log('type',this.type)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
