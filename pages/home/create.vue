<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Home />
        <nuxt />
      </el-aside>
      <el-main>
        <el-col :span="10" class="create">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="班级名:" prop="class_name">
              <el-input v-model="ruleForm.class_name"></el-input>
            </el-form-item>
            <el-form-item label="学校:" prop="school">
              <el-input v-model="ruleForm.school"></el-input>
            </el-form-item>
            <el-form-item label="学院:" prop="college">
              <el-input v-model="ruleForm.college"></el-input>
            </el-form-item>
            <el-form-item label="班级描述:" prop="description">
              <el-input type="textarea" v-model="ruleForm.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Home from "@/components/home/home.vue";
export default {
  components: {
    Home
  },
  data() {
    return {
      ruleForm: {
        class_name: "",
        school: "",
        college: "",
        description: ""
      },
      rules: {
        class_name: [
          { required: true, message: "请输入班级名", trigger: "blur" }
        ],
        school: [{ required: true, message: "请输入班级名", trigger: "blur" }],
        college: [{ required: true, message: "请输入班级名", trigger: "blur" }],
        description: [
          { required: false, message: "请输入班级名", trigger: "blur" }
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