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
          <el-submenu v-for="item  in menusList" :key="item.menuId" :index="item.menuId">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              @click="tosubMenu(subitem.url,subitem.title)"
              v-for="subitem in item.list"
              :key="subitem.menuId"
              :index="subitem.url"
            >{{subitem.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-tabs v-model="subPath" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="item  in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
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
      editableTabs: [],
      menusList: [],
      iconobj: {
        "125": "iconfont icon-Management",
        "103": "iconfont icon-quanxianguanli",
        "101": "iconfont icon-shangpingouwudai2",
        "102": "iconfont icon-icon-test",
        "145": "iconfont icon-tongji"
      },
      isCollapse: false,
      subPath: "/"
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
    tosubMenu(subPath, title) {
      this.subPath = subPath;
      let newpath = { name: subPath, title: title };
      //去除重复
      if (
        JSON.stringify(this.editableTabs).indexOf(JSON.stringify(newpath)) == -1
      ) {
        this.editableTabs.push(newpath);
        window.sessionStorage.setItem(
          "tabs",
          JSON.stringify(this.editableTabs)
        );
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.subPath;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.subPath = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      window.sessionStorage.setItem("tabs", JSON.stringify(this.editableTabs));
      if (this.editableTabs.length == 0) {
        this.subPath = "/welcome";
        window.sessionStorage.setItem("currrnttab", "/welcome");
      }
    }
  },
  mounted() {
    let tabs = JSON.parse(window.sessionStorage.getItem("tabs"));
    if (tabs != null) {
      this.editableTabs = tabs;
    }
    this.getMenuList();
    if (window.sessionStorage.getItem("currrnttab") != null) {
      //取出来之前的路由
      this.subPath = window.sessionStorage.getItem("currrnttab");
    }
  },

  watch: {
    //观察路径改变，进行跳转
    subPath(newPath) {
      //存起来当前路由，刷新时候可以直接定位到之前路由
      this.$router.replace({ path: newPath }).catch(data => {});
      window.sessionStorage.setItem("currrnttab", newPath);
    }
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