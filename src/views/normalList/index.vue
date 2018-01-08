<template>
    <paint-list :paintList="paintList" :isSearch="true" @setData="setData"></paint-list>
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
      setData(paintList) {
          this.paintList = paintList
      }
  },
  created(){
    this.$store.commit(types.SET_BREADCRUMBS, [{
      to: {
        path: '/normalList'
      },
      title: '普通画单列表'
    }])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
