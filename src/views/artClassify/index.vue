<template>
    <div class="content">
      <el-card>
        <div slot="header">
          <el-collapse v-model="activeNames" accordion>
            <el-collapse-item :title="art.type_name" :name="art.type_id" v-for="art in artList" :key="art.type_id">
              <el-table stripe border :data="art.paints" tooltip-effect="dark" style="width: 100%">
                <el-table-column label="封面" width="220">
                    <template slot-scope="scope">
                        <img :src="scope.row.img_url" style="width: 200px;height: auto"/>
                    </template>
                </el-table-column>
                <el-table-column prop="paint_id" label="画单ID" width="100"></el-table-column>
                <el-table-column prop="paint_name" label="标题"></el-table-column>
                <el-table-column prop="flag" label="操作" show-overflow-tooltip width="100">
                    <template  slot-scope="scope">
                        <el-button type="primary" plain @click="showDetail(scope.row.paint_id)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {getArtHome} from '@/service/paintService.js'
export default {
  data () {
    return {
      artList: [],
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
            path: '/artClassify'
          },
          title: '艺术'
        }
      ]
    )
    try{
      let respData = await getArtHome();
      if(respData.art_home_page && respData.art_home_page.length > 0){
        this.artList = respData.art_home_page
        console.log(this.artList)
      }else{
        this.$message('没有数据！');
      }
    }catch(e){
      console.log(e)
      this.$message.error(e.err);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
