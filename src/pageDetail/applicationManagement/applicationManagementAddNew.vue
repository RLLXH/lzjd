<template>
  <div class="all11">
    <el-form
      label-position="right"
      label-width="100px"
      :inline="true"
      :model="postData"
      ref="postData"
      :rules="rules"
    >
      <el-form-item label="申请状态:" prop="applySatatusName">
        <el-select v-model="postData.applySatatusName" placeholder="请选择">
          <el-option
            v-for="(item,index) in statusList"
            :key="index"
            :label="item.name"
            :value="item.name+','+item.dicCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请类型:" prop="applyTypeName">
        <el-select v-model="postData.applyTypeName" placeholder="请选择">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item.name"
            :value="item.name+','+item.dicCode"
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
  </div>
</template>
<script>
import { dictionaryView,applyAdd } from "../../api/address.js";
import axios from "../../api/axios.js";
export default {
  data() {
    return {
      statusList: [],
      typeList: [],
      postData: {
        applyCode: "", //申请编码
        applySatatusName: "", //申请状态名称
        applyStatusCode: "", //申请状态名称
        applyText: "", //申请内容
        applyTime: "", //时间
        applyTypeCode: "", //申请类型
        applyTypeName: "",
        applyUserCode: "", //申请人
        applyUserName: "", //
     
        id: ''
      },
      rules: {
        applyText: [{ required: true, message: "请输入", trigger: "blur" }],
        applySatatusName: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
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
    this.getdictionaryList();
  },
  methods: {
    postBtn(formName) {
      this.$refs[formName].validate(valid => {
        //判断是否填写信息
        if (valid) {  
          this.postData.applyStatusCode=this.postData.applySatatusName.split(',')[1]
          this.postData.applySatatusName=this.postData.applySatatusName.split(',')[0]
          this.postData.applyTypeCode=this.postData.applyTypeName.split(',')[1]
          this.postData.applyTypeName=this.postData.applyTypeName.split(',')[0]
          axios.post(applyAdd,this.postData).then(data=>{
            console.log(data)
          })
        }
      });
    },
    getdictionaryList() {
      axios.get(dictionaryView + "?id=11").then(data => {
        this.typeList = data.data.list;
        console.log(this.typeList);
      });
      axios.get(dictionaryView + "?id=10").then(data => {
        this.statusList = data.data.list;
        console.log(this.statusList);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.all11 {
  margin-top: 20px;
}
</style>
