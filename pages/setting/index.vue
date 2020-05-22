<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Setting />
        <nuxt />
      </el-aside>
      <el-main>
        <div>
          <!-- 卡片视图区域 -->
          <el-card>
            <!-- 用户列表区域 -->
            <!-- datalist是数据源头 -->
            <el-table :data="datalist" border stripe>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="名称(key)" prop="key"></el-table-column>
              <el-table-column label="值(value)" prop="value"></el-table-column>
              <el-table-column label="操作" width="150%">
                <template slot-scope="scope">
                  <!-- 修改按钮 -->
                  <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-dialog
            title="修改参数"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
          >
            <el-form :model="editForm" ref="editFormRef" label-width="70px">
              <el-form-item label="名称">
                <el-input v-model="editForm.key" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="经验值">
                <el-input v-model="editForm.value"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editParaInfo">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Setting from "@/components/setting/setting.vue";
export default {
  components: {
    Setting
  },
  data() {
    return {
      value: "",
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      datalist: [
        {
          key: "签到经验",
          value: "2"
        },
        {
          key: "签到距离",
          value: "100"
        }
      ],
      editForm: {}
    };
  },
  methods: {
    showEditDialog(data) {
      console.log(data);
      this.editForm = data;
      this.editDialogVisible = true;
    },
    editParaInfo() {
      this.datalist[0].value = 5;
      // 关闭对话框
      this.editDialogVisible = false;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    }
  }
};
</script>


<style lang="less" scoped>
</style>