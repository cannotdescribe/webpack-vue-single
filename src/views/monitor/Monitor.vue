<template>
    <el-container>
        <el-aside>
            <tree @handleNodeClick="handleNodeClick"></tree>
        </el-aside>
        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import Tree from "./components/tree"

    export default {
        components:{
            Tree
        },
        methods:{
            handleNodeClick: (data)=>{
//                this.$route.go(data.nodeType);
            }
        }
    }
</script>

