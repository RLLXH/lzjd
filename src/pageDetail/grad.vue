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
    <div class="server">
      <div class="theMain">
        <img @click="convention(4)" src="../assets/保洁.png" alt>
      </div>
      <div class="secondary">
        <img @click="convention(6)" src="../assets/保姆.png" alt>
        <img @click="convention(5)" src="../assets/维修.png" alt>
      </div>
    </div>
    <!-- <p>保洁人员：</p>
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
    </div>-->
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
    //预约
    convention(val){
    this.$router.push({
            path: "/Index/chooseServe",
            query: {
              id: val
            }
          });
    },

    getList(data) {
      axios.post(employee, data).then(data => {
        this.dataList = data.data.dataList;
      });
    },
    //公告查看
    announcementView() {
      console.log("================================");
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.el-carousel {
  width: 100%;
  background: #ccccff;
}
.all {
  // background:#99CCFF;
  height: 100%;
}
.imgBox {
  width: 100%;
  height: 300px;
  text-align: center;
  display: flex;
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
p {
  width: 70%;
  margin: auto;
  margin-bottom: 20px;
  font-size: 20px;
}

.server {
  width: 70%;
  // height: 300px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  .theMain {
    width: 300px;
    // height: 100px;
    padding: 100px 0;
    margin-right: 50px;
    // overflow: hidden;
    img {
      width: 300px;
      height: 300px;
      display: block;
      border-radius: 50%;
      transition: all 0.6s;
    }
    img:hover {
      transform: scale(1.1);
    }
  }
  .secondary {
    width: 150px;
    // height: 160px;
    // padding: 90px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    img {
      width: 150px;
      height: 150px;
      display: block;
      border-radius: 50%;
      transition: all 0.6s;
    }
    img:hover {
      transform: scale(1.1);
    }
  }
}
</style>
