<!-- 应调用接口通过角色表获得数据，编辑和删除时应调用接口进行数据库数据的更新 -->
<template>
<div>
  <el-row>
    <nuxt-link to='/role/create'>
  <el-button type="primary">创建角色</el-button>
  </nuxt-link>
</el-row>
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 70%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="role"
      label="角色"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="角色描述" 
      width="400"
      >
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
        <el-dialog title="编辑数据"
               :visible.sync="editFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="editForm" label-width="80px"  ref="editForm">

            <el-form-item label="角色" prop="role">
              <el-input v-model="editForm.role" auto-complete="off"></el-input>
            </el-form-item>
                <el-form-item label="角色描述" prop="description">
          <el-input v-model="editForm.description" auto-complete="off"></el-input>
            </el-form-item>
          
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('editForm')">取消</el-button>
        <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
      return {
                editForm: {
              role: '',
              description: '',
 
              index:0
            },
            //定义属性
            role:undefined,
            description:undefined,
            //默认dialog弹窗不打开（true打开，false为不打开）
            editFormVisible: false,
            //模拟表格数据
        tableData: [{
          role: '管理员',
          description: '管理到云后台系统'
        }, {
          role: '教师',
          description: '班级学生管理',
        },
        {
          role: '学生',
          description: '到云app学生用户',
        },
                {
          role: '助教',
          description: '帮助老师完成教学任务',
        }
        ]
      }
    },
    methods: {
handleEdit: function (index, row) {
        this.editFormVisible = true;//dialog对话窗口打开
        this.editForm = Object.assign({}, row);//将数据传入dialog页面
        this.editForm.index=index;//传递当前index
      },
      handleDelete(index, row) {
        this.tableData.splice(index, 1);
      },
       handleCancel(formName) {
        this.editFormVisible = false;
      },
     //更新
      handleUpdate(forName) {
      //dialog页面数据写入到tableData页面上
      //this.$set(tableName,talbeIndex,data)
        this.$set(this.tableData,this.editForm.index,{role:this.editForm.role,description:this.editForm.description});
        this.editFormVisible = false;
      }
    }
  }
</script>

<style>

</style>