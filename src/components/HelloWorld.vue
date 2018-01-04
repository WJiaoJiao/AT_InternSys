<template>
    <div class="content">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb">
        <el-breadcrumb-item>最新</el-breadcrumb-item>
        <el-breadcrumb-item>最新列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
    
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  async created(){
    // try{
    //   let test = await getLastedList();
    //   console.log(test)
    // }catch(e){
    //   console.log(e)
    //   this.$message.error(e.error);
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
