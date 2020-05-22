<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Menu />
        <nuxt />
      </el-aside>
      <el-main>
        <el-row :gutter="2">
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple-light">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>菜单显隐藏设置</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <el-tree
                  :data="data"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="tree"
                  :highlight-current="true"
                  :props="defaultProps"
                ></el-tree>

                <span class="button">
                  <el-button type="primary" @click="getCheckedKeys">保存</el-button>
                  <el-button @click="resetChecked">清空</el-button>
                </span>
              </el-card>
            </div>
          </el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
            <div class="grid-content bg-purple">
              <el-card>
                <el-table
                  :data="data"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  default-expand-all
                >
                  <el-table-column prop="label" label="名称" sortable width="180"></el-table-column>
                  <el-table-column prop="id" label="id" sortable width="180"></el-table-column>
                  <el-table-column
                    prop="isShow"
                    label="是否显示"
                    :formatter="stateFormat"
                    sortable
                    width="180"
                  ></el-table-column>
                  <el-table-column label="操作" width="150%">
                    <template slot-scope="scope">
                      <!-- 编辑按钮 -->
                      <el-button
                        type="primary"
                        icon="el-icon-edit-outline"
                        @click=" showEditDialog(scope.row)"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <!-- 修改用户的对话框 -->
        <el-dialog
          title="修改菜单"
          :visible.sync="editDialogVisible"
          width="30%"
          @close="editDialogClosed"
        >
          <el-form :model="editForm" ref="editFormRef" label-width="70px">
            <el-form-item label="ID" >
              <el-input v-model="editForm.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="菜单名" >
              <el-input v-model="editForm.label"></el-input>
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
      data: [
        {
          id: 1,
          label: "用户管理",
          children: [
            {
              id: 11,
              label: "新增用户",
              isShow: 0
            }
          ]
        },
        {
          id: 2,
          label: "角色管理",
          children: [
            {
              id: 21,
              label: "新增角色",
              isShow: 1
            }
          ]
        },
        {
          id: 3,
          label: "数据字典",
          children: [
            {
              id: 31,
              label: "数据字典录入",
              isShow: 0
            },
            {
              id: 32,
              label: "数据层级展示",
              isShow: 1
            }
          ]
        },
        {
          id: 4,
          label: "参数设置",
          children: [{ id: 41, label: "系统参数设置", isShow: 1 }]
        },
        {
          id: 5,
          label: "权限管理",
          children: [
            {
              id: 51,
              label: "新增权限",
              isShow: 1
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.$nextTick(function() {
      this.setCheckedKeys();
    });
  },
  methods: {
    stateFormat(row, column) {
      if (row.isShow == 1) {
        return "是";
      } else if (row.isShow == 0) {
        return "否";
      } else {
        return "──";
      }
    },
    setTreeItem(data, arr) {
      var i;
      console.log("arr" + arr);
      data.map(item => {
        if (arr.includes(item.id)) {
          if (item.hasOwnProperty("isShow")) {
            item.isShow = 1;
          }
          console.log(item.id + " " + item.isShow);
        } else {
          if (item.hasOwnProperty("isShow")) {
            item.isShow = 0;
          }
          console.log(item.id + " " + item.isShow);
        }
        if (item.children) {
          this.setTreeItem(item.children, arr);
        }
      });
    },
    getTreeItem(data) {
      data.map(item => {
        // console.log(item.id);
        if (item.isShow == 1) {
          this.checkArray.push(item.id);
        } else {
          if (item.children) {
            this.getTreeItem(item.children);
          }
        }
      });
      console.log(this.checkArray);
    },
    getCheckedKeys() {
      this.checkArray = this.$refs.tree.getCheckedKeys();
      console.log("checkArray" + this.checkArray);
      this.setTreeItem(this.data, this.checkArray);
      this.setCheckedKeys;
    },
    async setCheckedKeys() {
      this.getTreeItem(this.data);
      // console.log(this.checkArray);
      this.$refs.tree.setCheckedKeys(this.checkArray);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
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
    editMenuInfo(){
      this.data[0].label="管理用户"
      this.editDialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-tree-node__label {
  font-size: 16px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 400px;
  height: 480px;
}
.button {
  position: relative;
  top: 55px;
  // left: 50%;
  transform: translate(-70%, -50%);
}
.el-col {
  border-radius: 4px;
}
// .bg-purple-dark {
//   background: #99a9bf;
// }
// .bg-purple {
//   background: #d3dce6;
// }
// .bg-purple-light {
//   background: #e5e9f2;
// }
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>