<template>
  <div class="all">
      
    <el-row>
        注册
    </el-row>
    <el-form
      label-position="0"
      label-width="100px"
      :inline="true"
      :model="user"
      :rules="rules"
      ref="user"
    >
      <el-form-item label="名称:" prop="customerName">
        <el-input v-model="user.customerName"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="customerPassword">
        <el-input v-model="user.customerPassword "></el-input>
      </el-form-item>
      <el-form-item label="地址:" prop="address">
        <el-input v-model="user.address "></el-input>
      </el-form-item>
      <el-form-item label="电话:" prop="telephone">
        <el-input v-model="user.telephone"></el-input>
      </el-form-item>
      <el-row>
        <el-button @click="registered('user')">立即注册</el-button>
        <el-button @click="loadBtn()">返回登陆</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { check } from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      activeName: "0",
      user: {
        customerName: "",
        customerPassword: "",
        address: "",
        telephone: ""
      },
      rules: {
        customerName: [{ required: true, message: "请输入", trigger: "blur" }],
        customerPassword: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
      loadBtn(){
          this.$router.go(-1)
      },
    registered(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post(check, this.user).then(data => {
           if(!data){
               this.$message.warning('名字重复无法添加')
           }else{
                 this.$message.success('注册成功，跳转至登陆')
               this.$router.go(-1)
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
    margin-bottom: 20px;
  }
  .el-button {
    // width: 80px;
    // height: 20px;
    text-align: center;
    line-height: 20px;
  }
}
</style>
