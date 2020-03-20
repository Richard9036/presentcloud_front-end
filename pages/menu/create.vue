<template>
  <div><el-container>
  <el-aside width="200px">
   <Menu/>
    <nuxt/>
  </el-aside>
  <el-main>
    Main
  </el-main>
</el-container>


  </div>


</template>

<script>
import Menu from "@/components/menu/menu.vue"
export default {
  components:{
    Menu
  }
  }
</script>

<style>

</style>