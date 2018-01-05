<template>
    <paint-list :paintList="painttList"></paint-list>
</template>

<script>
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
    
  },
  async created(){
    try{
      let painttListData = await getPaintList(1);
      if(painttListData.paint_arry.length > 0){
        this.painttList = painttListData.paint_arry
      }else{
        this.$message('没有数据！');
      }
    }catch(e){
      this.$message.error(e.error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
