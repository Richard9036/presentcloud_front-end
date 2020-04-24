<template>

<el-row class="tac">
   <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router="">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/authority/create">新增权限</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
<!-- 
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
            <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">编辑权限</span>
      </el-menu-item>
    </el-menu> -->
  
</el-row>

</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>

</style>