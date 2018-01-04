<template>
    <div class="content">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb">
        <el-breadcrumb-item>上传</el-breadcrumb-item>
        <el-breadcrumb-item>上传Excel</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-upload class="upload-demo" drag action="/api/img/upload/capsule" multiple :on-success="uploadSuccess" :on-remove="removeAction" :before-upload="beforeAvatarUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xlsx文件</div>
        </el-upload>
      </el-card>
    </div>
</template>

<script>
export default {
  name: 'UploadExcel',
  data () {
    return {
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    }
  },
  methods: {
    uploadSuccess: function (response, file, fileList) {
      console.log(response)
    },
    removeAction: function(){
      var tableData = this.tableData;
      tableData.shift()
    },
    beforeAvatarUpload: function(file){
      const isXLSX = file.name.endsWith('xlsx') || file.name.endsWith('xls')
      if (!isXLSX) {
        this.$message.error('上传文件只能是 xlsx 格式!');
      }
      return isXLSX;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
