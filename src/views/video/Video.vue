<template>
    <el-container>
        <el-aside style="overflow: hidden;">
            tree
        </el-aside>
        <el-container>
            <app-main></app-main>
        </el-container>
    </el-container>
</template>

<script>
    import { Sidebar, TagsView, AppMain } from '../layout/components'

    export default {
        name: 'video',
        components: {
            Sidebar,
            TagsView,
            AppMain
        },
        computed: {
            sidebar() {
                return "sidebar";
            }
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
    .el-main{
        margin:0;
        padding:0;
    }
</style>