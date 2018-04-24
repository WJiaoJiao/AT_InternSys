<template>
    <div>      
      <paint-list :paintList="paintList" :isSearch="false" @setData="setData" type="author" :lastId="last_id" @loadmore="getAuthorPaintList"></paint-list>
    </div>
</template>

<script>
import * as types from '@/store/types'
import PaintList from '@/components/PaintList.vue'
import {getAuthorPaintList} from '@/service/paintService.js'
export default {
  components:{
    'paint-list': PaintList
  },
  data () {
    return {
      last_id: '',
      paintList: [],
      hasLastId: false
    }
  },
  methods: {
    async getAuthorPaintList() {
      let data = {}
      if(this.last_id){
        data.last_id = this.last_id
      }
      try{
        let respData = await getAuthorPaintList(data)
        if(respData.paint_list && respData.paint_list.length > 0){
          this.paintList = this.paintList.concat(respData.paint_list)
          if(respData.last_id){
            this.last_id = respData.last_id
          }else{
            this.last_id = ''
          }
        }else{
          this.$message(this.$t('message.noData'))
        }
      }catch(e){
        this.$message.error(e.err)
      }
    },
    setData () {

    }
  },
  computed: {
    breadCrumbs : function(){
      return  [
        {
            title: this.$t('message.menuAuthorPainting')
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
     this.getAuthorPaintList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
