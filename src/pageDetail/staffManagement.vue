<template>
  <div>
    <div></div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
            <el-button type="text" @click="mibileBtn(scope.row.id)">修改</el-button>
            <el-button type="text" @click="increaseService(scope.row)">服务</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="code"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <!-- <el-table-column label="密码" prop="password"></el-table-column> -->
      <el-table-column label="性别" prop="sex">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.sex?'女':'男'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="状态" prop="statusName"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
    </el-table>
    <el-dialog title="新增员工" :visible.sync="dialogVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="名称:">
          <el-input v-model="postData.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="编号:">
          <el-input v-model="postData.code"></el-input>
        </el-form-item>-->
        <el-form-item label="密码:">
          <el-input v-model="postData.password"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="postData.sex">
            <el-option value="0" label="男"></el-option>
            <el-option value="1" label="女"></el-option>
          </el-select>
          <!-- <el-input v-model="postData.sex"></el-input> -->
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="postData.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态:">
          <el-input v-model="postData.statusName"></el-input>
        </el-form-item>-->
        <el-form-item label="地址:">
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
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="subBtn">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="修改员工信息" :visible.sync="mobyleVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="名称:">
          <el-input v-model="updateDta.name"></el-input>
        </el-form-item>
        <el-form-item label="编号:">
          <el-input v-model="updateDta.code" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="updateDta.password"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <!-- <el-input v-model="updateDta.sex"> -->
          <el-select v-model="updateDta.sex">
            <el-option :value="0" label="男"></el-option>
            <el-option :value="1" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="updateDta.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-input v-model="updateDta.statusName"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="updateDta.address"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <el-upload
            action
            :on-exceed="exceed"
            :auto-upload="false"
            :limit="1"
            :on-change="trus1"
            accept="image/*"
            ref="clear"
          >
            <el-button size="small" type="primary">点击上传头像</el-button>
            <div class="headerImg">
              <img :src="updateDta.picture" alt>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="updataBtn">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="员工详情" :visible.sync="dialogVisibleDetail" width="30%">
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="名称:">
          <span>{{detailDtaa.name}}</span>
        </el-form-item>
        <el-form-item label="编号:">
          <span>{{detailDtaa.code}}</span>
        </el-form-item>
        <el-form-item label="密码:">
          <span>{{detailDtaa.password}}</span>
        </el-form-item>
        <el-form-item label="性别:">
          <span>{{detailDtaa.sex}}</span>
        </el-form-item>
        <el-form-item label="电话:">
          <span>{{detailDtaa.phone}}</span>
        </el-form-item>
        <el-form-item label="状态:">
          <span>{{detailDtaa.statusName}}</span>
        </el-form-item>
        <el-form-item label="地址:">
          <span>{{detailDtaa.address}}</span>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="quxiaoBtn">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="关联服务" :visible.sync="serviceAss" :before-close="cancel" width="60%" center>
      <el-form label-width="150px" :inline="true">
        <div v-for="(item,index) in employeeSer" :key="index">
          <el-form-item label="服务名称:">
            <el-cascader
              :options="serviceList"
              v-model="item.serviceName"
              filterable
              :show-all-levels="false"
              :props="props"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="介绍:">
            <el-input v-model="item.virtue"></el-input>
          </el-form-item>
          <el-form-item style="display: inline-block;">
            <el-button @click="deleteBtn(index)">删除</el-button>
          </el-form-item>
        </div>
        <!-- {{this.serviceList}} -->
        <div class="addBtnBox">
          <el-form-item label=" ">
            <el-button @click="addBtn" class="addBtn">添加</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="serviceSub">提交</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  employee,
  employeeAdd,
  employeeView,
  employeeUpdate,
  loginUpload,
  serveList,
  serveGet,
  correlationAdd,
  correlationGet,
  correlationUpdate
} from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      props: {
        label: "name",
        value: "code"
      },
      employeeSer: [
        {
          serviceName: [],
          virtue: ""
        }
      ],
      serviceList: [],
      employeeInfo: {
        employeeCode: "",
        employeeName: ""
      },
      updateDta: {},
      detailDtaa: {
        address: "",
        code: "",
        id: 0,
        name: "",
        password: "",
        phone: "",
        picture: "",
        sex: "",
        statusCode: "",
        statusName: ""
      },
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
      theQuery: {
        pageNo: "1",
        pageSize: "20"
      },
      mobyleVisibleAdd: false,
      dialogVisibleDetail: false,
      dialogVisibleAdd: false,
      serviceAss: false,
      dataList: []
    };
  },
  created() {
    this.getList(this.theQuery);
    this.service();
  },
  methods: {
    //关闭关联窗口
    cancel() {
      this.serviceAss = false;
      this.employeeSer = [
        {
          serviceName: [],
          virtue: ""
        }
      ];
    },
    //关联服务
    serviceSub() {
      let data = [];
      this.employeeSer.map((v, k) => {
        data.push({
          code: v.serviceName[0],
          employeeCode: this.employeeInfo.employeeCode,
          employeeName: this.employeeInfo.employeeName,
          id: "",
          serviceCode: v.serviceName[1].split(",")[1],
          serviceName: v.serviceName[1].split(",")[0],
          virtue: v.virtue
        });
      });
      console.log(data);
      axios.post(correlationUpdate, data).then(data => {
        if (data.code == "0") {
          this.$message.success("关联成功!");
          this.serviceAss = false;
          this.employeeSer = [
            {
              serviceName: [],
              virtue: ""
            }
          ];
        } else {
          this.$message.error("关联失败!");
        }
      });
    },
    //删除按钮
    deleteBtn(index) {
      if (this.employeeSer.length == 1) {
        return;
      } else {
        this.employeeSer.splice(index, 1);
      }
    },
    //添加行
    addBtn() {
      this.employeeSer.push({
        serviceName: [],
        virtue: ""
      });
    },
    service() {
      axios.post(serveList, { pageNo: 1, pageSize: 20 }).then(data => {
        this.serviceList = data.data.dataList;
        this.serviceList.map((v, k) => {
          //  console.log(v)
          axios.get(serveGet + "?serviceCode=" + v.code).then(val => {
            //  console.log(val)
            v.children = val.data;
            v.children.map((n, j) => {
              n.code = n.name + "," + n.code;
            });
          });
        });
      });
    },
    //增加服务
    increaseService(val) {
      axios.get(correlationGet + "?employeeCode=" + val.code).then(data => {
        console.log(data);
        if (data.data.length > 0) {
          this.employeeSer = [];
          data.data.map((v, k) => {
            this.employeeSer.push({
              serviceName: [v.code, v.serviceName + "," + v.serviceCode],
              virtue: v.virtue
            });
          });
        }
      });
      // this.employeeSer = [
      //   {
      //     serviceName: [],
      //     virtue: ""
      //   }
      // ];
      console.log(this.serviceList);
      this.serviceAss = true;
      this.employeeInfo.employeeName = val.name;
      this.employeeInfo.employeeCode = val.code;
      console.log(this.employeeInfo, val);
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
    trus1: async function(file) {
      let form = new FormData();
      form.append("file", file.raw);
      console.log(form);
      axios.post(loginUpload, form).then(data => {
        this.updateDta.picture = data;
        console.log(data, "lkjdafl ");
      });
      console.log("上传");
      console.log(file);
      // let a = await this.getBase64(file.raw);

      // console.log(this.form.brandLogo);
    },
    updataBtn() {
      axios.post(employeeUpdate, this.updateDta).then(data => {
        console.log(data);
        this.mobyleVisibleAdd = false;
      });
    },
    mibileBtn(id) {
      this.mobyleVisibleAdd = true;
      axios.get(employeeView + "?id=" + id).then(data => {
        console.log(data);
        this.updateDta = data.data;
      });
    },
    quxiaoBtn() {
      this.dialogVisibleDetail = false;
    },
    subBtn() {
      let data = this.postData;
      axios.post(employeeAdd, data).then(data => {
        console.log(data);
        this.dialogVisibleAdd = false;
        this.getList(this.theQuery);
      });
    },
    getList(data) {
      axios.post(employee, data).then(data => {
        this.dataList = data.data.dataList;
      });
    },
    //新增
    AddnewBtn() {
      this.dialogVisibleAdd = true;
    },
    //详情
    detailBtn(id) {
      this.dialogVisibleDetail = true;
      axios.get(employeeView + "?id=" + id).then(data => {
        console.log(data);
        this.detailDtaa = data.data;
      });
    }
  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.dialoBtnBox {
  text-align: center;
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
