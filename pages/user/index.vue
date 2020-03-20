<template>
  <div>
    <el-container>
  <el-aside width="200px">
<User/>
    <nuxt/>
  </el-aside>
  <el-main>
    Main
  </el-main>
</el-container>
    
  </div>


</template>

<script>
import User from "@/components/user/user.vue"
export default {
  components:{
    User
  }
  }
</script>

<style>

</style>