<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Data />
        <nuxt />
      </el-aside>
      <el-main>
        <div>
          <!-- 卡片视图区域 -->
          <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
              <el-col :span="3">
                <el-select v-model="value" placeholder="请选择数据字典类别">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-button type="primary">查看</el-button>
              </el-col>
            </el-row>
            <br />
            <!-- 用户列表区域 -->
            <!-- datalist是数据源头 -->
            <el-table :data="datalist" border stripe>
              <!-- 索引列 -->
              <el-table-column type="index" label="#"></el-table-column>
              <el-table-column label="名称(key)" prop="key"></el-table-column>
              <el-table-column label="值(value)" prop="value"></el-table-column>
              <el-table-column label="默认值" prop="default"></el-table-column>
              <el-table-column label="创建时间" prop="createTime"></el-table-column>
              <el-table-column label="创建人" prop="creator"></el-table-column>
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
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Data from "@/components/data/data.vue";
export default {
  components: {
    Data
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "学历"
        },
        {
          value: "选项2",
          label: "角色名"
        },
        {
          value: "选项3",
          label: "专业名称"
        },
        {
          value: "选项4",
          label: "权限名称"
        }
      ],
      value: "",
      datalist: [
        {
          key: "本科",
          value: "001",
          default: "是",
          createTime: "2020.05.01",
          creator: "admin"
        },
        {
          key: "研究生",
          value: "002",
          default: "是",
          createTime: "2020.05.01",
          creator: "admin"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
</style>