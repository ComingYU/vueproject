<template>
<div>
  <div style="margin:10px 0">
    <el-input type="text" style="width: 200px" placeholder="请输入名字" suffix-icon="el-icon-search" v-model="username"></el-input>
    <el-input type="text" style="width: 200px" placeholder="请输入电话" suffix-icon="el-icon-phone" v-model="phone"></el-input>
    <el-input type="text" style="width: 200px" placeholder="请输入地址" suffix-icon="el-icon-position" v-model="address"></el-input>
    <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
    <el-button type="warning" @click="reset">重置</el-button>
  </div>

  <div style="margin:10px 0">
    <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
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
    <el-table-column prop="username" label="用户名" width="140"></el-table-column>
    <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
    <el-table-column prop="email" label="邮箱" ></el-table-column>
    <el-table-column prop="phone" label="电话"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
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
  <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
    <el-form label-width="80px" size="small">
      <el-form-item label="用户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>

import {defineComponent} from 'vue'

export default defineComponent({
  name: "User",
  data(){
    return{
      tableData:[],
      total: 0,
      username:"",
      email:"",
      phone:"",
      address:"",
      id:"",
      dialogFormVisible: false,
      form:{},
      multipleSelection: [],
      headerBg:'headerBg',
      pageNum:1,
      pageSize:10,
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      this.request.get("/user/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          username:this.username,
          phone:this.phone,
          email:this.email,
          address:this.address,
          id:this.id,
        }
      }).then(res=>{
        this.tableData = res.data.records;
        this.total = res.data.total;
      }).catch(err=>{
        console.log(err)
      })

    },
    reset(){
      this.id="";
      this.username = "";
      this.phone = "";
      this.address = "";
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
    handleAdd(){
      this.dialogFormVisible=true;
      this.form={};
    },
    save(){
      this.request.post("/user",this.form).then(res=>{
        if(res.data){
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load()
        }
        else{
          this.$message.error("保存失败")
        }
      })
    },
    handleEdit(Row){
      this.form=Row
      this.dialogFormVisible = true
    },
    del(id){
      this.request.delete("/user/"+id).then(res=>{
        if(res.data){
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
      this.request.post("/user/del/batch",ids).then(res=>{
        if(res){
          this.$message.success("批量删除成功")
          this.load()
        }
        else{
          this.$message.error("批量删除失败")
        }
      })
    },
  }
})
</script>

<style scoped>
.headerBg {
  background-color: #eee!important;
}
</style>