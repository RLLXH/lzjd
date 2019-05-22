<template>
  <div>
    <p>{{details.text}}</p>
    <el-tabs v-model="choose" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in details.list"
        :key="index"
        :label="item.name"
        :name="item.code"
      >{{item.name}}</el-tab-pane>
    </el-tabs>
    <p>保洁人员：</p>
    <div class="cenBox">
      <div
        class="cenImgBox"
        v-for="(item,index) in this.dataList"
        :key="index"
        @click="employeesView(item)"
      >
        <div class="immmBox">
          <img :src="item.picture">
        </div>
        <span>{{'人员名称:'+item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  noticPageNoticList,
  employee,
  serveView,
  employeeList
} from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      dataList: [],
      choose: "",
      details: {},
      theQuery: {
        pageNo: 1,
        pageSize: 20,
        serviceCode: 7
      }
    };
  },
  created() {
    //   console.log(this.$route.query.id),
    axios.get(serveView + "?id=" + this.$route.query.id).then(data => {
      console.log(data);
      data.data.list.map((v, k) => {
        v.id = v.id.toString();
      });
      console.log(data.data.list);
      this.details = data.data;
      this.choose = data.data.list[0].code;
      this.theQuery.serviceCode = data.data.list[0].code;
      axios.post(employeeList, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.data.dataList;
      });
    });
    // this.handleClick();
  },
  methods: {
    handleClick(tab, event) {
      console.log("123");
      console.log(tab.$options.propsData.name);
      this.choose= tab.$options.propsData.name;
      this.theQuery.serviceCode = tab.$options.propsData.name;
      axios.post(employeeList, this.theQuery).then(data => {
        this.dataList = data.data.dataList;
      });
    },
    //员工信息
    employeesView(val) {
        let data = {}
        this.details.list.map((v,k)=>{
            if(v.code==this.choose){
                console.log(v.name,v.code,"??????????")
                data={
                    name:v.name,
                    code:v.code
                }
            }
        });
      if (JSON.parse(sessionStorage.getItem("user"))) {
        if (JSON.parse(sessionStorage.getItem("user")).code == "0") {
          this.$router.push({
            path: "/Index/employeesView",
            query: {
              id: val.id,
              data:data
            }
          });
        } else if (JSON.parse(sessionStorage.getItem("user")).code == "1") {
          this.$message.error("员工禁止查看！");
        }
      } else {
        this.$message.error("请先登录！");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cenBox {
  width: 70%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .cenImgBox {
    width: 20%;
    // height: 400px;
    margin-bottom: 20px;
    display: inline-block;
    border: 1px solid rgb(255, 255, 255);
    div {
      display: inline-block;
    }
    .immmBox {
      height: 300px;
      width: 95%;
      border: 1px solid rgb(255, 255, 255);
      display: block;
      margin: 5px auto;
      // margin-top: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .cenImgBox:hover {
    box-shadow: 2px 4px 6px rgb(168, 168, 168);
  }
}
p {
  text-align: center;
}


// .el-tabs{
// .el-tabs__item{
//     text-align:center;
//     background: red
// }
// }
</style>
