<template>
  <div>
    <p>{{details.text}}</p>
    <!-- <el-tabs v-model="choose" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in details.list"
        :key="index"
        :label="item.name"
        :name="item.code"
      >{{item.name}}</el-tab-pane>
    </el-tabs>-->
    <div class="block">
      <div @click="handleClick(item)" v-for="(item, index) in details.list" :key="index">
        <p>{{item.name}}</p>
        <p>{{item.text}}</p>
      </div>
    </div>
    <p v-if="this.dataList.length>0">人员信息:</p>
    <div v-if="this.dataList.length==0" class="column">
      <p>{{this.column.name}}</p>
      <p>{{this.column.text}}</p>
      <div v-if="this.column.id==6" class="columnImg">
       <img src="../assets/rearing.jpg" alt="">
        <img src="../assets/matron.jpg" alt="">
         <img src="../assets/fangda_07.jpg" alt="">
      </div>
         <div v-if="this.column.id==4" class="columnImg">
       <img src="../assets/2017y12m24d20h1m12s693.jpg" alt="">
        <img src="../assets/2017y12m24d20h1m32s149 (1).jpg" alt="">
         <img src="../assets/2017y12m24d20h2m15s389.jpg" alt="">
      </div>
             <div v-if="this.column.id==5" class="columnImg">
       <img src="../assets/u=2202778623,909395816&fm=26&gp=0_WPS图片.jpg" alt="">
        <img src="../assets/timg.jpg" alt="">
         <img src="../assets/1496200992.jpg" alt="">
      </div>
    </div>
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
      column: {
        id:"",
        name: "",
        text: ""
      },
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
    this.column.id = this.$route.query.id;
    axios.get(serveView + "?id=" + this.$route.query.id).then(data => {
      console.log(data);
      data.data.list.map((v, k) => {
        v.id = v.id.toString();
      });
      console.log(data.data.list);
      this.details = data.data;
      this.choose = data.data.list[0].code;
      this.theQuery.serviceCode = data.data.list[0].code;
      //   axios.post(employeeList, this.theQuery).then(data => {
      //     console.log(data);
      //     this.dataList = data.data.dataList;
      //   });
    });
    // this.handleClick();
  },
  methods: {
    handleClick(val) {
      console.log("123", val);
      this.column.name = val.name;
      this.column.text = val.text;
      console.log(this.column)
      this.choose = val.code;
      this.theQuery.serviceCode = val.code;
      axios.post(employeeList, this.theQuery).then(data => {
        this.dataList = data.data.dataList;
      });
    },
    //员工信息
    employeesView(val) {
  
      let data = {};
          console.log(this.details.list)
      this.details.list.map((v, k) => {
        if (v.code == this.choose) {
          console.log(v.name, v.code, v.unit,v, "??????????");
          data = {
            name: v.name,
            code: v.code,
            unit: v.unit,
            cost:v.cost
          };
        }
      });
      if (JSON.parse(sessionStorage.getItem("user"))) {
        if (JSON.parse(sessionStorage.getItem("user")).code == "0") {
          this.$router.push({
            path: "/Index/employeesView",
            query: {
              id: val.id,
              data: data
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
.block {
  display: flex;
  flex-wrap: wrap;
  div {
    width: 200px;
    height: 100px;
    margin: 10px;
    border: 1px solid #e9e9e9;
    background: #f9f9f9;
    font-size: 12px;
    transition: all 0.6s;
    p:first-of-type {
      font-size: 14px;
    }
  }
  div:hover {
    transform: scale(1.1);
  }
}
.column {
  p:first-of-type {
    font-size: 14px;
  }
}
.columnImg{
  display: flex;
  justify-content: space-around;
  margin: 100px 0;
  img{
    width: 302px;
    height: 193px;
  }
}
// .el-tabs{
// .el-tabs__item{
//     text-align:center;
//     background: red
// }
// }
</style>
