<!-- 应调用接口通过角色表和菜单表获取数据，更新后应调用接口把更新后的数据传递到后台进行数据库的更新 -->
<template>
<div>
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="role"
      label="角色"
      width="180">
    </el-table-column>
     <el-table-column label="菜单选择" width="800" prop="chose">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改权限</el-button>

      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="编辑数据"
               :visible.sync="editFormVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="editForm" label-width="100px"  ref="editForm">

            <el-form-item label="角色" prop="role" >
              <el-input v-model="editForm.role" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
                <el-form-item label="选择权限" prop="chose">
        <el-checkbox-group v-model="editForm.chose">
      <el-checkbox-button v-for="menu in menus" :label="menu" :key="menu">{{menu}}</el-checkbox-button>
    </el-checkbox-group>
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
 const Menus = ['允许登录', '系统首页', '用户管理', '菜单管理','角色管理','班课管理','数据管理'];
export default {
  
    data() {
      return {
          editForm: {
              role: '',
              chose: '',
              index:0
            },
             role:undefined,
            chose:undefined,
            //默认dialog弹窗不打开（true打开，false为不打开）
            editFormVisible: false,
            //模拟表格数据
        tableData: [{
          role: '管理员',
        chose: ['允许登录', '系统首页', '用户管理', '菜单管理','角色管理','班课管理','数据管理'],
        } ,
        {
          role: '教师',
        chose: ['允许登录', '系统首页', '班课管理'],
        } ,
        {
            role:'学生',
            chose: [],
        }

        ],
        
        menus: Menus
      }
    },
    methods: {
handleEdit: function (index, row) {
        this.editFormVisible = true;//dialog对话窗口打开
        this.editForm = Object.assign({}, row);//将数据传入dialog页面
        this.editForm.index=index;//传递当前index
      },//更新
             handleCancel(formName) {
        this.editFormVisible = false;
      },
      handleUpdate(forName) {
      //dialog页面数据写入到tableData页面上
      //this.$set(tableName,talbeIndex,data)
        this.$set(this.tableData,this.editForm.index,{role:this.editForm.role,chose:this.editForm.chose});
        this.editFormVisible = false;
      }


    }
  }
</script>

<style>

</style>