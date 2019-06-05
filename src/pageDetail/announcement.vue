<template>
  <div>
    <div v-if="this.userInfo.code=='2'">
      <el-row>
        <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
      </el-row>
      <el-table :data="dataList" style="width: 100%" border>
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="操作" width="190">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="detailBtnGm(scope.row.id)">查看</el-button>
              <el-button type="text" @click="mibileBtn(scope.row.id)">修改</el-button>
              <el-button type="text" @click="AnnDelete(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="code"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="内容" prop="text"></el-table-column>
        <el-table-column label="开始时间" prop="startDate"></el-table-column>
        <el-table-column label="结束时间" prop="endDate"></el-table-column>
      </el-table>
      <el-dialog title="新增公告" :visible.sync="dialogVisibleAdd" width="20%" center>
        <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
          <el-form-item label="编号:">
            <el-input v-model="postData.code"></el-input>
          </el-form-item>
          <el-form-item label="选择日期:">
            <el-date-picker
              v-model="postData.time"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 210px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="标题:">
            <el-input v-model="postData.title"></el-input>
          </el-form-item>
          <el-form-item label="内容:">
            <el-input v-model="postData.text"></el-input>
          </el-form-item>
        </el-form>
        <el-row class="dialoBtnBox">
          <el-button @click="subBtn">提交</el-button>
        </el-row>
      </el-dialog>
      <el-dialog title="修改公告" :visible.sync="mobyleVisibleAdd" width="20%" center>
        <el-form label-position="right" label-width="100px" :inline="true" :model="updateDta">
          <el-form-item label="编号:">
            <el-input v-model="updateDta.code"></el-input>
          </el-form-item>
          <el-form-item label="选择日期:">
            <el-date-picker
              v-model="updateDta.time"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 210px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="标题:">
            <el-input v-model="updateDta.title"></el-input>
          </el-form-item>
          <el-form-item label="内容:">
            <el-input v-model="updateDta.text"></el-input>
          </el-form-item>
        </el-form>
        <el-row class="dialoBtnBox">
          <el-button @click="updataBtn">提交</el-button>
        </el-row>
      </el-dialog>
    </div>

    <!-- 用户查看 -->
    <el-table
      :data="dataList"
      v-if="this.userInfo.code=='1'||this.userInfo.code=='0'"
      style="width: 100%"
      :show-header="false"
      @row-click="detailBtn"
    >
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="内容" prop="text"></el-table-column>
      <el-table-column label="编号"></el-table-column>
      <el-table-column label="标题"></el-table-column>

      <el-table-column label="开始时间" prop="startDate"></el-table-column>
    </el-table>
    <!-- 公告详情 -->
    <el-dialog title="公告详情" :visible.sync="dialogVisibleDetail" width="30%">
      <el-form label-position="right" label-width="100px" :inline="true" :model="postData">
        <el-form-item label="编号:">
          <span>{{detailDtaa.code}}</span>
        </el-form-item>
        <el-form-item label="标题:">
          <span>{{detailDtaa.title}}</span>
        </el-form-item>
        <el-form-item label="内容:">
          <span>{{detailDtaa.text}}</span>
        </el-form-item>
        <el-form-item label="开始时间:">
          <span>{{detailDtaa.startDate}}</span>
        </el-form-item>
        <el-form-item label="结束时间:">
          <span>{{detailDtaa.endDate}}</span>
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
  noticeAdd,
  noticeList,
  noticeView,
  noticeUpdate,
  noticeDelete
} from "../api/address.js";
import axios from "../api/axios.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapmutations } = createNamespacedHelpers(
  "loadingstore"
);
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
        code: "",
        time: "",
        id: 0,
        text: "",
        title: ""
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
    if (JSON.parse(sessionStorage.getItem("user"))) {
      this.setuserInfo(JSON.parse(sessionStorage.getItem("user")));
    }
  },
  computed: {
    ...mapState(["loadingData", "userInfo"])
  },
  methods: {
    ...mapActions(["setloadingData", "setuserInfo"]),
    updataBtn() {
      let data = {
        code: this.updateDta.code,
        endDate: this.updateDta.time[1],
        id: this.updateDta.id,
        startDate: this.updateDta.time[0],
        text: this.updateDta.text,
        title: this.updateDta.title
      };
      axios.post(noticeUpdate, this.data).then(data => {
        console.log(data);
        this.mobyleVisibleAdd = false;
      });
    },
    mibileBtn(id) {
      this.mobyleVisibleAdd = true;
      axios.get(noticeView + "?id=" + id).then(data => {
        console.log(data);
        this.updateDta = data.data;
        this.updateDta.time = [
          this.updateDta.startDate,
          this.updateDta.endDate
        ];
      });
    },
    quxiaoBtn() {
      this.dialogVisibleDetail = false;
    },
    subBtn() {
      let data = {
        code: this.postData.code,
        endDate: this.postData.time[1],
        id: this.postData.id,
        startDate: this.postData.time[0],
        text: this.postData.text,
        title: this.postData.title
      };
      axios.post(noticeAdd, data).then(data => {
        console.log(data);
        this.dialogVisibleAdd = false;
        // this.getList(this.theQuery);
      });
    },
    getList(data) {
      axios.post(noticeList, data).then(data => {
        console.log(data);
        this.dataList = data.data.dataList;
      });
    },
    //新增
    AddnewBtn() {
      this.dialogVisibleAdd = true;
    },
    //详情
    detailBtn(row) {
      this.dialogVisibleDetail = true;
      axios.get(noticeView + "?id=" + row.id).then(data => {
        console.log(data);
        this.detailDtaa = data.data;
      });
    },
    //删除公告
    AnnDelete(id){
      axios.get(noticeDelete+"?id="+id).then(data=>{
        if(data.code=="0"){
          this.$message.success("删除成功!");
          this.getList(this.theQuery);
        }
      })
    },
    //管理员详情
    detailBtnGm(val) {
      this.dialogVisibleDetail = true;
      axios.get(noticeView + "?id=" + val).then(data => {
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
</style>
