<template>
    <div class="dev-node" v-bind:style="{
         transform: 'rotate(' + rotate + 'deg)'
    }">
        <div>
            <div class="point-display-top">
                <code-list :points="topList"></code-list>
            </div>
        </div>
        <div class="point-row-2">
            <div class="point-display-left"><code-list :points="leftList"></code-list></div>
            <div class="dev-image-body">
                <div>
                    <div class="dev-name-top">{{devNameTop}}</div>
                </div>
                <div>
                    <div class="dev-name-left">{{devNameLeft}}</div>
                    <div class="dev-image" v-bind:style="{
                         transform: 'rotate(' + imgRotate + 'deg)'
                    }">
                        <img ondragstart="return false" :src="imgSrc"/>
                    </div>
                    <div class="dev-name-right">{{devNameRight}}</div>
                </div>
                <div>
                    <div class="dev-name-bottom">{{devNameBottom}}</div>
                </div>
            </div>
            <div class="point-display-right"><code-list :points="rightList"></code-list></div>
        </div>
        <div>
            <div class="point-display-bottom">
                <code-list :points="bottomList"></code-list>
            </div>
        </div>
    </div>
</template>

<script>
    import CodeList from "./codeList.vue"
    import Vue from "vue"

    export default {
        name: "devNode",
        components:{
            CodeList
        },
        props:{
            imgSrc:{
                type: String
            },
            rotate:{
                type: Number,
                default: 0
            },
            imgRotate:{
                type: Number,
                default: 0
            },
            topList:{
                type:Object,
                default:()=>{}
            },
            rightList:{
                type:Object,
                default:()=>{}
            },
            bottomList:{
                type:Object,
                default:()=>{}
            },
            leftList:{
                type:Object,
                default:()=>{}
            },
            devNameTop: {
                type:String,
                default:""
            },
            devNameRight: {
                type:String,
                default:""
            },
            devNameBottom: {
                type:String,
                default:""
            },
            devNameLeft: {
                type:String,
                default:""
            },
        },
        data() {
            return{

            }
        },
        methods: {
            pointListHandler({direction, list}){
                for(let key in list){
                    this.pointHandler({direction, key, point: list[key]});
                }
            },
            pointHandler({direction, key, point}){
                switch(direction)
                {
                    case 0:
                        Vue.set(this.topList, key, point);
                        break;
                    case 1:
                        Vue.set(this.rightList, key, point);
                        break;
                    case 2:
                        Vue.set(this.bottomList, key, point);
                        break;
                    case 3:
                        Vue.set(this.leftList, key, point);
                        break;
                    default:
                        return;
                }
            },
            setName({direction, devName}){
                switch(direction)
                {
                    case 0:
                        this.devNameTop = devName;
                        break;
                    case 1:
                        this.devNameRight = devName;
                        break;
                    case 2:
                        this.devNameBottom = devName;
                        break;
                    case 3:
                        this.devNameLeft = devName;
                        break;
                    default:
                        return;
                }
            },

        }
    }
</script>

<style>
    .point-row-2{
        /*display: table;*/
        display:inline-block;
    }
    .point-row-2:after{
        display:inline-block;
        width:0;
        height:100%;
        vertical-align:middle;
        content:'';
    }

    .point-display-left, .point-display-right, .dev-image-body{
        /*display:table-cell;*/
        vertical-align:middle;
        display:inline-block;
    }
    .point-display-top, .point-display-bottom{
        text-align: center;
    }
    .dev-node{
        display: table;
    }
</style>

