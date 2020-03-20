<template>
  <div><el-container>
  <el-aside width="200px">
    <Data/>
    <nuxt/>
  </el-aside>
  <el-main>
    Main
  </el-main>
</el-container>


  </div>


</template>

<script>
import Data from "@/components/data/data.vue"
export default {
  components:{
    Data
  }
  }
</script>

<style>

</style>