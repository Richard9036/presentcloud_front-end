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
                  v-model="queryInfo.query"
                  clearable
                  @clear="getUserList"
                >
                  <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
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
              <el-table-column label="姓名" prop="username"></el-table-column>
              <el-table-column label="电话" prop="mobile"></el-table-column>
              <el-table-column label="ID" prop="id"></el-table-column>
              <el-table-column label="性别" prop="sexual"></el-table-column>
              <el-table-column label="角色" prop="role_name"></el-table-column>
              <el-table-column label="专业" prop="major_name"></el-table-column>
              <el-table-column label="操作" width="150%">
                <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    @click="showEditDialog(scope.row.id)"
                  ></el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[1, 2, 10, 20]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </el-card>

          <!-- 修改用户的对话框 -->
          <el-dialog
            title="修改用户"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
          >
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
              <el-form-item label="用户名">
                <el-input v-model="editForm.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
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
      // 获取用户列表的参数对象
      queryInfo: {
        // 搜索关键字
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 1
      },
      userlist: [
        {
          username: "张三",
          mobile: "18000000000",
          id: 25,
          sexual: "男",
          role_name: "学生",
          major_name: "软件工程"
        },
        {
          username: "张三",
          mobile: "18000000000",
          id: 25,
          sexual: "男",
          role_name: "学生",
          major_name: "软件工程"
        }
      ],
      total: 0,
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
      editForm: {},
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 修改表单的验证规则对象
      editFormRules: {
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
    // 获取用户表信息
    async getUserList() {
      // const { data: res } = await this.$http.get("users", {
      //   params: this.queryInfo
      // });
      // if (res.meta.status !== 200) {
      //   return this.$message.error("获取用户列表失败！");
      // }
      this.userlist = this.userlist;
      this.total = this.userlist.length;
      // console.log(res);
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      // console.log(id)
      // const { data: res } = await this.$http.get("users/" + id);

      // if (res.meta.status !== 200) {
      //   return this.$message.error("查询用户信息失败！");
      // }

      // this.editForm = res.data;
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo() {
      // this.$refs.editFormRef.validate(async valid => {
      //   if (!valid) return;
      //   // 发起修改用户信息的数据请求
      //   const { data: res } = await this.$http.put(
      //     "users/" + this.editForm.id,
      //     {
      //       email: this.editForm.email,
      //       mobile: this.editForm.mobile
      //     }
      //   );

      //   if (res.meta.status !== 200) {
      //     return this.$message.error("更新用户信息失败！");
      //   }

      //   // 关闭对话框
      //   this.editDialogVisible = false;
      //   // 刷新数据列表
      //   this.getUserList();
      //   // 提示修改成功
      //   this.$message.success("更新用户信息成功！");
      // });
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