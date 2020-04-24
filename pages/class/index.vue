<template>
  <div><el-container>
  <el-aside width="200px">
    <Class/>
    <nuxt/>
  </el-aside>
  <el-main>
      <el-card> <Table/></el-card>
   
    <nuxt/>
  </el-main>
</el-container>


  </div>


</template>

<script>
import Class from "@/components/class/class.vue"
import Table from "@/components/class/table.vue"
export default {
  components:{
    Class,
    Table
  }
  }
</script>

<style>

</style>