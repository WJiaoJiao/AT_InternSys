<template>
    <paint-list :paintList="paintList" :isSearch="true" @setData="setData" type="normal"></paint-list>
</template>

<script>
import * as types from '@/store/types'
import PaintList from '@/components/PaintList.vue'
import {getPaintList} from '@/service/paintService.js'
export default {
  name: 'normalList',
  components:{
    'paint-list': PaintList
  },
  data () {
    return {
      paintList: []
    }
  },
  methods: {
      setData(data) {
          if(data.type == 'search'){
            this.paintList = data.paintList
          }else{
            this.paintList = this.paintList.concat(data.paintList)
          }
      }
  },
  computed: {
    breadCrumbs : function(){
      return [{
        to: {
          path: '/normalList'
        },
         title: this.$t('message.menuOrdinaryPainting')
      }]
    }
  },
  watch: {
    breadCrumbs: function (newValue, oldValue) {
      this.$store.commit(types.SET_BREADCRUMBS, newValue)
    }
  },
  created: function(){
     this.$store.commit(types.SET_BREADCRUMBS, this.breadCrumbs)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
