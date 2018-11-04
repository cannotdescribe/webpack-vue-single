<template>
    <div class="configuration-page">
        <div class="top-menu">

        </div>
        <div class="center-body">
            <div class="left-sidebar">
                <siderbar-device :maskImg="maskImg" @pointerdown="pointerdownHandler" @pointerup="pointerupHandler" @pointermove="pointermoveHandler"></siderbar-device>
            </div>
            <div class="control-body">
                <body-container :imgSrc="maskImg.imgSrc" ref="bodyContainerRef"></body-container>
            </div>
            <div class="right-sidebar">
                <el-input v-model="maskImg.rotation"></el-input>
                <el-button @click="clickHandler">旋转</el-button>
                <el-button @click="consoleHandler">获得</el-button>
            </div>
        </div>
        <img ondragstart="return false"
             class="cover-node"
             :src="maskImg.imgSrc"
             v-if="maskImg.imgSrc&&maskImg.imgSrc !== ''"
             :style="{left: maskImg.coverLeft+'px', top: maskImg.coverTop+'px'}"/>
    </div>
</template>
<script>
    import SiderbarDevice from "./frame/siderbarDevice.vue"
    import BodyContainer from "./frame/bodyContainer/index.vue"
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";

    export default {
        components:{
            ElInput,
            ElButton,
            SiderbarDevice,
            BodyContainer
        },
        data(){
            return{
                maskImg: {
                    imgSrc: null,
                    coverLeft: 0,
                    coverTop: 0,
                    imgHeight: 0,
                    imgWidth: 0,
                    rotation: 0
                },
                mouseState:{
                    mouseLeftDown: false
                }

            }
        },
        methods: {
            pointerdownHandler(e){
                this.mouseState.mouseLeftDown = true;
            },
            pointerupHandler(){
                this.mouseState.mouseLeftDown = false;
            },
            pointermoveHandler(e){

            },
            clickHandler(){
                this.$refs.bodyContainerRef.rotation();
            },
            consoleHandler(){
                this.$refs.bodyContainerRef.consoleFmt();
            }
        }
    }
</script>
<style lang="scss">
    .configuration-page{
        height: 100%
    }
    .top-menu{
        height: 24px;
    }
    .center-body{
        height: calc(100% - 24px);
    }
    .left-sidebar, .control-body, .right-sidebar{
        height:100%;
        position: absolute;
        border: 1px solid black;
    }
    .left-sidebar{
        width: 280px;
    }
    .control-body{
        width: calc(100% - 580px);
        left: 280px;
    }
    .right-sidebar{
        width: 300px;
        right: 0;
    }
    .cover-node{
        position: absolute;
        pointer-events:none;
    }
</style>