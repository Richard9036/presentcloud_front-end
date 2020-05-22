<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <User />
        <nuxt />
      </el-aside>
      <el-main>
        <div>
          <!-- 卡片视图区域 -->
          <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
              <el-col :span="8">
                <el-input
                  placeholder="请输入内容"
                  v-model="queryInfo.username"
                  clearable
                  @clear="findUser"
                >
                  <el-button slot="append" icon="el-icon-search" @click="findUser"></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary">
                  <nuxt-link to="/user/create">新增用户</nuxt-link>
                </el-button>
              </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <!-- userlist是数据源头 -->
            <el-table :data="userlist" border stripe>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="用户名" prop="name"></el-table-column>
              <el-table-column label="昵称" prop="nickname"></el-table-column>
              <el-table-column label="电话" prop="tel"></el-table-column>
              <el-table-column label="ID" prop="userId"></el-table-column>
              <el-table-column label="性别" prop="sex"></el-table-column>
              <el-table-column label="角色" prop="role_name"></el-table-column>
              <el-table-column label="学校" prop="school"></el-table-column>
              <el-table-column label="角色创建人" prop="creator"></el-table-column>
              <el-table-column label="创建时间" :formatter="dateFormat" prop="creationdate"></el-table-column>
              <el-table-column label="角色修改人" prop="modifier"></el-table-column>
              <el-table-column label="修改时间" :formatter="dateFormat" prop="modificationdate"></el-table-column>
              <el-table-column label="操作" width="150%">
                <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" icon="el-icon-delete" @click="deleteUser(scope.row)"></el-button>
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
            title="修改用户"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
          >
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="editForm.name"></el-input>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="editForm.tel"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="editForm.password"></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="editForm.nickname"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import User from "@/components/user/user.vue";
import moment from "moment";
export default {
  components: {
    User
  },
  data() {
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return cb();
      }

      cb(new Error("请输入合法的手机号"));
    };

    return {
      // // 获取用户列表的参数对象
      queryInfo: {
        // 搜索关键字
        username: ""
        //   // 当前的页数
        //   pagenum: 1,
        //   // 当前每页显示多少条数据
        //   pagesize: 1
      },
      userlist: [],
      editForm: {},
      postForm: {},
      // total: 0,
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名的长度在6~15个字符之间",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 修改表单的验证规则对象
      editFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 150,
            message: "密码的长度在6~15个字符之间",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入用户手机", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //时间格式化
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    // 获取用户表信息
    async getUserList() {
      const { data: res } = await this.$axios.get("/user/findAllUsers");
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.userlist = res.data;
      this.total = this.userlist.length;
      // console.log(res);
    },
    // // 监听 pagesize 改变的事件
    // handleSizeChange(newSize) {
    //   console.log(newSize);
    //   this.queryInfo.pagesize = newSize;
    //   this.getUserList();
    // },
    // // 监听 页码值 改变的事件
    // handleCurrentChange(newPage) {
    //   console.log(newPage);
    //   this.queryInfo.pagenum = newPage;
    //   this.getUserList();
    // },
    // 展示编辑用户的对话框
    async showEditDialog(data) {
      console.log(data);
      this.editForm = data;
      console.log(this.editForm);
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //删除用户
    async deleteUser(data) {
      console.log(data);
      var qs = require("qs");
      this.postForm.username = data.name;
      console.log(this.postForm);
      const { data: res } = await this.$axios.post(
        "/user/deleteUser",
        qs.stringify({ username: this.postForm.username })
      );
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("删除用户失败！");
      }
      this.getUserList();
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        // 发起修改用户信息的数据请求
        var qs = require("qs");
        console.log(this.editForm);
        const { data: res } = await this.$axios.post(
          "/user/update",
          qs.stringify(this.editForm)
        );
        console.log(res);
        if (res.code != 200) {
          return this.$message.error("更新用户信息失败！");
        }
        // 关闭对话框
        this.editDialogVisible = false;
        // 刷新数据列表
        this.getUserList();
        // 提示修改成功
        this.$message.success("更新用户信息成功！");
      });
    },
    async findUser() {
      var qs = require("qs");
      const { data: res } = await this.$axios.post(
        "/user/findUser",
        qs.stringify(this.queryInfo)
      );
      console.log(res);
      this.userlist = [res.data];
      console.log(this.userlist);
    }
  }
};
</script>

<style  lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>