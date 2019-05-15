<template>
  <div class="all">
    <el-menu class="el-menu-demo" mode="horizontal" router unique-opened>
      <el-menu-item index="/Index/Grad">首页</el-menu-item>
      <el-menu-item index="/Index/Announcement">公告列表</el-menu-item>
      <el-menu-item index="/Index/companyIntroduction">公司介绍</el-menu-item>
      <el-menu-item index="/Index/Dictionary"  v-if="this.userInfo.code =='2'">基本信息管理</el-menu-item>
      <el-menu-item index="/Index/StaffManagement" v-if="this.userInfo.code =='2'">员工管理</el-menu-item>
      <el-menu-item index="/Index/applicationManagement" v-if="this.userInfo.code =='2'||this.userInfo.code =='1'">申请管理</el-menu-item>
      <el-menu-item index="/Index/orderManegement"   v-if="this.userInfo.code">订单管理</el-menu-item>
      <el-menu-item index="/Index/grad" v-if="this.userInfo.code =='2'||this.userInfo.code =='1'">工资管理</el-menu-item>
      <el-menu-item index="/Index/Loading" v-if="!this.userInfo.code">登陆</el-menu-item>
      <el-menu-item @click="logoutBtn()"  v-if="this.userInfo.code">退出登陆</el-menu-item>
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
    if(JSON.parse(sessionStorage.getItem('user')).code){
    sessionStorage.getItem('user');
    console.log(sessionStorage.getItem('user'))
    this.setuserInfo(JSON.parse(sessionStorage.getItem('user')));
    console.log(this.userInfo, "管理登陆");
    }
console.log(this.userInfo)
  },
  computed: {
    ...mapState(["loadingData","userInfo"])
  },
  methods: {
    ...mapActions(["setloadingData","setuserInfo"]),
    logoutBtn() {
      axios.get(logout).then(data => {
        console.log("退出登陆成功");
         this.$message.warning('退出登录成功!');
        sessionStorage.clear();
        this.$router.push('/Index/Loading');
        this.setloadingData(false);
        this.setuserInfo({});
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
