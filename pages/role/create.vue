<template>
  <div>
    <el-container>
  <el-aside width="200px">
    <Role/>
    <nuxt/>
  </el-aside>
  <el-main>
    <el-col :span="10">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名" prop="role">
    <el-input v-model="ruleForm.role"></el-input>
  </el-form-item>
  
  <el-form-item label="班级描述" prop="description">
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
import Role from "@/components/role/role.vue"
export default {
  components:{
    Role
  },
  data() {
      return {
        ruleForm: {
          role: '',

          description: '',
        },
        rules: {
         role: [
            { required: true, message: '请输入角色名', trigger: 'blur' },
          ],
            description: [
            { required: false, message: '请输入班级名', trigger: 'blur' },
          ],
         
        }
      };
  },
      methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>

</style>