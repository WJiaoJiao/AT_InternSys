<template>
    <div class="content">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb">
        <el-breadcrumb-item>最新</el-breadcrumb-item>
        <el-breadcrumb-item to="/lastedList">最新列表</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-form ref="form" :model="paintDetail" label-width="100px">
            <el-form-item label="编号">
                <el-input v-model="paintDetail.paint_id"></el-input>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="paintDetail.paint_title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="paintDetail.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="详细描述">
                <el-input v-model="paintDetail.paint_detail"></el-input>
            </el-form-item>
            <el-form-item label="浏览数量">
                <el-input v-model="paintDetail.read_num"></el-input>
            </el-form-item>
            <el-form-item label="收藏数量">
                <el-input v-model="paintDetail.collect_num"></el-input>
            </el-form-item>
            <el-form-item label="封面原图">
                <el-input v-model="paintDetail.title_detail_url"></el-input>
            </el-form-item>
            <el-form-item label="封面缩约图">
                <el-input v-model="paintDetail.title_url"></el-input>
            </el-form-item>
            <el-form-item label="作品数量">
                <el-input v-model="paintDetail.picture_num"></el-input>
            </el-form-item>
            <el-form-item label="是否收藏">
                <el-input v-model="paintDetail.flag"></el-input>
            </el-form-item>
            <el-form-item label="画作信息">
                <el-input v-model="paintDetail.flag"></el-input>
            </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
import {getPaintDetail} from '@/service/getPaintList.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      paintDetail: {}
    }
  },
  methods: {
    onSubmit() {
        console.log('submit!');
      }
  },
  async created(){
    console.log(this.$route.params.paintId)
    try{
        let paintDetailData = await getPaintDetail(this.$route.params.paintId)
        this.paintDetail = paintDetailData.paint_detail
        console.log(paintDetailData.paint_detail)
    }catch(e){
        console.log(e)
        this.$message.error(e.error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
