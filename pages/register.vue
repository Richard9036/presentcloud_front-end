<template>
  <div class="card">
    <nuxt />
    <img class="img" id="logo_img" src="@/assets/login/logo.png" />

    <el-form :model="registerForm" :rules="registerFormRules" label-width="0px" class="login_form">
      <el-form-item prop="username">
        <el-input
          prefix-icon="iconfont icon-3702mima"
          placeholder="请输入用户名"
          v-model="registerForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="iconfont icon-3702mima"
          placeholder="请输入密码"
          v-model="registerForm.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="telephoneNumber">
        <el-input
          v-model="registerForm.telephoneNumber"
          prefix-icon="el-icon-mobile-phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkNumber">
        <el-input
          v-model="registerForm.checkNumber"
          prefix-icon="el-icon-message"
          type="number"
          placeholder="请输入验证码"
          style="width:69%"
          class="deal"
        ></el-input>
        <el-button type="success">发送验证码</el-button>
      </el-form-item>
      <el-form-item class="login_button">
        <el-button type="primary">注册</el-button>
        <nuxt-link :to="{path:'/login'}">
          <el-button type="primary">返回登陆页面</el-button>
        </nuxt-link>
      </el-form-item>
    </el-form>
    <!-- 版权声明 -->
    <div class="bottom">
      <span class="style4"></span>
      <span an class="style4"></span>
      <span class="style4">Copyright© 计算机技术第25小组出品</span>
      <br />
      <span class="style4">福州大学数学与计算机学院</span>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  layout: "custom",
  data() {
    return {
      activeIndex: "1",
      registerForm: {
        username: "",
        password: "",
        telephoneNumber: "",
        checkNumber: ""
      },
      registerFormRules: {
        //验证密码是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度为 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度为 6 到 15 个字符",
            trigger: "blur"
          }
        ],
        telephoneNumber: [
          { required: true, message: "请输入11位手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "手机号长度应为11个字符",
            trigger: "blur"
          }
        ],
        checkNumber: [
          { required: true, message: "请输入6位验证码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码长度应为 6个字符", trigger: "blur" }
        ]
      }
    };
  },
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
#logo_img {
  border-width: 0px;
  width: 313px;
  height: 89px;
  position: absolute;
  left: 50%;
  top: 13%;
  transform: translate(-50%);
}
.login_form {
  width: 20%;
}
.login_button {
  display: flex;
  justify-content: center;
}
.el-menu {
  border: 0px;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-menu-item {
  font-family: "Microsoft YaHei", sans-serif;
  font-weight: 500;
  font-size: 100%;
  color: #606266;
}
.el-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.bottom {
  position: absolute;
  right: 0px;
  bottom: 0px;
  background: transparent;
  color: black;
  display: block;
  width: 100%;
  text-align: center;
  z-index: 10;
}
.bottom span {
  position: relative;
  display: block;
  left: 0;
}
</style>