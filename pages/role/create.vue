<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Role />
        <nuxt />
      </el-aside>
      <el-main>
        <el-col :span="10" class="create">
          <el-form :model="roleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名">
              <el-input v-model="roleForm.role"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addUser">立即创建</el-button>
              <el-button @click="resetForm('roleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
const cityOptions = ["用户管理", "菜单管理", "角色管理", "权限管理"];
import Role from "@/components/role/role.vue";
export default {
  components: {
    Role
  },
  data() {
    return {
      checkedCities: ["用户管理", "菜单管理"],
      cities: cityOptions,
      roleForm: {
        roleName: ""
      },
      rules: {
        role: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        description: [
          { required: false, message: "请输入班级名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async addUser() {
      // 可以发起添加用户的网络请求
      var qs = require("qs");
      const { data: res } = await this.$axios.post(
        "/role/creteRole",
        qs.stringify({ role: this.roleForm })
      );
      console.log(res);
      if (res.code != 200) {
        this.$message.error("添加用户失败！");
      } else {
        this.$message.success("添加用户成功！");
        this.$router.push("/user");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.create {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>