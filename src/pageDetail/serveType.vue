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
      <el-table-column label="详细信息" prop="text"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picture" width="70" height="60">
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增服务类型"
      :before-close="cancel"
      :visible.sync="dialogVisibleAdd"
      width="60%"
      center
    >
      <el-form :model="postData" :rules="rules" ref="postData">
        <el-form-item label="服务名称 :" prop="name">
          <el-input v-model="postData.name" placeholder="服务名称"></el-input>
        </el-form-item>
        <el-form-item label="详情介绍 :" prop="text">
          <el-input v-model="postData.text" placeholder="详情介绍"></el-input>
        </el-form-item>
        <el-form-item label="上传图片:">
          <el-upload action :limit="1" :on-change="trus">
            <el-button size="small" type="primary">点击上传图片</el-button>
            <div class="headerImg">
              <img :src="postData.picture" alt>
            </div>
          </el-upload>
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
          <el-table-column label="分类名称">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="dictionaryContent" label="详情介绍">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.text" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dictionaryContent" label="单价">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.cost" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dictionaryContent" label="单位">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.unit" placeholder="请输入内容"></el-input>
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
        <el-button @click="subBtn('postData')">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="修改基本信息" :visible.sync="mobyleVisibleAdd" width="60%" center>
      <el-form :model="updateDta" :rules="rules" ref="updateDta">
        <el-form-item label="服务名称 :" prop="name">
          <el-input v-model="updateDta.name" placeholder="服务名称"></el-input>
        </el-form-item>
        <el-form-item label="详情介绍 :" prop="text">
          <el-input v-model="updateDta.text" placeholder="详情介绍"></el-input>
        </el-form-item>
        <el-form-item label="上传图片:">
          <el-upload action :limit="1" :on-change="trus1">
            <el-button size="small" type="primary">点击上传图片</el-button>
            <div class="headerImg">
              <img :src="updateDta.picture" alt>
            </div>
          </el-upload>
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
          <el-table-column label="分类名称">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="dictionaryContent" label="详情介绍">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.text" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dictionaryContent" label="单价">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.cost" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dictionaryContent" label="单位">
            <template slot-scope="scope">
              <el-input size="mini" maxlength="15" v-model="scope.row.unit" placeholder="请输入内容"></el-input>
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
        <el-button @click="updataBtn('updateDta')">提交</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="服务详情" :visible.sync="dialogVisibleDetail" width="60%">
      <el-form :model="detailDtaa" :rules="rules" ref="detailDtaa">
        <el-form-item label="服务名称 :">
          <span>{{detailDtaa.name}}</span>
        </el-form-item>
        <el-form-item label="详情介绍 :">
          <span>{{detailDtaa.text}}</span>
        </el-form-item>
        <el-form-item label="图片 :">
          <img :src="detailDtaa.picture" width="70" height="60">
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
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="text" label="详情"></el-table-column>
          <el-table-column prop="cost" label="单价"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
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
  dictionaryUpdate,
  serveAdd,
  loginUpload,
  serveList,
  serveView,
  serveUpdate
} from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        text: [{ required: true, message: "请输入", trigger: "blur" }]
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
        list: [
          {
            code: "",
            cost: "",
            id: "",
            name: "",
            serviceCode: "",
            text: "",
            unit: ""
          }
        ],
        name: "",
        picture: "",
        text: ""
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
    //图片上传
    trus: async function(file) {
      let form = new FormData();
      form.append("file", file.raw);
      console.log(form);
      axios.post(loginUpload, form).then(data => {
        this.postData.picture = data;
      });
      // let a = await this.getBase64(file.raw);

      // console.log(this.form.brandLogo);
    },
    trus1: async function(file) {
      let form = new FormData();
      form.append("file", file.raw);
      console.log(form);
      axios.post(loginUpload, form).then(data => {
        this.updateDta.picture = data;
      });
      // let a = await this.getBase64(file.raw);

      // console.log(this.form.brandLogo);
    },
    //关闭新增栏
    cancel() {
      this.dialogVisibleAdd = false;
      this.postData = {
        list: [
          {
            code: "",
            cost: "",
            id: "",
            name: "",
            serviceCode: "",
            text: "",
            unit: ""
          }
        ],
        name: "",
        picture: "",
        text: ""
      };
    },
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
    updataBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post(serveUpdate, this.updateDta).then(data => {
            if (data.code == "0") {
              this.$message.success("修改成功!");
              this.getList(this.theQuery);
              this.mobyleVisibleAdd = false;
            } else {
              this.$message.error("修改失败!");
            }
          });
        }
      });
    },
    mibileBtn(id) {
      this.mobyleVisibleAdd = true;
      axios.get(serveView + "?id=" + id).then(data => {
        console.log(data);
        this.updateDta = data.data;
      });
    },
    quxiaoBtn() {
      this.dialogVisibleDetail = false;
    },
    subBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("????????????????????", this.postData);
          //   let data = this.postData;
          axios.post(serveAdd, this.postData).then(data => {
            if (data.code == "0") {
              this.getList(this.theQuery);
              this.dialogVisibleAdd = false;
              this.$message.success("新增成功!");
              this.postData = {
                list: [
                  {
                    code: "",
                    cost: "",
                    id: "",
                    name: "",
                    serviceCode: "",
                    text: "",
                    unit: ""
                  }
                ],
                name: "",
                picture: "",
                text: ""
              };
            } else {
              this.$message.console.error("新增失败!");
            }
          });
        }
      });
    },
    getList(data) {
      axios.post(serveList, data).then(data => {
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
      axios.get(serveView + "?id=" + id).then(data => {
        this.detailDtaa = data.data;
        console.log(this.detailDtaa);
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
.el-table {
  .el-input {
    width: 80% !important;
  }
}
.headerImg {
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
