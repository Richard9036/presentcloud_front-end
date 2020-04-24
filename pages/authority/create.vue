<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Authority />
        <nuxt />
      </el-aside>
      <el-main>
        <el-col :span="10" class="create">
          <el-form
            :model="rightsForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="权限名" prop="authName">
              <el-input v-model="rightsForm.authName"></el-input>
            </el-form-item>
            <el-form-item label="权限描述" prop="desc">
              <el-input type="textarea" v-model="rightsForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="权限等级" prop="level">
              <el-select v-model="rightsForm.level" placeholder="请选择权限等级">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属模块" prop="module">
              <el-select v-model="rightsForm.module" placeholder="请选择所属功能">
                <el-option label="用户管理" value="1"></el-option>
                <el-option label="角色管理" value="2"></el-option>
                <el-option label="系统首页" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限功能" prop="function">
              <el-checkbox-group v-model="rightsForm.function">
                <el-checkbox label="数据添加" name="type"></el-checkbox>
                <el-checkbox label="数据更新" name="type"></el-checkbox>
                <el-checkbox label="数据修改" name="type"></el-checkbox>
                <el-checkbox label="数据查询" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Authority from "@/components/authority/authority.vue";
export default {
  components: {
    Authority
  },
  data() {
    return {
      rightsForm: {
        authName: "",
        id: "",
        level: "",
        module: "",
        function: [],
        desc: ""
      },

      ruleForm: {
        role: "",

        description: ""
      },
      rules: {
        authName: [
          { required: true, message: "请输入角色名", trigger: "blur" }
        ],
        desc: [{ required: false, message: "请输入权限描述", trigger: "blur" }],
        level: [
          { required: true, message: "请选择权限等级", trigger: "change" }
        ],
        module: [
          { required: true, message: "请选择所属模块", trigger: "blur" }
        ],
        function: [{type: "array",required: true,message: "请至少选择一个权限",trigger: "change"}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.create {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>