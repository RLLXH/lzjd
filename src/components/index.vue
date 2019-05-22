<template>
  <el-container class="visit">
    <el-container>
      <el-header>
        <left-menu class="left-menu"></left-menu>
      </el-header>
      <el-main> 
          <router-view></router-view>
      </el-main>
      <!-- <el-footer>
        <fotter></fotter>
      </el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
import leftMenu from "../components/leftMenu.vue";
import indexTab from "../components/indexTab.vue";
import fotter from "../components/fotter.vue"
export default {
  data() {
    return {};
  },
  components: {
    leftMenu,
    indexTab,
    fotter
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@percent: 100%;
.visit {
  width: 100%;
  height: @percent;
  .content {
    width: 100%;
    height: @percent;
  }
  .el-header {
    padding: 0px 0px;
    text-align: center;
    background-color: #f5f5f5;
    .left-menu {
      float:right;
      text-align: center;
      margin-right: 20px;
    }
  }
  .el-main{
    padding: 0px 0px; 
  }
  .el-footer{
    padding: 0px 0px;
  }
  .el-tabs__item{
    width: 200px!important;
}
}

</style>
