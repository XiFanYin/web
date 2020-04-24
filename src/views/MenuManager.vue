<template>
  <div>
  

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUser()">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editUser()"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser()"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button size="mini" type="warning" icon="el-icon-setting" @click="settingUser()"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2,3,4,5]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="cancleDialog()">
      <el-form :model="userData" :rules="userRules" ref="userFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userData.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="userData.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userData.email"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobile">
          <el-input v-model="userData.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-">
        <el-button @click="cancleDialog">取 消</el-button>
        <el-button type="primary" @click="addUserSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //  自定义校验规则
    var checkEmail = (rule, value, callback) => {
      var reg_emial = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (reg_emial.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    return {
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示多少
        pagesize: 4
      },
      userlist: [],
      //总页数
      total: 0,
      dialogVisible: false,
      userData: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      userRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请填写正确手机号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //请求数据
    getUserList() {
      console.log(this.queryInfo);
      this.$http
        .getUsers(this.queryInfo)
        .then(res => {
          this.userlist = res.users;
          this.total = res.total;
        })
        .catch(err => {});
    },
    //改变每页的数量，后回调
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //改变页数
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //改变用户状态
    userStateChange(userInfo) {
      this.$http
        .putUsersState(
          null,
          false,
          `users/${userInfo.id}/state/${userInfo.mg_state}`
        )
        .then(res => {})
        .catch(err => {
          userInfo.mg_state = !userInfo.mg_state;
        });
    },
    //添加用户dialog显示
    addUser() {
      this.dialogVisible = true;
    },
    //取消添加用户，dialog隐藏
    cancleDialog() {
      this.dialogVisible = false;
      this.$refs["userFormRef"].resetFields();
    },
    addUserSure() {
      this.$refs["userFormRef"].validate(isok => {
        if (!isok) return;
        this.$http
          .addUser(this.userData)
          .then(res => {
            this.cancleDialog();
            this.getUserList();
          })
          .catch(err => {});
      });
    },
    //编辑用户信息
    editUser() {
      alert("弹出dialog，请求数据，这里不再实现");
    },
    //删除用户
    deleteUser() {
      alert("弹出dialog，请求数据，这里不再实现");
    },
    //修改用户权限
    settingUser() {
      alert("弹出dialog，请求数据，这里不再实现"); 
    }
  },
  created() {
    // this.getUserList();
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>