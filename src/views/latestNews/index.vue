<template>
    <div class="content">
      <el-card>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item :label="$t('message.paint')+'ID'">
                <el-input v-model="formInline.paint_id" :placeholder="$t('message.paint')+'ID'"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{$t('message.setUp')}}</el-button>
            </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
import * as types from '@/store/types'
import {setNewPaint} from '@/service/paintService.js'
export default {
  data () {
    return {
      formInline: {}
    }
  },
  methods: {
    async onSubmit() {
        if(!this.formInline.paint_id){
            this.$message.warning(this.$t('message.setPaintInfo'))
            return
        }
        try{
            let respData = await setNewPaint({paint_id: Number(this.formInline.paint_id)})
            this.$message.success(this.$t('message.setUpSuccess'))
            this.formInline = {}
        }catch(e){
            this.$message.error(e.err)
        }
    }
  },
  computed: {
    breadCrumbs : function(){
      return  [
        {
            title: this.$t('message.menuLastestNews')
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
