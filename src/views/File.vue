<template>
<div>
  <div style="margin:10px 0">
    <el-input type="text" style="width: 200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
    <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
    <el-button type="warning" @click="reset">重置</el-button>
  </div>
  <div style="margin:10px 0">
    <el-upload action="http://localhost:8082/file/upload" :show-file-list="false" :on-success="handleFileUploadSuccess" style="display:inline">
      <el-button type="primary">上传文件<i class="el-icon-upload"></i></el-button>
    </el-upload>
    <el-popconfirm
        class="ml-5"
        confirm-button-text='确定'
        cancel-button-text='取消'
        icon="el-icon-info"
        icon-color="red"
        title="确定删除这些数据吗？"
        @confirm="delBatch"
    >
      <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
    </el-popconfirm>
  </div>


  <el-table :data="tableData" border stripe:header-cell-class-name="headerBg" @selection-change="handleSeletionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="id" width="120"></el-table-column>
    <el-table-column prop="name" label="书名"></el-table-column>
    <el-table-column prop="type" label="文件类型" width="120"></el-table-column>
    <el-table-column prop="size" label="文件大小(KB)" ></el-table-column>
    <el-table-column label="下载">
      <template slot-scope="scope">
      <el-button type="primary" @click="download(scope.row.url)">下载</el-button>
      </template>
    </el-table-column>
    <el-table-column label="图片预览">
      <template slot-scope="scope">
      <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.url"
          :preview-src-list="[scope.row.url]">
      </el-image>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-popconfirm
            confirm-button-text='确定'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除这条信息吗？"
            @confirm="del(scope.row.id)"
        >
          <el-button type="danger" slot="reference" class="ml-5">删除<i class="el-icon-remove-outline"></i></el-button>
        </el-popconfirm>

      </template>
    </el-table-column>
  </el-table>
  <div style="padding: 10px">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>

</div>

</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "File",
  data(){
    return{
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
      ],
      tableData:[],
      name:"",
      multipleSelection:[],
      pageNum:1,
      pageSize:10,
      total:0,
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      this.request.get("/file/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
        }
      }).then(res=>{
        this.tableData = res.data.records;
        this.total = res.data.total;
      }).catch(err=>{
        console.log(err)
      })

    },
    reset(){
      this.name = "";
      this.load();
    },
    handleSizeChange(pageSize){
      this.pageSize= pageSize;
      this.load();
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum;
      this.load();
    },
    del(id){
      this.request.delete("/file/"+id).then(res=>{
        if(res.code=="200"){
          this.$message.success("删除成功")
          this.load()
        }
        else{
          this.$message.error("删除失败")
        }
      })
    },
    handleSeletionChange(val){
      console.log(val)
      this.multipleSelection= val
    },
    delBatch(){
      let ids=this.multipleSelection.map(v=>v.id)
      this.request.post("/file/del/batch",ids).then(res=>{
        if(res){
          this.$message.success("批量删除成功")
          this.load()
        }
        else{
          this.$message.error("批量删除失败")
        }
      })
    },
    handleFileUploadSuccess(res){
      console.log(res)
    },
    download(url){
      window.open(url)
    },
  }

})
</script>


<style scoped>

</style>