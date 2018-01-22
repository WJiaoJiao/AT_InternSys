<template>
    <div class="content">
      <el-card>
            <el-table stripe border ref="multipleTable" :data="classic_quote" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-if="hasData">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="图标" width="170">
                    <template slot-scope="scope">
                        <img :src="scope.row.cq_img_url" style="width: 150px;height: auto"/>
                    </template>
                </el-table-column>
                <el-table-column prop="cq_id" label="编号" width="100"></el-table-column>
                <el-table-column prop="cq_title" label="标题" width="200"></el-table-column>
                <el-table-column prop="cq_content" label="简介"></el-table-column>
                <el-table-column label="h5链接地址" width="100">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.cq_h5_url" placement="top-start">
                            <el-button @click="openUrl(scope.row.cq_h5_url)">点击查看</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="是否在首页中展示" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.flag ? scope.row.flag === 1 ? '是' : '否' : ''}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip width="100">
                    <template  slot-scope="scope">
                        <el-button type="primary" plain @click="editAction(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 20px 0;text-align: right" v-if="hasData">
                <el-button @click="toggleSelection()">取消选择</el-button>
                <el-tooltip class="item" effect="dark" content="必须设置两条数据！" placement="top-start">
                    <el-button type="primary" @click="homeShowAction">设置在首页中显示</el-button>
                </el-tooltip>
                <el-button type="danger" @click="deleteGrandCafes">删除</el-button>
            </div>
            <el-dialog
                title="修改"
                :visible.sync="editVisible"
                @close="close"
                width="50%">
                <el-form label-position="left" label-width="140px" :model="cq_detail">
                    <el-form-item label="编号">
                        <el-input v-model="cq_detail.cq_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="cq_detail.cq_title"></el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input type="textarea" v-model="cq_detail.cq_content"></el-input>
                    </el-form-item>
                    <el-form-item label="h5链接地址">
                        <el-input v-model="cq_detail.cq_h5_url"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="saveAction">保存</el-button>
                </span>
            </el-dialog>
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {getReadWonderList,setPoineerCq,setCqList,deleteCqList} from '@/service/paintService.js'
export default {
  name: 'GrandCafeList',
  data () {
    return {
        multipleSelection: [],
        cq_ids: [],
        hasData: false,
        classic_quote: [],
        editVisible: false,
        cq_detail: {},
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
                this.$message('没有数据！')
            }
        }catch(e){
            this.$message.error(e.err);
        }
    },
    async saveAction() {
        if(!this.cq_detail.cq_title){
            this.$message.warning('请填写标题！')
            return
        }
        if(!this.cq_detail.cq_content){
            this.$message.warning('请填写简介！')
            return
        }
        if(!this.cq_detail.cq_h5_url){
            this.$message.warning('请填写H5链接地址！')
            return
        }
        let data = {
            cq_id: this.cq_detail.cq_id,
            cq_title: this.cq_detail.cq_title,
            cq_content: this.cq_detail.cq_content,
            cq_h5_url: this.cq_detail.cq_h5_url
        }
        try{
            let respData = await setCqList(data)
            this.$message.success('保存成功！')
            this.editVisible = false
            this.getReadWonderList()
        }catch(e){
            this.$message.error(e.err)
        }
    },
    async homeShowAction() {
        console.log(this.cq_ids)
        if(this.cq_ids.length != 2){
            this.$message.warning('必须设置两条数据！')
            return
        }
        try{
            let respData = await setPoineerCq({cq_ids: this.cq_ids})
            this.$message.success('设置成功')
            this.cq_ids = []
            this.getReadWonderList()
        }catch(e){
            this.$message.error(e.err)
        }
    },
    async deleteGrandCafes() {
        console.log(this.cq_ids)
        var that = this
        if(this.cq_ids.length > 10){
            this.$message.warning('一次最多删除10条数据！')
            return
        }
        if(this.cq_ids.length === 0){
            this.$message.warning('请勾选所要删除的数据！')
            return
        }
        try{
            await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            })
          let respData = await deleteCqList({cq_ids: that.cq_ids})
          that.$message.success('删除成功！')
          that.cq_ids = []
          this.getReadWonderList()
        }catch(e){
            if (e != 'cancel') {this.$message.error(e.err)}
        }
    },
    openUrl(cq_h5_url) {
        window.open(cq_h5_url)
    },
    close() {
        this.getReadWonderList()
    }
  },
  async created(){
      this.$store.commit(types.SET_BREADCRUMBS, [
            {
                title: '读精彩列表'
            }
        ]
      )
      this.getReadWonderList()
  },
  watch: {
      classic_quote: function() {
          if(this.classic_quote.length > 0){
              this.hasData = true
          }else{
              this.hasData = false
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
