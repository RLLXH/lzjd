<template>
  <div class="all">
    <el-form
      label-position="0"
      label-width="110px"
      :inline="true"
      :model="user"
      :rules="rules"
      ref="user"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="客户登录" name="0">
          <el-form-item label="用户名:" prop="userName">
            <el-input v-model="user.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="管理后台登录" name="1">
          <el-form-item label="管理员用户名:" prop="userName">
            <el-input v-model="user.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-row>
        <el-button @click="loadBtn('user')">登录</el-button>
      </el-row>
      <el-row>
        <el-button @click="regin(1)">用户注册</el-button>
        <el-button @click="regin(2)">员工注册</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { login } from "../api/address.js";
import axios from "../api/axios.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapmutations } = createNamespacedHelpers(
  "loadingstore"
);
export default {
  data() {
    return {
      activeName: "0",
      user: {
        password: "",
        userName: ""
      },
      rules: {
        password: [{ required: true, message: "请输入", trigger: "blur" }],
        userName: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions(["setloadingData", "setuserInfo"]),
    regin(id) {
      // this.$router.push("/Index/Registered");
      this.$router.push({
        path: "/Index/Registered",
        query: {
          id: id
        }
      });
    },
    handleClick() {
      console.log(this.activeName, "???????");
      this.user.password = "";
      this.user.userName = "";
    },
    loadBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            password: this.user.password,
            userName: this.user.userName
          };
          axios
            .post(login + "?type=" + (this.activeName - 0), data)
            .then(data => {
              if (data.code == "0") {
                if (data.data == "admin") {
                  // data.code
                  console.log(data, "??????");
                  data.data = {
                    code: "2"
                  };
                  sessionStorage.setItem("user", JSON.stringify(data.data));
                  this.setuserInfo(data.data);
                  this.$message.success("管理员登录成功！");
                  this.$router.push({
                    path: "/Index/Grad"
                  });
                } else {
                  console.log("登录成功", data.data);
                  this.$message.success("登录成功！");
                  data.data.code = this.activeName;
                  sessionStorage.setItem("user", JSON.stringify(data.data));
                  this.setuserInfo(data.data);
                  this.$router.push({
                    path: "/Index/Grad"
                  });
                  if (data) {
                    this.setloadingData(true);
                    console.log("改变菜单");
                  }
                }
              } else {
                this.$message.error("账号密码错误！");
              }
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.all {
  background: #f5f5f5;
  width: 400px;
  height: 400px;
  margin: auto;
  margin-top: 50px;
  padding-top: 20px;
  text-align: center;
  .el-row {
    margin-top: 20px;
  }
  .el-button {
    width: 80px;
    // height: 20px;
    text-align: center;
    line-height: 20px;
  }
}
</style>
