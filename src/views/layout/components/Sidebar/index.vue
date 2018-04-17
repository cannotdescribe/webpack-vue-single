<template>
    <scroll-bar>
        <el-menu mode="vertical"
                 :default-active="$route.path"
                 :collapse="isCollapse"
                 background-color="#304156"
                 text-color="#bfcbd9"
                 active-text-color="#409EFF">
            <sidebar-item :routes="permission_routers" :currentPath="currentPath"></sidebar-item>

        </el-menu>
    </scroll-bar>
</template>

<script>
    import SidebarItem from './SidebarItem'
    import ScrollBar from '@/components/ScrollBar'

    function currentShowTree(routers, path, index){
        let names = path.split("/");
        names.shift();
        index = index ? index : 0;
        for(let key in routers){
            let router = routers[key];
            if(router.path.indexOf(names[index]) >= 0){
                if(router.childType === "navigate"){
                    return currentShowTree(router.children, path, ++index);
                }else{
                    return router.children;
                }
            }
        }

        return [];
    }

    function currentPath(routers, path){
        let names = path.split("/");
        names.shift();
        let p = "";
        let rs = routers;
        a1:for(let index in names){
            for(let key in rs){
                let router = rs[key];
                if(router.path.indexOf(names[index]) >= 0){
                    p += "/"+names[index];
                    if(router.childType === "navigate"){
                        rs = router.children;
                        continue a1;
                    }else{
                        return p;
                    }
                }
            }
        }
        return p;
    }

    export default {
        components: { SidebarItem, ScrollBar },
        computed: {
            currentPath(){
                return currentPath(this.$store.getters.addRouters, this.$route.path);
            },
            permission_routers(){
                return currentShowTree(this.$store.getters.addRouters, this.$route.path);
            },
            sidebar(){
                return this.$store.getters.sidebar;
            },
//            ...mapGetters([
//                'permission_routers',
//                'sidebar'
//            ]),
            isCollapse() {
                return !this.sidebar.opened
            }
        }
    }
</script>
