<template>
  <div><el-container>
  <el-aside width="200px">
    <About/>
    <nuxt/>
  </el-aside>
  <el-main>
    Main
  </el-main>
</el-container>

  </div>


</template>

<script>
import About from "@/components/about/about.vue"
export default {
  components:{
    About
  }
  }
</script>

<style>

</style>