<template>
  <div>
    <div></div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn" v-if="this.userInfo.code=='2'">增加</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
            <el-button
              type="text"
              v-if="userInfo.code=='2'"
              @click="mibileBtn(scope.row.id)"
            >修改</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="employeeCode"></el-table-column>
      <el-table-column label="名称" prop="employeeName"></el-table-column>
      <el-table-column label="底薪" prop="salary"></el-table-column>
      <!-- <el-table-column label="性别" prop="sex">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.sex?'女':'男'}}</span>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column label="提成(%)" prop="percentage"></el-table-column>
      <el-table-column label="罚款">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.fine?scope.row.fine:'无'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="年份" prop="year"></el-table-column>
      <el-table-column label="月份" prop="month"></el-table-column>
    </el-table>
    <el-dialog title="新增客户" :visible.sync="dialogVisibleAdd" width="30%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="员工:">
          <el-select v-model="employee" placeholder="请选择">
            <el-option
              v-for="item in employeeList"
              :key="item.code"
              :label="item.name"
              :value="item.code+','+item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="底薪:">
          <el-input v-model="postData.salary"></el-input>
        </el-form-item>

        <el-form-item label="提成(%):">
          <el-input v-model="postData.percentage"></el-input>
        </el-form-item>
        <el-form-item label="罚款:">
          <el-input v-model="postData.fine"></el-input>
        </el-form-item>
        <el-form-item label="年份:">
          <el-input v-model="postData.year"></el-input>
        </el-form-item>
        <el-form-item label="月份:">
          <el-input v-model="postData.month"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="subBtn">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="修改员工" :visible.sync="mobyleVisibleAdd" width="30%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="updateDta">
        <el-form-item label="名称:">
          <span>{{updateDta.employeeName}}</span>
        </el-form-item>
        <el-form-item label="底薪:">
          <el-input v-model="updateDta.salary" disabled></el-input>
        </el-form-item>
        <el-form-item label="提成(%):">
          <el-input v-model="updateDta.percentage"></el-input>
        </el-form-item>

        <el-form-item label="罚款:">
          <el-input v-model="updateDta.fine"></el-input>
        </el-form-item>

        <el-form-item label="年份:">
          <el-input v-model="updateDta.year"></el-input>
        </el-form-item>
        <el-form-item label="月份:">
          <el-input v-model="updateDta.month"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="updataBtn">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="员工详情" :visible.sync="dialogVisibleDetail" width="30%">
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="名称:">
          <span>{{detailDtaa.employeeName}}</span>
        </el-form-item>
        <el-form-item label="编号:">
          <span>{{detailDtaa.employeeCode}}</span>
        </el-form-item>
        <el-form-item label="底薪:">
          <span>{{detailDtaa.salary}}</span>
        </el-form-item>
        <el-form-item label="提成(%):">
          <span>{{detailDtaa.percentage}}</span>
        </el-form-item>
        <el-form-item label="罚款:">
          <span>{{detailDtaa.fine?detailDtaa.fine:"无"}}</span>
        </el-form-item>
        <el-form-item label="年份:">
          <span>{{detailDtaa.year}}</span>
        </el-form-item>
        <el-form-item label="月份:">
          <span>{{detailDtaa.month}}</span>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="quxiaoBtn">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  wagesGetList,
  employee,
  wagesAdd,
  wagesView,
  wagesUpdate
} from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      userInfo: {},
      employeeList: [],
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
      employee: "",
      postData: {
        employeeCode: "",
        employeeName: "",
        fine: "",
        id: "",
        month: "",
        percentage: "",
        salary: "",
        year: ""
      },
      theQuery: {
        pageNo: 1,
        pageSize: 20
      },
      mobyleVisibleAdd: false,
      dialogVisibleDetail: false,
      dialogVisibleAdd: false,
      dataList: []
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("user"));
    console.log(this.userInfo, "++++++++++++++++++++++");
    if (this.userInfo.code == "2") {
      this.getList(this.theQuery);
      axios.post(employee, { pageNo: 1, pageSize: 100 }).then(data => {
        console.log(data, "====");
        this.employeeList = data.data.dataList;
      });
    } else if (this.userInfo.code == "1") {
      this.theQuery.employeeCode = this.userInfo.userCode;
      this.getList(this.theQuery);
      axios.post(employee, { pageNo: 1, pageSize: 100 }).then(data => {
        console.log(data, "====");
        this.employeeList = data.data.dataList;
      });
    }
  },
  methods: {
    updataBtn() {
      axios.post(wagesUpdate, this.updateDta).then(data => {
        if (data.code == "0") {
          this.$message.success("修改成功!");
          this.mobyleVisibleAdd = false;
          this.getList(this.theQuery);
        }
      });
    },
    mibileBtn(id) {
      this.mobyleVisibleAdd = true;
      console.log(id);
      axios.get(wagesView + "?id=" + id).then(data => {
        console.log(data);
        this.updateDta = data.data;
      });
    },
    quxiaoBtn() {
      this.dialogVisibleDetail = false;
    },
    subBtn() {
      let data = this.postData;
      (data.employeeCode = this.employee.split(",")[0]),
        (data.employeeName = this.employee.split(",")[1]),
        console.log(this.postData, this.employee);
      axios.post(wagesAdd, data).then(data => {
        console.log(data);
        if (data.code == "0") {
          this.$message.success("添加成功!");
          this.dialogVisibleAdd = false;
          this.getList(this.theQuery);
        }
      });
    },
    getList(data) {
      axios.post(wagesGetList, data).then(data => {
        console.log(data);
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
      console.log(id);
      axios.get(wagesView + "?id=" + id).then(data => {
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
