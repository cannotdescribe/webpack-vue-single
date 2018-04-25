<template>
    <ul :class="['code-ul', showType===0?'': 'thwartwise']">
        <li v-for="(point, key) in points">
            <span>{{point.pointName+':'+point.value+point.unit}}</span>
            <!--<span>{{point.pointName}}</span>-->
            <!--<span>:</span>-->
            <!--<span>{{point.value}}</span>-->
            <!--<span>{{point.unit}}</span>-->
        </li>
    </ul>
</template>
<script>
    export default {
        name: "codeList",
        props:{
            showType:{
                type: Number,
                default: 0
            },
            points:{
                type: Object,
                default: ()=>{}
            }
        },
        data(){
            return {};
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .thwartwise > li{
        display: inline-block;
        margin-right: 10px;
    }
    .code-ul > li{
        list-style: none;
    }
    .code-ul{
        margin:0;
        padding:0;
    }
</style>