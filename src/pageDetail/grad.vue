<template>
  <div class="all">
    <div class="imgBox">
      <el-carousel>
        <el-carousel-item v-for="(item,index) in notelist" :key="index" @click="announcementView()">
          <h3 class="small">{{item.title}}</h3>
          <span>{{item.text}}</span>
        </el-carousel-item>
      </el-carousel>
    </div>
    <p>保洁人员：</p>
    <div class="cenBox">
      <div class="cenImgBox" v-for="(item,index) in this.dataList" :key="index" @click="employeesView(item)">
        <div class="immmBox"><img :src="item.picture"></div>
        <span>{{'人员名称:'+item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { noticPageNoticList, employee } from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      theQuery: {
        pageNo: "1",
        pageSize: "20"
      },
      notelist: [],
      dataList: []
    };
  },
  created() {
    axios.get(noticPageNoticList).then(data => {
      this.notelist = data.data;
    });
    this.getList(this.theQuery);
  },
  methods: {
    //员工信息
    employeesView(val){
      if(JSON.parse(sessionStorage.getItem("user"))){
        if(JSON.parse(sessionStorage.getItem("user")).code=="0"){
      this.$router.push({
        path: "/Index/employeesView",
        query: {
          id: val.id
        }
      });
        }else if(JSON.parse(sessionStorage.getItem("user")).code=="1"){
          this.$message.error('员工禁止查看！');
        }
    
      }else{
        this.$message.error('请先登录！');
      }

    },
    getList(data) {
      axios.post(employee, data).then(data => {
        this.dataList = data.data.dataList;
      });
    },
    //公告查看
    announcementView(){
      console.log('================================')
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>

.el-carousel{
  background:#CCCCFF;
}
.all{
  // background:#99CCFF;
  height:100%;
}
.imgBox {
  width: 100%;
  height: 300px;
  text-align: center;
  // background-color: green;
}

.imgboxBox1 {
  background: green;
  height: 200px;
  width: 400px;
}
.imgboxBox2 {
  background: yellow;
  height: 200px;
  width: 400px;
}
.imgboxBox3 {
  background: red;
  height: 200px;
  width: 400px;
}
.scarchBox {
  width: 60%;
  margin: auto;
  .el-input {
    width: 60%;
  }
}
p{
  width: 70%;
  margin: auto;
  margin-bottom: 20px;
  font-size: 20px;
};
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
    div{
      display: inline-block;
    };
    .immmBox {
      height: 300px;
      width: 95%;
      border: 1px solid rgb(255, 255, 255);
      display: block;
      margin:5px auto;
      // margin-top: 5px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .cenImgBox:hover{
    box-shadow: 2px 4px 6px rgb(168, 168, 168);
  }
}
</style>
