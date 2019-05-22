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
            <el-button type="text" @click="detailBtn(scope.row.customerCode)">查看</el-button>
            <el-button type="text" @click="mibileBtn(scope.row.customerCode)">修改</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="customerCode"></el-table-column>
      <el-table-column label="名称" prop="customerName"></el-table-column>
      <el-table-column label="密码" prop="customerPassword"></el-table-column>
      <!-- <el-table-column label="性别" prop="sex">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.sex?'女':'男'}}</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="电话" prop="telephone"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
    </el-table>
    <el-dialog title="新增客户" :visible.sync="dialogVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="客户名称:">
          <el-input v-model="postData.customerName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="编号:">
          <el-input v-model="postData.code"></el-input>
        </el-form-item>-->
        <el-form-item label="客户密码:">
          <el-input v-model="postData.customerPassword"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="postData.telephone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态:">
          <el-input v-model="postData.statusName"></el-input>
        </el-form-item>-->
        <el-form-item label="地址:">
          <el-input v-model="postData.address"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="subBtn">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="修改员工" :visible.sync="mobyleVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="名称:">
          <el-input v-model="updateDta.customerName"></el-input>
        </el-form-item>
        <el-form-item label="编号:">
          <el-input v-model="updateDta.customerCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="updateDta.customerPassword"></el-input>
        </el-form-item>

        <el-form-item label="电话:">
          <el-input v-model="updateDta.telephone"></el-input>
        </el-form-item>

        <el-form-item label="地址:">
          <el-input v-model="updateDta.address"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="updataBtn">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="员工详情" :visible.sync="dialogVisibleDetail" width="30%">
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="名称:">
          <span>{{detailDtaa.customerName}}</span>
        </el-form-item>
        <el-form-item label="编号:">
          <span>{{detailDtaa.customerCode}}</span>
        </el-form-item>
        <el-form-item label="密码:">
          <span>{{detailDtaa.customerPassword}}</span>
        </el-form-item>
        <el-form-item label="电话:">
          <span>{{detailDtaa.telephone}}</span>
        </el-form-item>
        <el-form-item label="地址:">
          <span>{{detailDtaa.address}}</span>
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
  employee,
  employeeAdd,
  employeeView,
  employeeUpdate,
  loginUpload,
  serveList,
  serveGet,//删除
  customerAdd,
  custormerList,
  custormerView,
  custormerUpdate
} from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
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
        customerCode :"",
        customerName :"",
        customerPassword :"",
        id:"",
        telephone :""
      },
      theQuery: {
        pageNo: "1",
        pageSize: "20"
      },
      mobyleVisibleAdd: false,
      dialogVisibleDetail: false,
      dialogVisibleAdd: false,
      dataList: []
    };
  },
  created() {
    this.getList(this.theQuery);
  },
  methods: {
    updataBtn() {
      axios.post(custormerUpdate, this.updateDta).then(data => {
        if(data.code == "0"){
         this.$message.success("修改成功!");
        this.mobyleVisibleAdd = false;
                this.getList(this.theQuery);
        }

      });
    },
    mibileBtn(id) {
      this.mobyleVisibleAdd = true;
      axios.get(custormerView + "?code=" + id).then(data => {
        console.log(data);
        this.updateDta = data.data;
 
      });
    },
    quxiaoBtn() {
      this.dialogVisibleDetail = false;
    },
    subBtn() {
      let data = this.postData;
      axios.post(customerAdd, data).then(data => {
        console.log(data);
        if(data.code=="0"){
           this.$message.success("添加成功!");
                   this.dialogVisibleAdd = false;
        this.getList(this.theQuery);
        }

      });
    },
    getList(data) {
      axios.post(custormerList, data).then(data => {
        console.log(data)
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
      axios.get(custormerView + "?code=" + id).then(data => {
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
