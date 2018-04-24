<template>
    <div class="content">
      <el-card>
        <el-table stripe border :data="paints" tooltip-effect="dark" style="width: 100%" :empty-text="$t('message.noData')">
            <el-table-column prop="paint_id" :label="$t('message.paint')+'ID'" width="100"></el-table-column>
            <el-table-column prop="paint_name" :label="$t('message.title')"></el-table-column>
            <el-table-column prop="paint_id" :label="$t('message.operate')" show-overflow-tooltip width="100">
                <template  slot-scope="scope">
                    <el-button type="primary" plain @click="showDetail(scope.row.paint_id)">{{$t('message.details')}}</el-button>
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
      breads.push({title: this.$t('message.detail')})
      this.$store.commit(types.SET_BREADCRUMBS, breads)
      let type = document.location.hash.split('/')[1];
      this.$router.push({path: `/paintDetail/${type}/${id}`})
    },
  },
  computed: {
    breadCrumbs : function(){
      return  [
        {
          title: this.$t('message.menuClassification')
        },
        {
          to: {
            path: '/emotionClassify'
          },
          title: this.$t('message.menuEmotion')
        }
      ]
    }
  },
  watch: {
    breadCrumbs: function (newValue, oldValue) {
      this.$store.commit(types.SET_BREADCRUMBS, newValue)
    }
  },
  async created(){
    this.$store.commit(types.SET_BREADCRUMBS, this.breadCrumbs)
    try{
      let respData = await getMoodHome();
      if(respData.paints && respData.paints.length > 0){
        this.paints = respData.paints
      }else{
        this.$message(this.$t('message.noData'));
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
