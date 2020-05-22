<template>
  <div>
    <div class="head">欢迎光临云班课后台管理系统</div>
    <!-- <el-row>
  <el-col :span="12"><div class="grid-content bg-purple-light">我的班课</div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light"><time class="time">{{ currentDate }}</time></div></el-col>
    </el-row>-->
    <el-card >
      <el-calendar v-model="value"></el-calendar>
      <!-- <div slot="header" class="clearfix">
    <span>软件工程</span>
    <el-button style="float: right; padding: 3px 0" type="text">查看详情</el-button>
  </div>
  <div  class="text item">
    班级id：190327000
      </div>-->
    </el-card>
  </div>
</template>

<style>
.time {
  font-size: 13px;
  color: #999;
}
.head {
  font-size: 20px;
  color: #409eff;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
  height: 240px;
}
</style>

<script>
export default {
  data() {
    return {
      value: new Date()
    };
  }
};
</script>