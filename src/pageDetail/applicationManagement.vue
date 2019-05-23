<template>
  <div v-if="this.userInfo.code">
    <div class="overallPlanning">
      <el-row>
        <el-button class="addBtn" @click="AddnewBtn" v-if="this.userInfo.code=='1'">增加</el-button>
      </el-row>
      <el-collapse>
        <el-collapse-item title="待审核" name="0" v-if="this.userInfo.code=='1'">
          <el-table :data="dataList" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
                  <el-button type="text" @click="undo(scope.row)">撤销</el-button>
                  <!-- <el-button
                    type="text"
                    v-if="this.userInfo.code=='2'"
                    @click="audit(scope.row.id)"
                  >审核</el-button>-->
                </div>
              </template>
            </el-table-column>
            <el-table-column label="申请编号" prop="applyCode"></el-table-column>
            <el-table-column label="员工编号" prop="applyUserCode"></el-table-column>
            <el-table-column label="名称" prop="applyUserName"></el-table-column>
            <el-table-column label="类型" prop="applyTypeName"></el-table-column>
            <el-table-column label="状态" prop="applySatatusName"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="待审核" v-if="this.userInfo.code=='2'" name="0">
          <el-table :data="dataList" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
                  <!-- <el-button type="text" @click="undo(scope.row)">撤销</el-button> -->
                  <el-button type="text" @click="audit(scope.row.id)">审核</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="申请编号" prop="applyCode"></el-table-column>
            <el-table-column label="员工编号" prop="applyUserCode"></el-table-column>
            <el-table-column label="名称" prop="applyUserName"></el-table-column>
            <el-table-column label="类型" prop="applyTypeName"></el-table-column>
            <el-table-column label="状态" prop="applySatatusName"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="已通过" name="1">
          <el-table :data="dataList1" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="申请编号" prop="applyCode"></el-table-column>
            <el-table-column label="员工编号" prop="applyUserCode"></el-table-column>
            <el-table-column label="名称" prop="applyUserName"></el-table-column>
            <el-table-column label="类型" prop="applyTypeName"></el-table-column>
            <el-table-column label="状态" prop="applySatatusName"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="驳回" name="2">
          <el-table :data="dataList2" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="申请编号" prop="applyCode"></el-table-column>
            <el-table-column label="员工编号" prop="applyUserCode"></el-table-column>
            <el-table-column label="名称" prop="applyUserName"></el-table-column>
            <el-table-column label="类型" prop="applyTypeName"></el-table-column>
            <el-table-column label="状态" prop="applySatatusName"></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="撤销" name="3">
          <el-table :data="dataList3" style="width: 100%" border>
            <el-table-column label="序号" type="index" width="80"></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="申请编号" prop="applyCode"></el-table-column>
            <el-table-column label="员工编号" prop="applyUserCode"></el-table-column>
            <el-table-column label="名称" prop="applyUserName"></el-table-column>
            <el-table-column label="类型" prop="applyTypeName"></el-table-column>
            <el-table-column label="状态" prop="applySatatusName"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- <el-table :data="dataList" style="width: 100%" border>
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
       <el-table-column label="类型" prop="applyTypeName"></el-table-column>
      <el-table-column label="状态" prop="applySatatusName"></el-table-column>
    </el-table>-->
    <el-dialog
      title="新增申请"
      :visible.sync="dialogVisibleAdd"
      :before-close="cancel"
      width="30%"
      center
    >
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="postData"
        ref="postData"
        :rules="rules"
      >
        <el-form-item label="申请类型:" prop="applyTypeName">
          <el-select v-model="postData.applyTypeName" placeholder="请选择">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item.value"
              :value="item.value+','+item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请日期:" prop="applyTime">
          <el-date-picker
            v-model="postData.applyTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 210px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="申请内容:" prop="applyText">
          <el-input v-model="postData.applyText"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="postBtn('postData')">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="申请详情" :visible.sync="dialogView" width="30%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="applysView">
        <el-form-item label="编号:">
          <span>{{applysView.applyUserCode}}</span>
        </el-form-item>
        <el-form-item label="姓名:">
          <span>{{applysView.applyUserName}}</span>
        </el-form-item>
        <el-form-item label="申请类型:">
          <span>{{applysView.applyTypeName}}</span>
        </el-form-item>
        <el-form-item label="申请编号:">
          <span>{{applysView.applyTypeCode}}</span>
        </el-form-item>
        <el-form-item label="申请时间:">
          <span>{{applysView.applyTime}}</span>
        </el-form-item>
        <el-form-item label="申请原因:">
          <span>{{applysView.applyText}}</span>
        </el-form-item>
        <el-form-item label="申请状态:">
          <span>{{applysView.applySatatusName}}</span>
        </el-form-item>
        <el-form-item label="审核时间:">
          <span>{{applysView.applyTime?applysView.applyTime:"暂无"}}</span>
        </el-form-item>
        <el-form-item label="审核批注:">
          <span>{{applysView.auditOpinion?applysView.auditOpinion:"暂无"}}</span>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="postBtn('postData')">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="审核意见" :visible.sync="dialogAudit" width="30%" center>
      <el-form label-position="right" label-width="100px" :inline="true" :model="applysAudit">
        <el-form-item label="编号:">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="applysAudit.auditOpinion"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="auditResults('1')">通过</el-button>
        <el-button @click="auditResults('2')">驳回</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import axios from "../api/axios.js";
import {
  applyList,
  dictionaryGetapi,
  applyAdd,
  applyUpdate,
  applyView
} from "../api/address.js";
export default {
  data() {
    return {
      applysAudit: {},
      applysView: {},
      userInfo: {},
      dialogVisibleAdd: false,
      dialogView: false,
      dialogAudit: false,
      dataList: [],
      dataList1: [],
      dataList2: [],
      dataList3: [],
      theQuery: {
        applyStatusCode: "",
        applyUserCode: "",
        pageNo: 1,
        pageSize: 20
      },
      statusList: [],
      typeList: [],
      postData: {
        applyCode: "", //申请编码
        applySatatusName: "新增", //申请状态名称
        applyStatusCode: "0", //申请状态名称
        applyText: "", //申请内容
        applyTime: "", //时间
        applyTypeCode: "", //申请类型
        applyTypeName: "",
        applyUserCode: "", //申请人
        applyUserName: "", //

        id: ""
      },
      rules: {
        applyText: [{ required: true, message: "请输入", trigger: "blur" }],

        applyTypeName: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        applyTime: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("user"));
    if (this.userInfo.code == "1") {
      this.getList(this.userInfo.userCode);
      this.getList1(this.userInfo.userCode);
      this.getList2(this.userInfo.userCode);
      this.getList3(this.userInfo.userCode);
      this.getdictionaryList();
    } else if (this.userInfo.code == "2") {
      this.getList4("0");
      this.getList5("1");
      this.getList6("2");
      this.getList7("3");
    }
  },
  methods: {
    //审核
    audit(val) {
      this.dialogAudit = true;
      axios.get(applyView + "?id=" + val).then(data => {
        console.log(data);
        this.applysAudit = data.data;
      });
    },
    //查看
    detailBtn(val) {
      this.dialogView = true;
      axios.get(applyView + "?id=" + val).then(data => {
        console.log(data);
        this.applysView = data.data;
      });
    },
    //通过驳回
    auditResults(val) {
      let myDate = new Date();
      if (val == "1") {
        this.applysAudit.applySatatusName = "已通过";
        this.applysAudit.applyStatusCode = "1";
        // this.applysAudit.auditTime = myDate.toLocaleString();
        axios.post(applyUpdate, this.applysAudit).then(data => {
          console.log(data);
          this.dialogAudit = false;
          this.getList4("0");
          this.getList5("1");
        });
        console.log(this.applysAudit);
      } else if (val == "2") {
        this.applysAudit.applySatatusName = "驳回";
        this.applysAudit.applyStatusCode = "2";
        this.applysAudit.auditTime = myDate.toLocaleString();
        axios.post(applyUpdate, this.applysAudit).then(data => {
          console.log(data);
          this.dialogAudit = false;
          this.getList4("0");
          this.getList5("2");
        });
      }
    },
    //撤销
    undo(val) {
      console.log(val);
      val.applySatatusName = "撤销";
      val.applyStatusCode = "3";
      axios.post(applyUpdate, val).then(data => {
        console.log(data);
        this.getList(this.userInfo.userCode);
      });
    },
    //关闭新增
    cancel() {
      this.dialogVisibleAdd = false;
      this.postData = {
        applyCode: "", //申请编码
        applySatatusName: "新增", //申请状态名称
        applyStatusCode: "0", //申请状态名称
        applyText: "", //申请内容
        applyTime: "", //时间
        applyTypeCode: "", //申请类型
        applyTypeName: "",
        applyUserCode: "", //申请人
        applyUserName: "", //
        id: ""
      };
    },
    //增加提交
    postBtn(formName) {
      this.$refs[formName].validate(valid => {
        //判断是否填写信息
        if (valid) {
          this.postData.applyTypeCode = this.postData.applyTypeName.split(
            ","
          )[1];
          this.postData.applyTypeName = this.postData.applyTypeName.split(
            ","
          )[0];
          this.postData.applyUserCode = this.userInfo.userCode;
          this.postData.applyUserName = this.userInfo.userName;
          console.log(this.postData);
          axios.post(applyAdd, this.postData).then(data => {
            console.log(data);
            if (data.code == "0") {
              this.dialogVisibleAdd = false;
              this.$message.success("申请成功!");
              this.postData = {
                applyCode: "", //申请编码
                applySatatusName: "新增", //申请状态名称
                applyStatusCode: "0", //申请状态名称
                applyText: "", //申请内容
                applyTime: "", //时间
                applyTypeCode: "", //申请类型
                applyTypeName: "",
                applyUserCode: "", //申请人
                applyUserName: "", //
                id: ""
              };
              this.getList(this.userInfo.userCode);
            }
          });
        }
      });
    },
    getdictionaryList() {
      axios.get(dictionaryGetapi + "?dicCode=ZD20190014").then(data => {
        console.log(data);
        this.typeList = data.data;
        console.log(this.typeList);
      });
      // axios.get(dictionaryView + "?id=10").then(data => {
      //   this.statusList = data.data.list;
      //   console.log(this.statusList);
      // });
    },
    //获取待审核列表
    getList(val) {
      let data = {
        applyStatusCode: "0",
        applyUserCode: val,
        pageNo: 1,
        pageSize: 20
      };
      console.log(data, this.theQuery);
      axios.post(applyList, data).then(data => {
        console.log(data, "?>?>?>?");
        this.dataList = data.data.dataList;
      });
    },
    //获取通过列表
    getList1(val) {
      let data = {
        applyStatusCode: "1",
        applyUserCode: val,
        pageNo: 1,
        pageSize: 20
      };
      axios.post(applyList, data).then(data => {
        this.dataList1 = data.data.dataList;
      });
    },
    //获取驳回列表
    getList2(val) {
      let data = {
        applyStatusCode: "2",
        applyUserCode: val,
        pageNo: 1,
        pageSize: 20
      };
      axios.post(applyList, data).then(data => {
        this.dataList2 = data.data.dataList;
      });
    },
    //获取撤销列表
    getList3(val) {
      let data = {
        applyStatusCode: "3",
        applyUserCode: val,
        pageNo: 1,
        pageSize: 20
      };
      axios.post(applyList, data).then(data => {
        this.dataList3 = data.data.dataList;
      });
    },
    //获取待审核列表
    getList4(val) {
      let data = {
        applyStatusCode: val,
        pageNo: 1,
        pageSize: 20
      };
      console.log(data, this.theQuery);
      axios.post(applyList, data).then(data => {
        console.log(data, "?>?>?>?");
        this.dataList = data.data.dataList;
      });
    },
    //获取已通过列表
    getList5(val) {
      let data = {
        applyStatusCode: val,
        pageNo: 1,
        pageSize: 20
      };
      console.log(data, this.theQuery);
      axios.post(applyList, data).then(data => {
        console.log(data, "?>?>?>?");
        this.dataList1 = data.data.dataList;
      });
    },
    //获取驳回列表
    getList6(val) {
      let data = {
        applyStatusCode: val,
        pageNo: 1,
        pageSize: 20
      };
      console.log(data, this.theQuery);
      axios.post(applyList, data).then(data => {
        console.log(data, "?>?>?>?");
        this.dataList2 = data.data.dataList;
      });
    },
    //获取撤销列表
    getList7(val) {
      let data = {
        applyStatusCode: val,
        pageNo: 1,
        pageSize: 20
      };
      console.log(data, this.theQuery);
      axios.post(applyList, data).then(data => {
        console.log(data, "?>?>?>?");
        this.dataList3 = data.data.dataList;
      });
    },

    AddnewBtn() {
      // this.$router.push("/Index/applicationManagementAddNew");
      this.dialogVisibleAdd = true;
    }
  }
};
</script>
<style lang="less">
.dialoBtnBox {
  text-align: center;
}
.overallPlanning {
  width: 80%;
  margin: 50px auto;
}
</style>
