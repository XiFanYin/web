<template>
  <el-container class="home_container">
    <el-header>
      <div class="logo">
        <img src="../assets/jingdong.png" />
        <span>京东后台管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleMenu">| | |</div>
        <el-menu
          background-color="#333744"
          text-color="#ffffff"
          active-text-color="#409eff"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="subPath"
        >
          <el-submenu v-for="item  in menusList" :key="item.id" :index="item.id+''">
            <template slot="title">
              <i :class="iconobj[item.id+'']"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              @click="tosubMenu('/'+subitem.path)"
              v-for="subitem in item.children"
              :key="subitem.id"
              :index="'/'+subitem.path"
            >{{subitem.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      menusList: [],
      iconobj: {
        "125": "iconfont icon-Management",
        "103": "iconfont icon-quanxianguanli",
        "101": "iconfont icon-shangpingouwudai2",
        "102": "iconfont icon-icon-test",
        "145": "iconfont icon-tongji"
      },
      isCollapse: false,
      subPath: ""
    };
  },

  methods: {
    //联网请求菜单项
    getMenuList() {
      this.$http
        .getMenus()
        .then(res => {
          this.menusList = res;
        })
        .catch(err => {});
    },
    //显示和隐藏侧边栏
    toggleMenu() {
      this.isCollapse = !this.isCollapse;
    },
    //退出登录
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //跳转子页面
    tosubMenu(subPath) {
      this.subPath = subPath;
      this.$router.push(subPath);
      window.sessionStorage.setItem("subPath", subPath);
    }
  },
  mounted() {
    this.subPath = window.sessionStorage.getItem("subPath");
    this.getMenuList();
  }
};
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span {
      font-size: 20px;
      font-weight: 2;
      margin-left: 15px;
      color: #ffffff;
    }
  }
}

.iconfont {
  margin-right: 10px;
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border: none;
  }
  .toggle-button {
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    background-color: #4a5064;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>