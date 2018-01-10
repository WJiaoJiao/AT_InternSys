<template>
    <paint-list :paintList="painttList" :isSearch="false" type="3" @setSuccess="setSuccess"></paint-list>
</template>

<script>
import * as types from '@/store/types'
import PaintList from '@/components/PaintList.vue'
import {getPaintList} from '@/service/paintService.js'
export default {
  name: 'hottestList',
  components:{
    'paint-list': PaintList
  },
  data () {
    return {
      painttList: []
    }
  },
  methods: {
    async getPaintList() {
      try{
        let painttListData = await getPaintList(3);
        if(painttListData.paint_arry.length > 0){
          this.painttList = painttListData.paint_arry
        }else{
          this.$message('没有数据！');
        }
      }catch(e){
        this.$message.error(e.err);
      }
    },
    setSuccess() {
      this.getPaintList()
    }
  },
  async created(){
    this.$store.commit(types.SET_BREADCRUMBS, [
      {
        title: '画单分类'
      },
      {
        to: {
          path: '/hottestList'
        },
        title: '最热列表'
      }
    ])
    this.getPaintList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
