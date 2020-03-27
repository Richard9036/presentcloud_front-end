<template>
  <div class="card">
    <p class="page-container">500</p>
    <p class="page-container">服务器内部错误</p>
  </div>
</template>
<script>
export default {
  layout: "custom"
};
</script>
<style lang="less" scoped>
.card {
  background: url("~@/assets/login/background.jpg") center center no-repeat;
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
.page-container {
  font-size: 100px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  text-align: center;
  color: #606266;
}
</style>