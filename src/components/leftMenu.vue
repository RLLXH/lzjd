<template>
  <div class="all">
    <el-menu class="el-menu-demo" mode="horizontal" router unique-opened>
      <el-menu-item index="/Index/Grad">首页</el-menu-item>
      <el-submenu index="2">
        <el-menu-item index="/Index/grad">公司介绍</el-menu-item>
        <template slot="title">公告列表</template>
      </el-submenu>
      <el-menu-item index="/Index/grad">公司介绍</el-menu-item>
      <el-menu-item index="/Index/grad" v-if="this.loadingData">数据字典管理</el-menu-item>
      <el-menu-item index="/Index/StaffManagement" v-if="this.loadingData">员工管理</el-menu-item>
      <el-menu-item index="/Index/grad" v-if="this.loadingData">申请管理</el-menu-item>
      <el-menu-item index="/Index/grad" v-if="this.loadingData">订单管理</el-menu-item>
      <el-menu-item index="/Index/grad" v-if="this.loadingData">工资管理</el-menu-item>
      <el-menu-item index="/Index/Loading" v-if="!this.loadingData">登陆</el-menu-item>
      <el-menu-item @click="logoutBtn()" v-if="this.loadingData">退出登陆</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import axios from "../api/axios.js";
import { logout } from "../api/address.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapmutations } = createNamespacedHelpers(
  "loadingstore"
);
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.loadingData, "管理登陆");
  },
  computed: {
    ...mapState(["loadingData"])
  },
  methods: {
    ...mapActions(["setloadingData"]),
    logoutBtn() {
      axios.get(logout).then(data => {
        console.log("退出登陆成功");
        this.setloadingData(false);
      });
    }
  }
};
</script>
<style scoped lang='less'>
@percent: 100%;
.all {
  height: @percent;
  background-color: #f5f5f5;
  .el-menu {
    border: none !important;
  }
}
</style>
