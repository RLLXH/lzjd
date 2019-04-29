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
          </div>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="code"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
    </el-table>
    <el-dialog title="新增字典" :visible.sync="dialogVisibleAdd" width="60%" center>
      <el-form :model="postData" :rules="rules" ref="postData">
        <el-form-item label="字典名称 :" prop="name">
          <el-input v-model="postData.name" placeholder="字典名称"></el-input>
        </el-form-item>
        <el-table
          :data="postData.list"
          size="mini"
          highlight-current-row
          border
          max-height="250"
          style="width: 100%"
          class="el-tb-edit"
          ref="demoTable"
        >
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column label="名字">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dictionaryContent" label="显示内容">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.value" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="AddDomoBtn">加一</el-button>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="subBtn">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="修改字典" :visible.sync="mobyleVisibleAdd" width="60%" center>
      <el-form :model="updateDta" :rules="rules" ref="updateDta">
        <el-form-item label="字典名称 :" prop="name">
          <el-input v-model="updateDta.name" placeholder="字典名称"></el-input>
        </el-form-item>
        <el-table
          :data="updateDta.list"
          size="mini"
          highlight-current-row
          border
          max-height="250"
          style="width: 100%"
          class="el-tb-edit"
          ref="demoTable"
        >
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column label="名字">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dictionaryContent" label="显示内容">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.value" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="detaleUpdate(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="AddDomoBtn1">加一</el-button>
      </el-form>

      <el-row class="dialoBtnBox">
        <el-button @click="updataBtn">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="字典详情" :visible.sync="dialogVisibleDetail" width="30%">
      <el-form :model="detailDtaa" :rules="rules" ref="detailDtaa">
        <el-form-item label="字典名称 :" prop="name">
          <span>{{detailDtaa.name}}</span>
        </el-form-item>
        <el-table
          :data="detailDtaa.list"
          size="mini"
          highlight-current-row
          border
          max-height="250"
          style="width: 100%"
          class="el-tb-edit"
          ref="demoTable"
        >
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column label="名字" prop="name"></el-table-column>
          <el-table-column prop="value" label="显示内容"></el-table-column>
        </el-table>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="quxiaoBtn">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  dictionaryAdd,
  dictionaryList,
  dictionaryView,
  dictionaryUpdate
} from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }]
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
        // code: "string",
        // id: 0,
        list: [
          {
            dicCode: "",
            id: 0,
            name: "",
            value: ""
          }
        ],
        name: ""
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
    AddDomoBtn() {
      var d = {
        dicCode: "",
        id: 0,
        name: "",
        value: ""
      };
      this.postData.list.push(d);
    },
    AddDomoBtn1() {
      var d = {
        dicCode: "",
        id: 0,
        name: "",
        value: ""
      };
      this.updateDta.list.push(d);
    },
    handleDelete(index, r) {
      this.postData.list.splice(index, 1);
    },
    detaleUpdate(index, r) {
      this.updateDta.list.splice(index, 1);
    },
    updataBtn() {
      axios.post(dictionaryUpdate, this.updateDta).then(data => {
        console.log(data);
        this.mobyleVisibleAdd = false;
      });
    },
    mibileBtn(id) {
      this.mobyleVisibleAdd = true;
      axios.get(dictionaryView + "?id=" + id).then(data => {
        console.log(data);
        this.updateDta = data.data;
      });
    },
    quxiaoBtn() {
      this.dialogVisibleDetail = false;
    },
    subBtn() {
      let data = this.postData;
      axios.post(dictionaryAdd, data).then(data => {
        console.log(data);
        this.dialogVisibleAdd = false;
        // this.getList(this.theQuery);
      });
    },
    getList(data) {
      axios.post(dictionaryList, data).then(data => {
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
      axios.get(dictionaryView + "?id=" + id).then(data => {
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
