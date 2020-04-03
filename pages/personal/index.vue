<template>
  <div>
    <el-container>
  <el-aside width="200px">
    <Personal/>
    <nuxt/>
  </el-aside>
  <el-main>
    <nuxt/>
  </el-main>
</el-container>

  </div>


</template>

<script>
import Personal from "@/components/personal/personal.vue"

export default {
  components:{
    Personal
  }
  }
</script>

<style>

</style>