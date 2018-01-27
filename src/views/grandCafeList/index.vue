<template>
    <div class="content">
      <el-card>
            <el-table stripe border ref="multipleTable" :data="mq_list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-if="hasData">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="mq_id" label="编号" width="100"></el-table-column>
                <el-table-column prop="mq_content" label="内容" ></el-table-column>
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
                <el-button type="danger" @click="deleteGrandCafes">删除</el-button>
            </div>
            <el-dialog
                title="修改"
                :visible.sync="editVisible"
                @close="close"
                width="50%">
            <el-form label-position="left" label-width="140px" :model="mq_detail">
                <el-form-item label="编号">
                    <el-input v-model="mq_detail.mq_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="mq_detail.mq_content"></el-input>
                </el-form-item>
                <el-form-item label="是否在首页中展示">
                    <el-checkbox v-model="mq_detail.flag" :true-label="1" :false-label="2"></el-checkbox>
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
import {getGrandCafeList,updateGrandCafe,deleteGrandCafe} from '@/service/paintService.js'
export default {
  name: 'GrandCafeList',
  data () {
    return {
        multipleSelection: [],
        mq_ids: [],
        hasData: false,
        mq_list: [],
        editVisible: false,
        mq_detail: {}
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
        let mq_ids = [];
        for(let v of val){
            mq_ids.push(v.mq_id)
        }
        this.mq_ids = mq_ids
    },
    toggleSelection(rows) {
        this.$refs.multipleTable.clearSelection()
    },
    editAction(mq_detail) {
        this.mq_detail = mq_detail
        this.editVisible = true
    },
    async getGrandCafeList() {
        try{
            let respData = await getGrandCafeList()
            if(respData.mq_list && respData.mq_list.length > 0){
                this.mq_list = respData.mq_list
            }else{
                this.$message('没有数据！')
            }
        }catch(e){
            this.$message.error(e.err);
        }
    },
    async saveAction() {
        if(!this.mq_detail.mq_content){
            this.$message.warning('请填写内容！')
            return
        }
        try{
            let respData = await updateGrandCafe(this.mq_detail)
            this.$message.success('保存成功！')
            this.editVisible = false
            this.getGrandCafeList()
        }catch(e){
            this.$message.error(e.err)
        }
    },
    deleteGrandCafes() {
        var that = this
        if(this.mq_ids.length > 10){
            this.$message.warning('一次最多删除10条数据！')
            return
        }
        if(this.mq_ids.length === 0){
            this.$message.warning('请勾选所要删除的数据！')
            return
        }
        this.$alert('您确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          callback: async action => {
            try{
                let respData = await deleteGrandCafe({mq_ids: that.mq_ids})
                that.$message.success('删除成功！')
                that.mq_ids = []
                this.getGrandCafeList()
            }catch(e){
                this.$message.error(e.err)
            }
          }
        });
    },
    close() {
        this.getGrandCafeList()
    },
  },
  created(){
      this.$store.commit(types.SET_BREADCRUMBS, [
        {
            title: '大咖说列表'
        }]
      )
      this.getGrandCafeList()
  },
  watch: {
      mq_list: function() {
          if(this.mq_list.length > 0){
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
