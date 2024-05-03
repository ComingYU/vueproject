<template>
  <el-container style="height: 100vh;">
    <el-aside :width="sideWidth+'px'" style="background-color: rgb(238, 241, 246);height: 100%">
      <Aside :isCollapse="isCollapse" :logotextshow="logotextshow"/>
    </el-aside>

    <el-container>

      <el-header style="border-bottom: 1px solid #ccc;">
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse"/>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'


export default {
  name: 'Manage',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      logotextshow: true,
      headerBg:'headerBg',
      sideWidth:200,
    }
  },
  components:{
    Aside,
    Header,
  },
  methods: {

    collapse() {
      this.isCollapse = !this.isCollapse;
      if(this.isCollapse){
        this.collapseBtnClass = 'el-icon-s-unfold';
        this.sideWidth=64;
        this.logotextshow = false;
      }
      else {
        this.collapseBtnClass = 'el-icon-s-fold';
        this.sideWidth=200;
        this.logotextshow = true;
      }
    },

  }

}
</script>

<style>
.headerBg {
  background-color: #eee!important;
}
</style>