<template>
  <div style="font-size: 20px;line-height: 60px;display:flex">
  <div style="flex:1;font-size:20px">
    <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
    <el-breadcrumb separator="/" style="display: inline-block;margin-left: 10px">
      <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-dropdown style="width: 100px;cursor:pointer">
    <div style="display: inline-block">
    <img :src="user.avatarUrl" alt=""
         style="width: 40px;border-radius:50%;position:relative;top:10px;right:5px">
    <span >{{user.username}}</span><i class="el-icon-arrow-down" style="margin-left: 8px"></i>
    </div>
    <el-dropdown-menu slot="dropdown" style="width:100px;text-align: center">
      <el-dropdown-item style="font-size:14px;padding:5px 0">
        <router-link to="/userProfile" style="text-decoration: none;color:black" >个人信息</router-link>
      </el-dropdown-item>
      <el-dropdown-item style="font-size: 14px;padding:5px 0">
        <span style="text-decoration: none" @click="logout">退出</span>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Header",
  data(){
    return{
      user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{}
    }
  },
  props:{
    collapseBtnClass: String,
    collapse:Function,
  },
  computed:{
    currentPathName(){
      return this.$store.state.currentPathName;//需要监听的数据
    }
  },
  watch:{
    currentPathName(newVal){
      console.log(newVal)
    }
  },
  methods:{
    logout(){
      localStorage.removeItem("user")
      this.$router.push("/login")
      this.$message.success("退出成功")
    }
  }
})
</script>



<style scoped>

</style>