<template>
  <div><el-container>
  <el-aside width="200px">
    <Class/>
    <nuxt/>
  </el-aside>
  <el-main>
    <Show/>>
    <nuxt/>
  </el-main>
</el-container>


  </div>

</template>

<script>
import Class from "@/components/class/class.vue"
import Show from "@/components/class/show.vue"
export default {
  components:{
    Class,
    Show
  }
  }
</script>

<style>

</style>