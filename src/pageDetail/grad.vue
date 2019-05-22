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
    <div v-if="this.service.length>0" class="server">
      <div class="theMain">
        <p style="text-align:center">{{this.service[2].name}}</p>
        <img @click="convention(4)" :src="this.service[2].picture" alt>
        <p>{{this.service[2].text}}</p>
      </div>
      <div style="width:150px">
        <div class="secondary">
          <p style="text-align:center">{{this.service[0].name}}</p>
          <img @click="convention(6)" :src="this.service[0].picture" alt>
          <!-- <img @click="convention(5)" :src="this.service[0].picture" alt> -->
          <p>{{this.service[0].text}}</p>
        </div>
        <div class="secondary">
          <!-- <img @click="convention(6)" :src="this.service[1].picture" alt> -->
          <p style="text-align:center">{{this.service[1].name}}</p>
          <img @click="convention(5)" :src="this.service[1].picture" alt>
          <p>{{this.service[1].text}}</p>
        </div>
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
import { noticPageNoticList, employee, serveList } from "../api/address.js";
import axios from "../api/axios.js";
export default {
  data() {
    return {
      service: [],
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
    axios.post(serveList, {}).then(data => {
      this.service = data.data.dataList;
    });
    this.getList(this.theQuery);
  },
  methods: {
    //预约
    convention(val) {
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
    height: 400px;
    // padding: 100px 0;
    background: #f9f9f9;
    margin: 10px;
    border: 1px solid #e9e9e9;
    transition: all 0.6s;
    img {
      width: 200px;
      height: 200px;
      display: block;
      margin: 10px auto;
      border-radius: 50%;
    }
  }
  .theMain:hover {
    transform: scale(1.03);
  }
  .secondary {
    background: #f9f9f9;
    width: 150px;
    height: 200px;
    margin: 5px auto;
    transition: all 0.6s;
    border: 1px solid #e9e9e9;
    p {
      font-size: 12px;
    }
    // display: flex;
    // flex-direction: column;
    // justify-content: space-around;
    img {
      width: 100px;
      height: 100px;
      display: block;
      margin: 0 auto;
      border-radius: 50%;
      // transition: all 0.6s;
    }
    // img:hover {
    //   transform: scale(1.1);
    // }
  }
  .secondary:hover {
    transform: scale(1.03);
  }
}
</style>
