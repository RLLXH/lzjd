<template>
  <div>
    <div class="imgBox">
      <el-carousel>
        <el-carousel-item v-for="(item,index) in notelist" :key="index">
          <h3 class="small">{{item.title}}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div class="scarchBox">
     
    </div>-->
    <div class="cenBox">
      <div class="cenImgBox" v-for="(item,index) in this.dataList" :key="index">
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
      console.log(data, "1231231");
      this.notelist = data.data;
    });
    this.getList(this.theQuery);
  },
  methods: {
    getList(data) {
      axios.post(employee, data).then(data => {
        console.log(data);
        this.dataList = data.data.dataList;
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
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
.cenBox {
  width: 60%;
  margin: auto;
  .cenImgBox {
    width: 25%;
    height: 400px;
    display: inline-block;
    div{
      display: inline-block;
    };
    .immmBox {
      height: 300px;
      width: 95%;
      border: 1px solid gray;
      margin: auto;
      margin-top: 5px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
