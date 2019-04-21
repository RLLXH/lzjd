<template>
  <div>
    <div class="imgBox">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="imgboxBox1"></div>
          </div>
          <div class="swiper-slide">
            <div class="imgboxBox2"></div>
          </div>
          <div class="swiper-slide">
            <div class="imgboxBox3"></div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <!-- <div class="swiper-pagination"></div> -->
        <!-- 如果需要滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
      </div>
    </div>
    <!-- <div class="scarchBox">
     
    </div>-->
    <div class="cenBox">
      <div class="cenImgBox">
        <div class="immmBox"></div>
        <span>人员名称</span>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data() {
    return {};
  },
  mounted() {
    new Swiper(".swiper-container", {
      autoplay: true
    });
  }
};
</script>
<style lang="less" scoped>
.imgBox {
  width: 100%;
  height: 300px;
  // background-color: green;
}
.swiper-container {
        width: 500px;
        height: 300px;
        margin: 20px auto;
    }
.imgboxBox1{
 background: green;
  height: 200px;
  width: 400px;
}
.imgboxBox2{
 background: yellow;
  height: 200px;
  width: 400px;
}
.imgboxBox3{
 background: red;
  height: 200px;
  width: 400px;
}
.scarchBox{
  width: 60%;
  margin: auto;
  .el-input{
    width: 60%;
  }
}
.cenBox{
  width: 60%;
  margin: auto;
  .cenImgBox{
    width: 25%;
    height: 400px;
    border: 1px solid gray;
   .immmBox{
     height: 300px;
     width: 95%;
      border: 1px solid gray;
      margin: auto;
      margin-top: 5px;
   }
  }
}
</style>
