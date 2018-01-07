<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(breadcrumb,index) in breadcrumbs" :key="index" v-bind="breadcrumb">{{breadcrumb.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapState } from 'vuex'
import * as types from '@/store/types'
export default {
  computed: {
    ...mapState({
      breadcrumbs: state => state.common.breadcrumbs
    })
  },
  watch: {
    breadcrumbs () {
      console.log(this.breadcrumbs)
    }
  }
}
</script>
