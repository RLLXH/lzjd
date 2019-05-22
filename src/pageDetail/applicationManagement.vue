<template>
  <div>
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
          </div>
        </template>
      </el-table-column>
        <el-table-column label="申请编号" prop="applyCode"></el-table-column>
      <el-table-column label="员工编号" prop="applyUserCode"></el-table-column>
      <el-table-column label="名称" prop="applyUserName"></el-table-column>
      <el-table-column label="状态" prop="applySatatusName"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "../api/axios.js";
import { applyList } from "../api/address.js";
export default {
  data() {
    return {
      dataList: [],
      theQuery: {
        pageNo: 1,
        pageSize: 20
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
       let ii='${session.user.id}'
        console.log(ii,'1231231')
      axios.post(applyList, this.theQuery).then(data => {
        this.dataList = data.data.dataList;
       
      });
    },
    AddnewBtn() {
      this.$router.push("/Index/applicationManagementAddNew");
    }
  }
};
</script>
