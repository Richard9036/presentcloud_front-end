<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Menu />
        <nuxt />
      </el-aside>
      <el-main>
        <el-card>
          <template>
            <el-table :data="data">
              <!-- 一级嵌套 -->
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-table :data="scope.row.subMenus" :show-header="false">
                    <el-table-column label="菜单id" prop="menuId"></el-table-column>
                    <el-table-column label="菜单名称" prop="menuName"></el-table-column>
                    <el-table-column label="是否为页面" prop="ispage" :formatter="stateFormat"></el-table-column>
                    <el-table-column label="是否显示">
                      <template slot-scope="scope">
                        <el-switch
                          v-model="scope.row.isshow"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          :change="isshowChange(scope.row)"
                        ></el-switch>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="right">
                      <template slot-scope="scope">
                        <el-button size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
                        <!-- <el-button size="mini" type="danger" @click="delData">删除</el-button> -->
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column label="班课id" prop="menu.menuId"></el-table-column>
              <el-table-column label="班课名称" prop="menu.menuName"></el-table-column>
              <el-table-column label="是否为页面" prop="menu.ispage" :formatter="stateFormatParent"></el-table-column>
              <el-table-column label="是否显示">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.menu.isshow"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :change="isshowChangeParent(scope.row.menu)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="right">
                <template slot-scope="scope">
                  <el-button size="mini" @click="showEditDialog(scope.row.menu)">编辑</el-button>
                  <!-- <el-button size="mini" type="danger" @click="delData">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-card>
        <!-- 修改用户的对话框 -->
        <el-dialog
          title="修改菜单"
          :visible.sync="editDialogVisible"
          width="30%"
          @close="editDialogClosed"
        >
          <el-form :model="editForm" ref="editFormRef" label-width="70px">
            <el-form-item label="ID">
              <el-input v-model="editForm.menuId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="菜单名">
              <el-input v-model="editForm.menuName"></el-input>
            </el-form-item>
            <el-form-item label="菜单链接">
              <el-input v-model="editForm.menuLink"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editMenuInfo">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Menu from "@/components/menu/menu.vue";
let result = null; // 运行结果
export default {
  components: {
    Menu
  },

  data() {
    return {
      checkArray: [],
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: {},
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$axios.get("/menu/findAllMenus");
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("获取菜单列表失败！");
      }
      this.data = res.data;
    },
    //子菜单输出格式化
    stateFormat(row, column) {
      if (row.ispage == 1) {
        return "是";
      } else if (row.ispage == 0) {
        return "否";
      } else {
        return "──";
      }
    },
    //父菜单输出格式化
    stateFormatParent(row, column) {
      if (row.menu.ispage == 1) {
        return "是";
      } else if (row.ispage == 0) {
        return "否";
      } else {
        return "──";
      }
    },
    async showEditDialog(data) {
      this.editForm = data;
      console.log(this.editForm.id);
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    async isshowChange(object) {
      // console.log(object);
      var qs = require("qs");
      const { data: res } = await this.$axios.post(
        "/menu/updateByparentId",
        object
      );
      // console.log(res);
    },
    async isshowChangeParent(object) {
      // console.log(object);
      var qs = require("qs");
      const { data: res } = await this.$axios.post("/menu/edit", object);
      // console.log(res);
    },
    // 展示编辑用户的对话框
    async showEditDialog(data) {
      this.editForm = data;
      console.log(this.editForm);
      this.editDialogVisible = true;
    },
    async editMenuInfo() {
      var result={}
      if (this.editForm.parentMenuId == 0) {
        const { data: res } = await this.$axios.post(
          "/menu/edit",
          this.editForm
        );
        console.log("父菜单更新")
        result=res
      } else {
        const { data: res } = await this.$axios.post(
          "/menu/updateByparentId",
          this.editForm
        );
        console.log("子菜单更新")
        result=res
      }
      console.log(result);
      if (result.code != 200) {
        return this.$message.error("更新菜单信息失败！");
      }
      this.editDialogVisible = false;
      this.getMenuList();
      this.$message.success("更新菜单信息成功！");
    }
  }
};
</script>

<style lang="less" scoped>
</style>