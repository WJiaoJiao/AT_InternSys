<template>
    <paint-list :paintList="painttList" :isSearch="false" type="4" @setSuccess="setSuccess"></paint-list>
</template>

<script>
import * as types from '@/store/types'
import PaintList from '@/components/PaintList.vue'
import {getPaintList} from '@/service/paintService.js'
export default {
  name: 'artList',
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
        let painttListData = await getPaintList(4);
      if(painttListData.paint_arry.length > 0){
        this.painttList = painttListData.paint_arry
      }else{
        this.$message(this.$t('message.noData'));
      }
      }catch(e){
        this.$message.error(e.err);
      }
    },
    setSuccess() {
      this.getPaintList()
    }
  },
  computed: {
    breadCrumbs : function(){
      return  [
        {
          title: this.$t('message.menuRecommend')
        },
        {
          to: {
            path: '/artList'
          },
          title: this.$t('message.menuArtVanBanner')
        }
      ]
    }
  },
  watch: {
    breadCrumbs: function (newValue, oldValue) {
      this.$store.commit(types.SET_BREADCRUMBS, newValue)
    }
  },
  created() {
     this.$store.commit(types.SET_BREADCRUMBS, this.breadCrumbs)
     this.getPaintList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
