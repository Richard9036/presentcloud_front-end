<template>
  <div>
    <el-container>
      <!-- <el-aside width="200px">
        <Home />
        <nuxt />
      </el-aside>-->
      <el-main>
        <HomeMain />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Home from "@/components/home/home.vue";
import HomeMain from "@/components/home/home_main.vue";
export default {
  components: {
    Home,
    HomeMain
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  }
};
</script>

<style>
</style>