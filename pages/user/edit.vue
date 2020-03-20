<template>
  <div>
    <el-container>
  <el-aside width="200px">
<Edit/>
    <nuxt/>
  </el-aside>
  <el-main>
    Main
  </el-main>
</el-container>
    
  </div>


</template>

<script>
import Edit from "@/components/user/edit.vue"
export default {
  components:{
    Edit
  }
  }
</script>

<style>

</style>