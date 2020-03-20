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
          <span>数据管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><nuxt-link to='/data/create'>数据字典录入</nuxt-link></el-menu-item>
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

</style>