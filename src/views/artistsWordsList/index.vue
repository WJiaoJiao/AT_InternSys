<template>
    <div class="content">
      <el-card>
            <el-table stripe border ref="multipleTable" :data="mq_list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-if="hasData" :empty-text="$t('message.noData')">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="mq_id" :label="$t('message.id')" width="100"></el-table-column>
                <el-table-column prop="mq_content" :label="$t('message.content')" ></el-table-column>
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
                <el-button type="danger" @click="deleteGrandCafes">{{$t('message.delete')}}</el-button>
            </div>
            <el-dialog
                :title="$t('message.modify')"
                :visible.sync="editVisible"
                width="50%">
            <el-form label-position="left" label-width="180px" :model="mq_detail">
                <el-form-item :label="$t('message.id')">
                    <el-input v-model="mq_detail.mq_id" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.content')">
                    <el-input type="textarea" v-model="mq_detail.mq_content"></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.showOnTheFrontPage')">
                    <el-checkbox v-model="mq_detail.flag" :true-label="1" :false-label="2"></el-checkbox>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAction">{{$t('message.save')}}</el-button>
            </span>
            </el-dialog>

      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {getGrandCafeList,updateGrandCafe,deleteGrandCafe} from '@/service/paintService.js'
export default {
  name: 'ArtistsWordsList',
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
      breads.push({title: this.$t('message.detail')})
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
                this.$message($t('message.noData'))
            }
        }catch(e){
            this.$message.error(e.err);
        }
    },
    async saveAction() {
        if(!this.mq_detail.mq_content){
            this.$message.warning($t('message.fillContent'))
            return
        }
        try{
            let respData = await updateGrandCafe(this.mq_detail)
            this.$message.success($t('message.saveSuccess'))
            this.editVisible = false
            this.getGrandCafeList()
        }catch(e){
            this.$message.error(e.err)
        }
    },
    async deleteGrandCafes() {
        var that = this
        if(this.mq_ids.length > 10){
            this.$message.warning(this.$t('message.deletePaintsLimitInfo'))
            return
        }
        if(this.mq_ids.length === 0){
            this.$message.warning(this.$t('message.deleteDataInfo'))
            return
        }
        try{
            await this.$confirm(this.$t('message.deleteConfirm'), this.$t('message.prompt'), {
                confirmButtonText: this.$t('message.confirm'),
                cancelButtonText: this.$t('message.cancle'),
                type: 'warning',
                center: true
            })
            let respData = await deleteGrandCafe({mq_ids: that.mq_ids})
            that.$message.success(this.$t('message.deleteSuccess'))
            that.mq_ids = []
            this.getGrandCafeList()
        }catch(e){
            if (e != 'cancel') {this.$message.error(e.err)}
        }
    }
  },
  computed: {
    breadCrumbs : function(){
      return  [
          {
              title: this.$t('message.menuArtistsWords')
          }
      ]
    }
  },
  watch: {
      mq_list: function() {
          if(this.mq_list.length > 0){
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
     this.getGrandCafeList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
