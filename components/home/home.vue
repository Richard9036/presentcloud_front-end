<template>

<el-row class="tac">
  
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><nuxt-link to='/home/create'>创建班课</nuxt-link></el-menu-item>
          <el-menu-item index="1-2"><nuxt-link to='/home/join'>加入班课</nuxt-link></el-menu-item>
          <el-menu-item index="1-3"><nuxt-link to='/home/already'>已加入班课</nuxt-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  
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
.el-menu {
      border-right: 0;
    }
</style>