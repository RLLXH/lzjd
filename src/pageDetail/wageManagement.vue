<template>
  <div>
      <div class="userWage" v-if="this.userInfo.code == '1'">
  <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="名称:">
          <span>{{postData.epmName}}</span>
        </el-form-item>
        <el-form-item label="编号:">
          <span>{{postData.epmCode}}</span>
        </el-form-item>
        <el-form-item label="基础工资:">
          <span>{{postData.baseSalary}}</span>
        </el-form-item>
        <el-form-item label="小时费:">
          <span>{{postData.cost}}</span>
        </el-form-item>
        <el-form-item label="小时绩效:">
          <span>{{postData.performance}}</span>
        </el-form-item>
      </el-form>
      </div>
    <div v-if="this.userInfo.code == '2'">
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
            <el-button type="text" @click="mibileBtn(scope.row.id)">修改</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="epmCode"></el-table-column>
      <el-table-column label="名称" prop="epmName"></el-table-column>
      <!-- <el-table-column label="密码" prop="password"></el-table-column> -->
      <el-table-column label="基础工资" prop="baseSalary"></el-table-column>
      <el-table-column label="小时费" prop="cost"></el-table-column>
      <el-table-column label="小时绩效" prop="performance"></el-table-column>
    </el-table>
    <el-dialog title="修改工资" :visible.sync="mobyleVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="名称:">
          <el-input v-model="updateDta.epmName"></el-input>
        </el-form-item>
        <el-form-item label="编号:">
          <el-input v-model="updateDta.epmCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础工资:">
          <el-input v-model="updateDta.baseSalary"></el-input>
        </el-form-item>
        <el-form-item label="小时费:">
          <el-input v-model="updateDta.cost"></el-input>
        </el-form-item>
        <el-form-item label="小时绩效:">
          <el-input v-model="updateDta.performance"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="updataBtn">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="工资详情" :visible.sync="dialogVisibleDetail" width="30%">
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="名称:">
          <span>{{detailDtaa.epmName}}</span>
        </el-form-item>
        <el-form-item label="编号:">
          <span>{{detailDtaa.epmCode}}</span>
        </el-form-item>
        <el-form-item label="基础工资:">
          <span>{{detailDtaa.baseSalary}}</span>
        </el-form-item>
        <el-form-item label="小时费:">
          <span>{{detailDtaa.cost}}</span>
        </el-form-item>
        <el-form-item label="小时绩效:">
          <span>{{detailDtaa.performance}}</span>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="quxiaoBtn">取消</el-button>
      </el-row>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import {
//   employee,
//   employeeAdd,
//   employeeView,
//   employeeUpdate,
//   loginUpload,
//   serveList,
//   serveGet,
//   correlationAdd,
//   correlationGet,
//   correlationUpdate
wageList,
wageView,
wageUpdate,
} from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
        userInfo:{},
      props: {
        label: "name",
        value: "code"
      },
      serviceList: [],
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
      serviceAss: false,
      dataList: []
    };
  },
  created() {
    this.getList(this.theQuery);
    // this.service();
    this.userInfo = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.userInfo)
    if(this.userInfo.code=="1"){
axios.get(wageView+"?id="+this.userInfo.code).then(data=>{
    console.log(data)
    this.postData = data.data
})
    }

  },
  methods: {

    updataBtn() {
      axios.post(wageUpdate, this.updateDta).then(data => {
        console.log(data);
        this.mobyleVisibleAdd = false;
         this.getList(this.theQuery);
      });
    },
    mibileBtn(id) {
      this.mobyleVisibleAdd = true;
      axios.get(wageView + "?id=" + id).then(data => {
        console.log(data);
        this.updateDta = data.data;
      });
    },
    quxiaoBtn() {
      this.dialogVisibleDetail = false;
    },
    getList(data) {
      axios.post(wageList, data).then(data => {
          console.log(data)
        this.dataList = data.data.dataList;
      });
    },
    //详情
    detailBtn(id) {
        console.log(id)
      this.dialogVisibleDetail = true;
      axios.get(wageView + "?id=" + id).then(data => {
        console.log(data);
        this.detailDtaa = data.data;
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
.userWage{
    width: 50%;
    margin: 100px auto;
    border:1px solid black
}
</style>
