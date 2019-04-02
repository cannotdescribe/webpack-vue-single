<template>

    <el-container class="single-container">
        <el-header class="single-header">
            <navbar></navbar>
        </el-header>
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

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    .single-container{
        .single-header{
            background-color: #B3C0D1;
            color: #333;
            /*text-align: center;*/
           
            margin:0;
            padding:0;
        }
        
        overflow: hidden;
        height: 100%;
    }
</style>