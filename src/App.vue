<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@percent: 100%;
html {
  height: @percent;
  margin: 0;
  padding: 0;
  body {
    height: @percent;
    margin: 0;
    padding: 0;
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
  width: @percent;
  //表格样式统一设置
  .el-table--border th {
    background-color: #F0FFF0;
    text-align: center;
  }//表头背景颜色
  .el-table td{
    text-align: center;
    // background-color:	#F0FFFF;
  }//表格内容
  //侧栏样式
  .el-menu{
   background-color:	#F5F5F5;
  }//背景
 .el-menu-item.is-active{
    background-color:#87CEEB
  }//侧栏选中颜色
}
//输入框长度
.el-input{
  width: 210px;
}
.el-input__inner{
  height: 35px;
}
.el-tabs__item{
    width: 200px!important;
}
.el-tabs {
  .el-tabs__header {
    .el-tabs__nav-wrap {
      .el-tabs__nav-scroll {
        text-align: center;
      }
    }
  }
}
</style>
