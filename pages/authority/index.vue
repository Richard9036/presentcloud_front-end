<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Authority />
        <nuxt />
      </el-aside>
      <el-main>
        <!-- 卡片视图 -->
        <el-card>
          <!-- 添加权限按钮区域 -->
          <el-row>
            <el-col>
              <el-button type="primary">
                <nuxt-link to="/authority/create">添加权限</nuxt-link>
              </el-button>
            </el-col>
          </el-row>
          <br />
          <el-table :data="rightsList" border stripe>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="权限名称" prop="authName"></el-table-column>
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="权限等级" prop="level">
              <!-- <template slot-scope="scope">
                <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                <el-tag type="warning" v-else>三级</el-tag>
              </template>-->
            </el-table-column>
            <el-table-column label="所属功能" prop="function"></el-table-column>
            <el-table-column label="描述" prop="desc"></el-table-column>
            <el-table-column label="操作" width="150%">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)"></el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
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
      // 权限列表
      rightsList: [
        {
          authName: "权限1",
          id: "001",
          level: "3",
          function: "用户管理",
          desc: "用户信息增删改查"
        }
      ]
    };
  },
  created() {
    // 获取所有的权限
    this.getRightsList();
  },
  methods: {
    // 获取权限列表
    async getRightsList() {
      // const { data: res } = await this.$http.get("rights/list");
      // if (res.meta.status !== 200) {
      //   return this.$message.error("获取权限列表失败！");
      // }

      // this.rightsList = res.data;
      console.log(this.rightsList);
    }
  }
};
</script>

<style lang="less" scoped>
</style>