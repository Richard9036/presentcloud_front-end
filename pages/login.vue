<template>
  <div class="card">
    <nuxt />
    <img class="img" id="logo_img" src="@/assets/login/logo.png" />
    <span id="logo_text" class="text">后台管理系统</span>
    <el-menu
      mode="horizontal"
      background-color="transparent"
      active-text-color="blue"
    >

    </el-menu>
    <!-- 账号登陆 -->
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginFormRules"
      label-width="0px"
      class="login_form"
    >
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          prefix-icon="iconfont icon-user"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          prefix-icon="iconfont icon-3702mima"
          type="password"
          placeholder="请输入密码"
        ></el-input>
        <nuxt-link :to="{path:'/forgot_password'}">
          <p class="forgot">忘记密码？</p>
        </nuxt-link>
      </el-form-item>
      <el-form-item class="login_button">
        <el-button type="primary" @click="login">提交</el-button>
        <!-- <nuxt-link :to="{path:'/register'}">
          <el-button type="primary">注册</el-button>
        </nuxt-link> -->
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
import Cookie from 'js-cookie'
export default {
  layout: "custom",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "用户名长度为 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 150,
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
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          var qs = require('qs');
          const { data: res } = await this.$axios.post("/login", qs.stringify(this.loginForm));
          console.log(res);
          if (res.code !== 0) {
            this.$message({
              message: res.meta.msg,
              type: "error"
            });
          } else {
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            
            // window.sessionStorage.setItem("token", res.token);
            // this.$cookies.set("sid", res.token)
            console.log(this.$cookies.get('sid'))
            this.$router.push("/");
          }
        }
      });
    }
  }
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
  left: 35%;
  top: 13%;
}

#logo_text {
  border-width: 0px;
  word-wrap: break-word;
  font-family: "Microsoft Tai Le", sans-serif;
  font-weight: 400;
  font-size: 300%;
  color: #4a4a4a;
  text-transform: none;
  position: absolute;
  left: 52%;
  top: 17%;
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
.forgot {
  color: #2e8b57;
  font-size: 17px;
}
</style>