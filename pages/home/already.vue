<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Home />
        <nuxt />
      </el-aside>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>软件工程</span>
          </div>
          <el-row>
            <el-col :span="4">
              <div>教师</div>
            </el-col>
            <el-col :span="8">
              <div>开课时间</div>
            </el-col>
            <el-col :span="8">
              <div>结束时间</div>
            </el-col>
            <el-col :span="4">
              <div>课程类别</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div>xxx</div>
            </el-col>
            <el-col :span="8">
              <div>2020-2-2</div>
            </el-col>
            <el-col :span="8">
              <div>2020-2-2</div>
            </el-col>
            <el-col :span="4">
              <div>专业课</div>
            </el-col>
          </el-row>
          <div class="detail">
            <span>详情</span>
            <span>删除</span>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Home from "@/components/home/home.vue";
export default {
  components: {
    Home
  }
};
</script>

<style>
.detail {
  position: absolute;
  bottom: 0px;
  right: 0px;
  transform: translate(-50%, -50%);
  color: blue;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  height: 180px !important;
  position: relative;
}
</style>