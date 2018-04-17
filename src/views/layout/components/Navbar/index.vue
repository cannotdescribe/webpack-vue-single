<template>

    <el-menu  :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <LOGO></LOGO>

        <template v-for="(item, index) in navMenu">
            <nav-item v-if="item.childType==='navigate'" :index="item.path" :item="item"></nav-item>

            <el-menu-item v-else :index="item.path">{{item.meta.title}}</el-menu-item>
        </template>

        <!--<el-menu-item index="1">监控</el-menu-item>-->
        <!--<el-submenu index="2">-->
            <!--<template slot="title">我的工作台</template>-->
            <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
            <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
            <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
            <!--<el-submenu index="2-4">-->
                <!--<template slot="title">选项4</template>-->
                <!--<el-menu-item index="2-4-1">选项1</el-menu-item>-->
                <!--<el-menu-item index="2-4-2">选项2</el-menu-item>-->
                <!--<el-menu-item index="2-4-3">选项3</el-menu-item>-->
            <!--</el-submenu>-->
        <!--</el-submenu>-->
        <!--<el-menu-item index="3" disabled>消息中心</el-menu-item>-->
        <!--<el-menu-item index="4"><a target="_blank">订单管理</a></el-menu-item>-->

        <right-menu></right-menu>
    </el-menu>

</template>
<style>
    .el-menu{
        /*box-sizing: border-box;*/
    }
    .el-menu-item{
        /*width: 180px;*/
    }
</style>
<script>
    import LOGO from "./Logo";
    import RightMenu from "./RightMenu"
    import NavItem from "./NavItem"
    import {mapGetters} from "vuex"

    export default {

        components: {
            LOGO,
            RightMenu,
            NavItem
        },
        data() {
            return {
                activeIndex: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
//                console.log(key, keyPath);
            }
        },
        computed: {
            ...mapGetters([
                'permission_routers',
                'addRouters'
            ]),
            navMenu(){
//                console.log(this.addRouters.filter(item=>!item.hidden));
                return this.addRouters.filter(item=>!item.hidden)
            }
        }
    }
</script>


