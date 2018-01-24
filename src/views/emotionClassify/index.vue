<template>
    <div class="content">
      <el-card>
        <el-table stripe border :data="paints" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="paint_id" label="画单ID" width="100"></el-table-column>
            <el-table-column prop="paint_name" label="标题"></el-table-column>
            <el-table-column prop="paint_id" label="操作" show-overflow-tooltip width="100">
                <template  slot-scope="scope">
                    <el-button type="primary" plain @click="showDetail(scope.row.paint_id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {getMoodHome} from '@/service/paintService.js'
export default {
  data () {
    return {
      paints: [],
      activeNames: ['11']
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
  },
  async created(){
    this.$store.commit(types.SET_BREADCRUMBS, [
        {
          title: '分类'
        },
        {
          to: {
            path: '/emotionClassify'
          },
          title: '心情'
        }
      ]
    )
    try{
      let respData = await getMoodHome();
      if(respData.paints && respData.paints.length > 0){
        this.paints = respData.paints
      }else{
        this.$message('没有数据！');
      }
    }catch(e){
      this.$message.error(e.err);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
