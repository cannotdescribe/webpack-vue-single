<template>

    <el-submenu :index="index">
        <template slot="title">{{item.meta.title}}</template>

        <template v-if="item.childType==='navigate'" >
            <template v-for="(value, key) in item.children">
                <el-menu-item :index="index.concat('/').concat(value.path)" :item="value">{{value.meta.title}}</el-menu-item>
            </template>
        </template>

        <template v-else >
            <template v-for="(value, key) in item.children">
                <nav-item :index="index.concat('/').concat(value.path)" :item="value"></nav-item>
            </template>
        </template>
    </el-submenu>
</template>
<script>
    export default{
        name: 'NavItem',
        props: {
            item:{
                type: Object
            },
            index:{
                type: String
            }
        }
    }
</script>