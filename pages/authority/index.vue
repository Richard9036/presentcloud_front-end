<template>
  <div><el-container>
  <el-aside width="200px">
    <Authority/>
    <nuxt/>
  </el-aside>
  <el-main>
    Main
  </el-main>
</el-container>


  </div>


</template>

<script>
import Authority from "@/components/authority/authority.vue"
export default {
  components:{
    Authority
  }
  }
</script>

<style>

</style>