<template>
  <div>
    <el-container>
      <el-main>
        <!-- 卡片视图 -->
        <el-card>
          <img class="img" id="logo_img" src="@/components/logo.png" />
          <br />
          <el-row :gutter="1">
            <el-col :span="6">
              <div class="grid-content bg-purple" style="color:#303133">
                <i class="iconfont icon-user"></i>姓名：
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple" style="color:#909399">{{userInfo.name}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <i class="iconfont icon-users"></i>性别：
              </div>
            </el-col>
            <el-col :span="17">
              <div class="grid-content bg-purple" style="color:#909399">{{userInfo.sex}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <i class="el-icon-info"></i>ID：
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple" style="color:#909399">{{userInfo.userId}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <i class="el-icon-menu"></i>手机：
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple" style="color:#909399">{{userInfo.tel}}</div>
            </el-col>
          </el-row>
          <br />
          <!-- <div style="text-align:center"> -->
            <!-- <el-button type="primary" icon="el-icon-edit"> -->
              <!-- <nuxt-link to="/info/edit">修改信息</nuxt-link> -->
            <!-- </el-button> -->
          <!-- </div> -->
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.$axios.get("/user/getCurrentUserApi");
      console.log(res);
      if (res.code != 200) {
        MessageBox("提示", "获取用户列表失败");
      } else {
        this.userInfo = res.data;
        console.log(this.userInfo);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-card {
  width: 360px;
  height: 400px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 18px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
#logo_img {
  width: 100px;
  height: 100px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 100px;
}
</style>