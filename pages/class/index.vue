<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Class />
        <nuxt />
      </el-aside>
      <el-main>
        <el-card>
          <div>
            <!-- 卡片视图区域 -->
            <el-card>
              <!-- 搜索与添加区域 -->
              <el-row :gutter="20">
                <!-- <el-col :span="8">
                  <el-input placeholder="请输入内容" clearable>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-col>-->
                <el-col :span="4">
                  <el-button type="primary">
                    <nuxt-link to="/class/show">新增班课</nuxt-link>
                  </el-button>
                </el-col>
              </el-row>
              <br />
              <!-- 用户列表区域 -->
              <!-- userlist是数据源头 -->
              <el-table :data="userlist" border stripe>
                <!-- 索引列 -->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="班课id" prop="classesId"></el-table-column>
                <el-table-column label="班课名" prop="classesName"></el-table-column>
                <el-table-column label="所属学院" prop="department"></el-table-column>
                <el-table-column label="学校" prop="school"></el-table-column>
                <el-table-column label="操作" width="300%">
                  <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      @click="showEditDialog(scope.row)"
                    ></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" @click="deleteClass(scope.row)"></el-button>
                    <el-button
                      type="success"
                      icon="el-icon-search"
                      @click="showStudentList(scope.row)"
                    >学生列表</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 
            分页区域
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[1, 2, 10, 20]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              ></el-pagination>-->
            </el-card>

            <!-- 修改用户的对话框 -->
            <el-dialog
              title="修改班课信息"
              :visible.sync="editDialogVisible"
              width="50%"
              @close="editDialogClosed"
            >
              <el-form :model="editForm" ref="editFormRef" label-width="70px">
                <el-form-item label="班课ID">
                  <el-input v-model="editForm.classesId" disabled></el-input>
                </el-form-item>
                <el-form-item label="班课名">
                  <el-input v-model="editForm.classesName"></el-input>
                </el-form-item>
                <el-form-item label="所属学院">
                  <el-input v-model="editForm.department"></el-input>
                </el-form-item>
                <el-form-item label="所属学校">
                  <el-input v-model="editForm.school"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editClass">确 定</el-button>
              </span>
            </el-dialog>
            <!-- 学生列表 -->
            <el-dialog
              title="学生列表"
              :visible.sync="studentListVisible"
              width="50%"
            >
              <el-table :data="studentList" border stripe>
                <!-- 索引列 -->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="学生id" prop="userId"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="性别" prop="sex"></el-table-column>
                <el-table-column label="手机号码" prop="tel"></el-table-column>
              </el-table>
            </el-dialog>
          </div>
        </el-card>

        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Class from "@/components/class/class.vue";
import Table from "@/components/class/table.vue";
export default {
  components: {
    Class,
    Table
  },
  data() {
    return {
      userlist: [],
      postForm: {},
      editForm: {},
      studentList: [],
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 控制学生列表对话框的显示与隐藏
      studentListVisible: false
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    // 获取用户表信息
    async getClassList() {
      const { data: res } = await this.$axios.get("/app/class/findAll");
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.userlist = res.data;
    },
    async deleteClass(object) {
      var qs = require("qs");
      this.postForm.classesId = object.classesId;
      const { data: res } = await this.$axios.post(
        "/app/class/deleteClass",
        qs.stringify({ classId: this.postForm.classesId })
      );
      console.log(res);
      this.getClassList();
    },
    // 展示编辑用户的对话框
    async showEditDialog(data) {
      this.editForm = data;
      console.log(this.editForm);
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    async editClass() {
      var qs = require("qs");
      console.log(this.editForm);
      const { data: res } = await this.$axios.post(
        "/webClass/update",
        this.editForm
      );
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("更新班课信息失败！");
      }
      this.editDialogVisible = false;
      this.getClassList();
      this.$message.success("更新班课信息成功！");
    },
    // 展示学生列表的对话框
    async showStudentList(data) {
      console.log(this.editForm);
      this.studentListVisible = true;
      var qs = require("qs");
      const { data: res } = await this.$axios.post(
        "/webClass/findAllUserInCurrentClass",
        qs.stringify({ classes_id: data.classesId })
      );
      this.studentList = res.data;
      console.log(res);
    },
  }
};
</script>

<style>
</style>