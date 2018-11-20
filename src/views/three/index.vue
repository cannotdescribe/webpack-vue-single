<template>
    <el-container>
        <el-aside style="width: 180px;">
            <sidebar class="sidebar-container" :currentPath="currentPath()"></sidebar>
        </el-aside>
        <el-container>
            <el-main>
                <tags-view></tags-view>
                <app-main></app-main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import { Sidebar, TagsView, AppMain } from '../layout/components'

    export default {
        name: 'deploy',
        components: {
            Sidebar,
            TagsView,
            AppMain
        },
        computed: {
            sidebar() {
                return "sidebar";
            }
        },
        methods: {
            currentPath(){
                return "dads";
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