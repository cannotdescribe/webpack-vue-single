<template>
    <scroll-bar>
        <!--<el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">-->
            <!--<sidebar-item :routes="permission_routers"></sidebar-item>-->
        <!--</el-menu>-->
    </scroll-bar>
</template>

<script>
    import { mapGetters } from 'vuex'
//    import SidebarItem from './SidebarItem'
    import ScrollBar from '@/components/ScrollBar'

    export default {
        components: {  ScrollBar },
        computed: {
            ...mapGetters([
                'permission_routers',
            ])
//            isCollapse() {
//                return !this.sidebar.opened
//            }
        }
    }
    var a1 = {
        a:1,
        b:2,
        c:3
    };
    var a2 = {z:1, ...a1, n:12}
    console.log(a2);
</script>
