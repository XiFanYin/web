<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable  @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
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
      total: 0
    };
  },
  methods: {
      //请求数据
    getUserList() {
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
        .then(res => {
        })
        .catch(err => {
            userInfo.mg_state = !userInfo.mg_state
        });
    },


    
    //编辑用户信息
    editUser() {},
    //删除用户
    deleteUser() {},
    //修改用户权限
    settingUser() {}
  },
  created() {
    this.getUserList();
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