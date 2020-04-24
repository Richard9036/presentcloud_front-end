<template>
  <div>
<el-container>
  <el-aside width="200px">
    <Home/>
    <nuxt/>
    </el-aside>
  <el-main>
 <el-col :span="6" class="already">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="班课号:" prop="class_id">
    <el-input v-model="ruleForm.class_id"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">加入班课</el-button>
    <el-button @click="resetForm('ruleForm')">重新输入</el-button>
  </el-form-item>
</el-form>
</el-col>
  </el-main>
</el-container>
  
    
  </div>


</template>

<script>
import Home from "@/components/home/home.vue"
export default {

  components:{
    Home
  },
  data() {
      return {
        ruleForm: {
          class_id: '',
        },
        rules: {
          class_id: [
            { required: true, message: '请输入班课号', trigger: 'blur' },
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
.already {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

