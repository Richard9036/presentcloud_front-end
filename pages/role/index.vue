<template>
  <div>
    <el-container>
  <el-aside width="200px">
    <Role/>
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
import Role from "@/components/role/role.vue"
import Table from "@/components/role/table.vue"

export default {
  components:{
    Role,
    Table
  }


      

}

</script>

<style>

</style>