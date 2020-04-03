<template>
  <div>
    <el-container>
  <el-aside width="200px">
<User/>
    <nuxt/>
  </el-aside>
  <el-main>
    <Table/>
    <nuxt/>
  </el-main>
</el-container>
    
  </div>


</template>

<script>
import User from "@/components/user/user.vue"
import Table from "@/components/user/table.vue"
export default {
  components:{
    User,
    Table
  }
  }
</script>

<style>

</style>