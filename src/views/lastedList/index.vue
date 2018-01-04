<template>
    <div class="content">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb">
        <el-breadcrumb-item>最新</el-breadcrumb-item>
        <el-breadcrumb-item>最新列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
          <div slot="header">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="编号">
                    <el-input v-model="formInline.id" placeholder="编号"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="formInline.name" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="编号号段" style="text-align: center">
                    <el-col :span="11">
                        <el-input v-model="formInline.startId" placeholder="开始编号"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-input v-model="formInline.endId" placeholder="结束编号"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="上传时间">
                <div style="display:inline-block">
                    <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table stripe border ref="multipleTable" :data="lastedList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="封面" width="220">
               <template slot-scope="scope">
                   <img :src="scope.row.title_url" style="width: 200px;height: auto"/>
                </template>
            </el-table-column>
            <el-table-column prop="paint_id" label="编号" width="120"></el-table-column>
            <el-table-column prop="paint_title" label="标题" width="120"></el-table-column>
            <el-table-column prop="read_num" label="阅读数量" width="120"></el-table-column>
            <el-table-column prop="collect_num" label="收藏数量" width="120"></el-table-column>
            <el-table-column prop="picture_num" label="作品张数" width="120"></el-table-column>
            <el-table-column prop="flag" label="是否在首页中展示" width="120">
                <template slot-scope="scope">
                   <span>{{scope.row.flag ? scope.row.flag === 1 ? '是' : '不是' : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="flag" label="操作" show-overflow-tooltip>
                <template  slot-scope="scope">
                    <router-link :to="'/lastedDetail/' + scope.row.paint_id">
                        <el-button>查看详情</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      </el-card>
    </div>
</template>

<script>
import {getLastedList} from '@/service/getPaintList.js'
export default {
  name: 'LastedList',
  data () {
    return {
        lastedList: [],
        multipleSelection: [],
        formInline: {
          id: '',
          name: '',
          startId: '',
          endId: ''
        },
        value7: ''
    }
  },
  methods: {
    handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val;
    },
    test(id){
        this.$router.push({path: '/lastedDetail?paintId='+id});
    },
    onSubmit() {

    }
  },
  async created(){
    try{
      let lastedListData = await getLastedList();
      if(lastedListData.paint_arry.length > 0){
        this.lastedList = lastedListData.paint_arry
      }else{
        this.$message('没有数据！');
      }
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
