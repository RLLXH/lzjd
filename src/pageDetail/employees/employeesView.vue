<template>
  <div class="all">
    <div class="info">
      <div class="photo">
        <img :src="this.employeeInfo.picture">
      </div>
      <div class="theText">
        <div>保洁员姓名:{{this.employeeInfo.name}}</div>
        <div>地址:{{this.employeeInfo.address}}</div>
        <div>电话:{{this.employeeInfo.phone}}</div>
      </div>
    </div>
    <div class="evaluation">
      <p>保洁员评价:</p>
    </div>
    <div class="button">
      <el-button @click="reservation()">预约</el-button>
      <el-button @click="exit()">返回</el-button>
    </div>
    <el-dialog
      title="预约保洁员"
      :visible.sync="dialogVisibleAdd"
      :before-close="cancel"
      width="50%"
      center
    >
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="reservationInfo"
        :rules="rules"
        ref="reservationInfo"
      >
        <el-form-item label="开始时间:" prop="day">
          <el-date-picker
            v-model="reservationInfo.day"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="服务名称 :" prop="serviceName">
    {{reservationInfo.serviceName}}
        </el-form-item>
        <el-form-item label="次数 : " prop="time">
          <el-input
            v-model="reservationInfo.time"
            maxlength="2"
            oninput="value=value.replace(/[^\d]/g,'')"
            @input="calculate()"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址 : " prop="address">
          <el-input v-model="reservationInfo.address"></el-input>
        </el-form-item>
            <el-form-item label="单位 : " prop="unit">
         <span style="width:200px;display:block">{{reservationInfo.unit}}</span>
        </el-form-item>
        <el-form-item label="备注 : " prop="houseName">
          <el-input type="textarea" v-model="reservationInfo.note"></el-input>
        </el-form-item>
        <el-form-item label="单价 : " prop="houseName">
          <span>{{this.cost}}</span>
        </el-form-item>
        <el-form-item label="总价 : " prop="houseName">
          <span>{{this.totalPrice}}</span>
        </el-form-item>
        <el-row class="button">
          <el-button @click="subBtn('reservationInfo')">创建</el-button>
          <el-button @click="payment('reservationInfo')">付款</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <div class="money" v-if="this.imgState">
      <img src="../../assets/二维码.png" alt>
    </div>
  </div>
</template>
<script>
import { employeeView, dictionaryGetapi, oderAdd } from "../../api/address.js";
import axios from "../../api/axios.js";
import { createNamespacedHelpers } from "vuex";
import { setTimeout } from "timers";
const { mapState, mapActions, mapmutations } = createNamespacedHelpers(
  "loadingstore"
);
export default {
  data() {
    return {
      imgState: false,
      employeeInfo: {},
      dialogVisibleAdd: false,
      cost: 10,
      totalPrice: 0,
      reservationInfo: {
        day: "",
        serviceName: "",
        serviceCode :"",
        time: "",
        address: "",
        note: "",
        unit:"",

      },
      rules: {
        time: [{ required: true, message: "请输入", trigger: "blur" }],
        day: [{ required: true, message: "请输入", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        serviceName: [{ required: true, message: "请选择", trigger: "change" }],
        unit: [{ required: true, message: "请输入", trigger: "blur" }],
      }
    };
  },
  created() {
    axios.get(employeeView + "?id=" + this.$route.query.id).then(data => {
      this.employeeInfo = data.data;
    });
console.log(this.$route.query.data)
this.reservationInfo.serviceName=this.$route.query.data.name;
this.reservationInfo.serviceCode=this.$route.query.data.code;
this.reservationInfo.unit=this.$route.query.data.unit;
  },
  methods: {
    //计算总价
    calculate() {
      //算日期间天数
      // let a = (new Date(this.reservationInfo.day[1])-new Date(this.reservationInfo.day[0]))/(24*60*60*1000);
      this.totalPrice = this.reservationInfo.time * this.cost;
    },
    //退出
    exit() {
      this.$router.go(-1);
    },
    //预约
    reservation() {
      this.dialogVisibleAdd = true;
    },
    //提交
    subBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let user = JSON.parse(sessionStorage.getItem("user"));
          console.log(user, this.serviceType);
          let data = {
            address: this.reservationInfo.address,
            code: "",
            cost: this.totalPrice,
            customerCode: user.userCode,
            customerName: user.userName,
            employeeCode: this.employeeInfo.code,
            employeeName: this.employeeInfo.name,
            id: "",
            price: this.cost,
            serviceCode: this.reservationInfo.serviceCode,
            serviceName: this.reservationInfo.serviceName,
            startDate: this.reservationInfo.day,
            statusCode: "0",
            statusName: "待付款",
            text: this.reservationInfo.note,
            time: this.reservationInfo.time - 0,
            unit:this.reservationInfo.unit
          };
          console.log(data);
          axios.post(oderAdd, data).then(data => {
            console.log(data);
            if (data.code == "0") {
              this.$message.success("创建成功!");
              this.dialogVisibleAdd = false;
              this.reservationInfo.day = "";
              this.reservationInfo.time = "";
              this.reservationInfo.serviceName = "";
              this.reservationInfo.address = "";
              this.reservationInfo.note = "";
            }
          });
        }
      });
    },
    //付款
    payment(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let user = JSON.parse(sessionStorage.getItem("user"));
          console.log(user, this.serviceType);
          let data = {
            address: this.reservationInfo.address,
            code: "",
            cost: this.totalPrice,
            customerCode: user.userCode,
            customerName: user.userName,
            employeeCode: this.employeeInfo.code,
            employeeName: this.employeeInfo.name,
            id: "",
            price: this.cost,
            serviceCode:  this.reservationInfo.serviceCode,
            serviceName:  this.reservationInfo.serviceName,
            startDate: this.reservationInfo.day,
            statusCode: "1",
            statusName: "待付款",
            text: this.reservationInfo.note,
            time: this.reservationInfo.time - 0
          };
          console.log(data);
          axios.post(oderAdd, data).then(data => {
            console.log(data);
            if (data.code == "0") {
              this.imgState = true;
              setTimeout(() => {
                this.imgState = false;
                this.$message.success("付款成功!");
                this.dialogVisibleAdd = false;
                this.reservationInfo.day = "";
                this.reservationInfo.time = "";
                this.reservationInfo.serviceName = "";
                this.reservationInfo.address = "";
                this.reservationInfo.note = "";
              }, 3000);
            }
          });
        }
      });
    },
    //关闭弹窗
    cancel() {
      this.dialogVisibleAdd = false;
      this.reservationInfo.day = "";
      this.reservationInfo.time = "";
      this.reservationInfo.serviceName = "";
      this.reservationInfo.address = "";
      this.reservationInfo.note = "";
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  width: 60%;
  margin: 0 auto;
  .theText {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    //   border: 1px solid black;
    margin-left: 50px;
  }
  .photo {
    //   border: 1px solid black;
    img {
      width: 250px;
      height: 300px;
    }
  }
}

.evaluation {
  width: 60%;
  height: 200px;
  margin: 0 auto;
  border: 1px solid black;
}
.button {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.money {
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -150px 0 0 -150px;
  z-index: 999999;
}
</style>
