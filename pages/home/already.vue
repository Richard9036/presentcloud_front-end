<template>
  <div>
    <el-container>
  <el-aside width="200px">
    <Home/>
    <nuxt/>
  </el-aside>
  <el-main>
    Main
  </el-main>
</el-container>

  </div>


</template>

<script>
import Home from "@/components/home/home.vue"
export default {
  components:{
    Home
  }
  }
</script>

<style>

</style>