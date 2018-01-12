<template>
    <div>      
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {getAuthorPaintList} from '@/service/paintService.js'
export default {
  name: 'UploadExcel',
  data () {
    return {
    }
  },
  methods: {
    async getAuthorPaintList() {
      try{
        let respData = await getAuthorPaintList(1)
        console.log(respData)
      }catch(e){
        this.$message.error(e.err)
      }
    }
  },
  created(){
      this.$store.commit(types.SET_BREADCRUMBS, [
        {
            title: '作者画单列表'
        }]
      )
      this.getAuthorPaintList()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
