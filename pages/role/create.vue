<template>
  <div>
    <el-container>
  <el-aside width="200px">
    <Role/>
    <nuxt/>
  </el-aside>
  <el-main>
    Main
  </el-main>
</el-container>

  </div>


</template>

<script>
import Role from "@/components/role/role.vue"
export default {
  components:{
    Role
  }
  }
</script>

<style>

</style>