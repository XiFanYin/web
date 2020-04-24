<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avater_box">
        <img src="../assets/logo.png" />
      </div>

      <el-form class="login_in_form" :model="loginform" :rules="rules" ref="loginform_ref">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-denglu" v-model="loginform.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-mima" show-password v-model="loginform.password"></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginform: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm() {
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs['loginform_ref'].resetFields();
    },
    login() {
   
      this.$refs['loginform_ref'].validate(isok => {
        if (!isok) return;
        this.$http
          .login(this.loginform,true)
          .then(res => {
            console.log(res)
            sessionStorage.setItem("token",res.token)
            this.$router.push('/')
          })
          .catch(e => {
         
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  position: absolute;
  background-color: white;
  width: 450px;
  height: 300px;
  border-radius: 3px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avater_box {
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: -50%;
  transform: translate(-50%, 50%);
  padding: 12px;
  width: 130px;
  height: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
}
.login_in_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box; //切换盒子模型
}
.btns {
  text-align: right;
}
</style>