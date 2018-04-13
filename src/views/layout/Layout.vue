<template>

    <el-container>
        <el-header>
            <navbar></navbar>
        </el-header>
        <!--<el-container>-->
            <!--<el-aside style="overflow: hidden;">-->
                <!--<sidebar class="sidebar-container"></sidebar>-->
            <!--</el-aside>-->
            <!--<el-container>-->
                <!--<el-main>-->
                    <!--<tags-view></tags-view>-->
                    <!--<app-main></app-main>-->
                <!--</el-main>-->
            <!--</el-container>-->
        <!--</el-container>-->
        <router-view></router-view>
    </el-container>

</template>

<script>
import { Navbar } from './components'
export default {
  name: 'layout',
  components: {
      Navbar,
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .el-header{
      background-color: #B3C0D1;
      color: #333;
      /*text-align: center;*/
      line-height: 60px;
      margin:0;
      padding:0;
  }
</style>