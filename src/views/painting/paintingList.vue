<template>
    <div class="content">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb">
          <el-breadcrumb-item>画作</el-breadcrumb-item>
          <el-breadcrumb-item>画作列表</el-breadcrumb-item>
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
        <el-table stripe border ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'PaintList',
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        formInline: {
          id: '',
          name: '',
          startId: '',
          endId: ''
        },
        value6: '',
        value7: ''
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      onSubmit() {
      }
    }
  }
</script>
