<template>
  <div class="all">
    <el-row>注册</el-row>
    <el-form
      v-if="this.id==1"
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
    <el-form
      v-if="this.id==2"
      label-position="0"
      label-width="100px"
      :inline="true"
      :model="postData"
      :rules="rules1"
      ref="postData"
    >
      <el-form-item label="名称:" prop="name">
        <el-input v-model="postData.name"></el-input>
      </el-form-item>
      <!-- <el-form-item label="编号:">
          <el-input v-model="postData.code"></el-input>
      </el-form-item>-->
      <el-form-item label="密码:" prop="password">
        <el-input v-model="postData.password"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-select v-model="postData.sex">
          <el-option value="0" label="男"></el-option>
          <el-option value="1" label="女"></el-option>
        </el-select>
        <!-- <el-input v-model="postData.sex"></el-input> -->
      </el-form-item>
      <el-form-item label="电话:" prop="phone">
        <el-input v-model="postData.phone"></el-input>
      </el-form-item>
      <!-- <el-form-item label="状态:">
          <el-input v-model="postData.statusName"></el-input>
      </el-form-item>-->
      <el-form-item label="地址:" prop="address">
        <el-input v-model="postData.address"></el-input>
      </el-form-item>
      <el-form-item label="头像:">
        <el-upload
          action
          :on-exceed="exceed"
          :auto-upload="false"
          :limit="1"
          :on-change="trus"
          accept="image/*"
          ref="clear"
        >
          <el-button size="small" type="primary">点击上传头像</el-button>
          <div class="headerImg">
            <img :src="postData.picture" alt>
          </div>
        </el-upload>
      </el-form-item>
      <el-row>
        <el-button @click="subBtn('postData')">立即注册</el-button>
        <el-button @click="loadBtn()">返回登陆</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { check, loginUpload, employeeAdd } from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      id: "",
      postData: {
        address: "",
        code: "",
        id: 0,
        name: "",
        password: "",
        phone: "",
        picture: "",
        sex: "",
        statusCode: "",
        statusName: "",
        picture: ""
      },
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
        telephone: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        sex: [{ required: true, message: "请输入", trigger: "change" }],
        phone: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      rules1: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        sex: [{ required: true, message: "请输入", trigger: "change" }],
        phone: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods: {
    subBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.postData;
          axios.post(employeeAdd, data).then(data => {
            if (data.code == "0") {
              this.$message.success("注册成功，跳转至登陆");
              this.$router.go(-1);
            } else {
              this.$message.error("该账号已存在！");
            }
          });
        }
      });
    },
    exceed: function() {
      this.$message("上传图片个数超出限制，请删除重新选择");
    },
    trus: async function(file) {
      let form = new FormData();
      form.append("file", file.raw);
      console.log(form);
      axios.post(loginUpload, form).then(data => {
        this.postData.picture = data;
        console.log(data, "lkjdafl ");
      });
      console.log("上传");
      console.log(file);
      // let a = await this.getBase64(file.raw);

      // console.log(this.form.brandLogo);
    },
    loadBtn() {
      this.$router.go(-1);
    },
    registered(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post(check, this.user).then(data => {
            if (!data) {
              this.$message.error("该账号已存在！");
            } else {
              this.$message.success("注册成功，跳转至登陆");
              this.$router.go(-1);
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
.headerImg {
  display: inline-block;
  margin: auto;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
