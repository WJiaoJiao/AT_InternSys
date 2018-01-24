<template>
    <div class="content">
      <el-card>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="画单ID">
                <el-input v-model="formInline.paint_id" placeholder="画单ID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">设置</el-button>
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
            this.$message.warning('请填写所要设置的画单ID！')
            return
        }
        try{
            let respData = await setNewPaint({paint_id: Number(this.formInline.paint_id)})
            this.$message.success('设置成功！')
            this.formInline = {}
        }catch(e){
            this.$message.error(e.err)
        }
    }
  },
  async created(){
    this.$store.commit(types.SET_BREADCRUMBS, [
        {
          title: '最新资讯'
        }
      ]
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
