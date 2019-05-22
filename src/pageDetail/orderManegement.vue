<template>
  <div>
    <div class="overallPlanning" v-if="this.state == '0'">
      <el-collapse>
        <el-collapse-item class="forThePayment" title="待付款" name="1">
          <el-table :data="forThePayment" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                  <el-button type="text" @click="forThePaymentModify(scope.row.id)">修改</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="时长" prop="time"></el-table-column>
             <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"待付款"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="待确认" name="2">
          <el-table :data="paymentHasBeen" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="时长" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"待确认"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="待评价" name="3">
          <el-table :data="roEvaluate" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                  <el-button type="text" @click="commentStateWidow(scope.row)">评价</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="时长" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"待评价"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="已完成" name="4">
          <el-table :data="hasBeenCompleted" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="时长" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"已完成"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="overallPlanning" v-if="this.state == '1'">
      <el-collapse>
        <el-collapse-item title="待确认" name="2">
          <el-table :data="paymentHasBeen" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                  <el-button type="text" @click="affirm(scope.row.id)">确认</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="次数" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"待确认"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="待评价" name="3">
          <el-table :data="roEvaluate" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="次数" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"待评价"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="已完成" name="4">
          <el-table :data="hasBeenCompleted" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="次数" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"已完成"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="overallPlanning" v-if="this.state == '2'">
      <el-collapse>
        <el-collapse-item class="forThePayment" title="待付款" name="1">
          <el-table :data="forThePayment" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                  <el-button type="text" @click="forThePaymentModify(scope.row.id)">修改</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="次数" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"待付款"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="待确认" name="2">
          <el-table :data="paymentHasBeen" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                  <el-button type="text" @click="affirm(scope.row.id)">确认</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="次数" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"待确认"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="待评价" name="3">
          <el-table :data="roEvaluate" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="次数" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"待评价"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="已完成" name="4">
          <el-table :data="hasBeenCompleted" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="forThePaymentView(scope.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="服务类型" prop="serviceName"></el-table-column>
            <el-table-column label="次数" prop="time"></el-table-column>
            <el-table-column label="单位" prop="unit"></el-table-column>
            <el-table-column label="总金额" prop="cost"></el-table-column>
            <el-table-column label="状态">{{"已完成"}}</el-table-column>
            <el-table-column label="时间" prop="startDate"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 订单详情 -->
    <el-dialog title="订单详情" :visible.sync="forThePaymentViewState" width="50%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="orderView">
        <el-form-item label="日期 : ">
          <span>{{orderView.startDate}}</span>
        </el-form-item>

        <el-form-item label="类型 : ">
          <span>{{orderView.serviceName}}</span>
        </el-form-item>
        <el-form-item label="时间 : ">
          <span>{{orderView.time}}</span>
        </el-form-item>
        <el-form-item label="地址 : ">
          <span>{{orderView.address}}</span>
        </el-form-item>
        <el-form-item label="备注 : ">
          <span>{{orderView.text}}</span>
        </el-form-item>
        <el-form-item label="单价 : ">
          <span>{{orderView.price}}</span>
        </el-form-item>
        <el-form-item label="总价 : ">
          <span>{{orderView.cost}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 订单修改 -->
    <el-dialog title="订单修改" :visible.sync="forThePaymentModifyState" width="50%" center>
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="orderModify"
        :rules="rules"
        ref="orderModify"
      >
        <el-form-item label="选择日期:" prop="startDate">
          <el-date-picker
            v-model="orderModify.startDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="服务名称 :" prop="serviceName">
          <el-select v-model="orderModify.serviceName" placeholder>
            <el-option
              v-for="(item,index) in serviceType"
              :key="index"
              :label="item.value"
              :value="item.id+','+item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作时间 : " prop="time">
          <el-input
            v-model="orderModify.time"
            maxlength="2"
            oninput="value=value.replace(/[^\d]/g,'')"
            @input="calculate()"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址 : " prop="address">
          <el-input v-model="orderModify.address"></el-input>
        </el-form-item>
        <el-form-item label="备注 : " prop="text">
          <el-input type="textarea" v-model="orderModify.text"></el-input>
        </el-form-item>
        <el-form-item label="单价 : " prop="houseName">
          <span>{{this.orderModify.price}}</span>
        </el-form-item>
        <el-form-item label="总价 : " prop="houseName">
          <span>{{this.orderModify.cost}}</span>
        </el-form-item>
        <el-row class="dialoBtnBox">
          <el-button @click="subBtn('orderModify')">保存</el-button>
          <el-button @click="payment('orderModify')">付款</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 评论订单 -->
    <el-dialog title="评论" :visible.sync="commentState" width="50%" center>
      <el-form label-position="right" :inline="true" :model="comment" :rules="rules" ref="comment">
        <el-form-item label="满意度 :" prop="satisfaction">
          <el-select v-model="comment.satisfaction" placeholder>
            <el-option
              v-for="(item,index) in evaluate"
              :key="index"
              :label="item.value"
              :value="item.id+','+item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <p>文字评论:</p>
        <el-input class="satisfaction" type="textarea" v-model="comment.comment"></el-input>
        <el-upload
          class="upload-demo"
          action
          :show-file-list="false"
          :auto-upload="false"
          multiple
          list-type="picture"
          :on-change="getMainImg"
        >
          <el-button size="small" type="primary">图片评论</el-button>
        </el-upload>
        <div class="img">
          <img :src="this.imgPath" alt>
        </div>
        <div class="commentBtn">
          <el-button @click="commentBtn('comment')">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
    <div class="money" v-if="this.imgState">
      <img src="../assets/二维码.png" alt>
    </div>
  </div>
</template>
<script>
import {
  oderList,
  oderView,
  dictionaryGetapi,
  oderUpdate,
  loginUpload,
  add
} from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      commentInfo: {},
      oderCode: "",
      employeesCode: "",
      imgPath: "",
      evaluate: [],
      imgState: false,
      state: "",
      forThePayment: [],
      paymentHasBeen: [],
      roEvaluate: [],
      hasBeenCompleted: [],
      //评论弹窗
      commentState: false,
      //评论
      comment: {
        comment: "",
        satisfaction: ""
      },
      //服务类型
      serviceType: [],
      //待付款查看
      forThePaymentViewState: false,
      //待付款修改
      forThePaymentModifyState: false,
      //查看订单详情
      orderView: {},
      //修改订单详情
      orderModify: {},
      rules: {
        startDate: [{ required: true, message: "请输入", trigger: "blur" }],
        serviceName: [{ required: true, message: "请输入", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        serviceName: [{ required: true, message: "请选择", trigger: "change" }],
        time: [{ required: true, message: "请选择", trigger: "change" }],
        satisfaction: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  created() {
    this.state = JSON.parse(sessionStorage.getItem("user")).code;
    if (this.state == "0") {
      this.forThePaymentMessage();
      this.paymentHasBeenMessage();
      this.roEvaluateMessage();
      this.hasBeenCompletedMessage();
      axios.get(dictionaryGetapi + "?dicCode=" + "ZD20190016").then(data => {
        console.log(data);
        this.serviceType = data.data;
      });
    } else if (this.state == "1") {
      this.staffPaymentHasBeenMessage();
      this.staffRoEvaluateMessage();
      this.staffHasBeenCompletedMessage();
    } else if (this.state == "2") {
      this.adminForThePaymentMessage();
      this.adminPaymentHasBeenMessage();
      this.adminRoEvaluateMessage();
      this.adminHasBeenCompletedMessage();
    }
    axios.get(dictionaryGetapi + "?dicCode=" + "ZD20190015").then(data => {
      this.evaluate = data.data;
    });
  },
  methods: {
    //查看详情ajax
    getView(val) {
      axios.get(oderView + "?id=" + val).then(data => {
        this.orderView = data.data;
      });
    },
    //修改获取详情ajax
    getModify(val) {
      axios.get(oderView + "?id=" + val).then(data => {
        this.orderModify = data.data;
        this.orderModify.serviceName =
          data.data.serviceCode + "," + data.data.serviceName;
      });
    },
    //客户获取列表
    //待付款列表
    forThePaymentMessage() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let val = {
        customerCode: user.userCode,
        pageNo: 1,
        pageSize: 5,
        statusCode: "0"
      };
      axios.post(oderList, val).then(data => {
        this.forThePayment = data.data.dataList;
      });
    },
    //待付款查看
    forThePaymentView(val) {
      this.getView(val);
      this.forThePaymentViewState = true;
    },
    //待付款修改
    forThePaymentModify(val) {
      this.getModify(val);
      this.forThePaymentModifyState = true;
    },
    //计算价格
    calculate() {
      this.orderModify.cost = this.orderModify.time * this.orderModify.price;
    },
    //待付款修改保存
    subBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.orderModify);
          this.orderModify.serviceCode = this.orderModify.serviceName.split(
            ","
          )[0];
          this.orderModify.serviceName = this.orderModify.serviceName.split(
            ","
          )[1];
          axios.post(oderUpdate, this.orderModify).then(data => {
            if (data.code == "0") {
              this.$message.success("修改成功!");
              this.forThePaymentModifyState = false;
            }
          });
        }
      });
    },
    //待付款付款
    payment(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.orderModify);
          this.orderModify.serviceCode = this.orderModify.serviceName.split(
            ","
          )[0];
          this.orderModify.serviceName = this.orderModify.serviceName.split(
            ","
          )[1];
          (this.orderModify.statusCode = "1"),
            (this.orderModify.statusName = "待确认"),
            axios.post(oderUpdate, this.orderModify).then(data => {
              if (data.code == "0") {
                this.imgState = true;
                setTimeout(() => {
                  this.imgState = false;
                  this.$message.success("付款成功!");
                  this.forThePaymentMessage();
                  this.paymentHasBeenMessage();
                  this.forThePaymentModifyState = false;
                }, 3000);
              }
            });
        }
      });
    },
    //已付款列表
    paymentHasBeenMessage() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let val = {
        customerCode: user.userCode,
        pageNo: 1,
        pageSize: 5,
        statusCode: "1"
      };
      axios.post(oderList, val).then(data => {
        console.log(data);
        this.paymentHasBeen = data.data.dataList;
      });
    },
    //待评价列表
    roEvaluateMessage() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let val = {
        customerCode: user.userCode,
        pageNo: 1,
        pageSize: 5,
        statusCode: "2"
      };
      axios.post(oderList, val).then(data => {
        // console.log(data);
        this.roEvaluate = data.data.dataList;
      });
    },
    //完成列表
    hasBeenCompletedMessage() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let val = {
        customerCode: user.userCode,
        pageNo: 1,
        pageSize: 5,
        statusCode: "3"
      };
      axios.post(oderList, val).then(data => {
        // console.log(data);
        this.hasBeenCompleted = data.data.dataList;
      });
    },
    //员工获取列表
    //已付款列表
    staffPaymentHasBeenMessage() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let val = {
        employeeCode: user.userCode,
        pageNo: 1,
        pageSize: 5,
        statusCode: "1"
      };
      axios.post(oderList, val).then(data => {
        console.log(data);
        this.paymentHasBeen = data.data.dataList;
      });
    },
    //待评价列表
    staffRoEvaluateMessage() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let val = {
        employeeCode: user.userCode,
        pageNo: 1,
        pageSize: 5,
        statusCode: "2"
      };
      axios.post(oderList, val).then(data => {
        // console.log(data);
        this.roEvaluate = data.data.dataList;
      });
    },
    //完成列表
    staffHasBeenCompletedMessage() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let val = {
        employeeCode: user.userCode,
        pageNo: 1,
        pageSize: 5,
        statusCode: "3"
      };
      axios.post(oderList, val).then(data => {
        // console.log(data);
        this.hasBeenCompleted = data.data.dataList;
      });
    },
    //确认订单
    affirm(val) {
      console.log(val);
      axios.get(oderView + "?id=" + val).then(data => {
        console.log(data.data);
        data.data.statusCode = "2";
        data.data.statusName = "待评价";
        axios.post(oderUpdate, data.data).then(data => {
          if (data.code == "0") {
            this.$message.success("确认成功!");
            this.staffPaymentHasBeenMessage();
            this.staffRoEvaluateMessage();
          }
        });
      });
    },
    //管理员获取列表
    adminForThePaymentMessage() {
      let val = {
        pageNo: 1,
        pageSize: 5,
        statusCode: "0"
      };
      axios.post(oderList, val).then(data => {
        this.forThePayment = data.data.dataList;
      });
    },
    //已付款列表
    adminPaymentHasBeenMessage() {
      let val = {
        pageNo: 1,
        pageSize: 5,
        statusCode: "1"
      };
      axios.post(oderList, val).then(data => {
        console.log(data);
        this.paymentHasBeen = data.data.dataList;
      });
    },
    //待评价列表
    adminRoEvaluateMessage() {
      let val = {
        pageNo: 1,
        pageSize: 20,
        statusCode: "2"
      };
      axios.post(oderList, val).then(data => {
        this.roEvaluate = data.data.dataList;
      });
    },
    //完成列表
    adminHasBeenCompletedMessage() {
      let val = {
        pageNo: 1,
        pageSize: 5,
        statusCode: "3"
      };
      axios.post(oderList, val).then(data => {
        // console.log(data);
        this.hasBeenCompleted = data.data.dataList;
      });
    },
    //评论弹窗
    commentStateWidow(val) {
      this.commentInfo = val;
      this.employeesCode = val.employeeCode;
      this.oderCode = val.code;
      this.commentState = true;
    },
    //上传图片
    getMainImg(file) {
      console.log(file);
      let formData = new FormData();
      formData.append("file", file.raw);
      axios.post(loginUpload, formData).then(data => {
        console.log(data);
        this.imgPath = data;
      });
    },
    //提交评论
    commentBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let user = JSON.parse(sessionStorage.getItem("user"));
          let data = {
            customerCode: user.userCode,
            employeesCode: this.employeesCode,
            oderCode: this.oderCode,
            picture: this.imgPath,
            scoreCode: this.comment.satisfaction.split(",")[0],
            scoreName: this.comment.satisfaction.split(",")[1],
            text: this.comment.comment
          };
          axios.post(add, data).then(data => {
            console.log(data);
            if (data.code == "0") {
              (this.commentInfo.statusCode = "3"),
                (this.commentInfo.statusName = "已完成"),
                axios.post(oderUpdate, this.commentInfo).then(data => {
                  if (data.code == "0") {
                    this.$message.success("评论成功!");
                    this.roEvaluateMessage();
                    this.hasBeenCompletedMessage();
                    this.commentState = false;
                    this.comment.satisfaction = "";
                    this.comment.comment = "";
                    this.imgPath = "";
                  }
                });
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.addBtn {
  margin: 10px 0px;
}
.dialoBtnBox {
  text-align: center;
}
span {
  width: 200px;
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
.overallPlanning {
  width: 80%;
  margin: 50px auto;
}
.satisfaction {
  margin: 10px auto;
}
.commentBtn {
  display: flex;
  justify-content: center;
}
.img {
  img {
    width: 300px;
    height: 300px;
  }
  margin-top: 10px;
}
</style>
