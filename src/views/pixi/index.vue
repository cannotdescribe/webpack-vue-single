<template>
    <el-container class="configuration-page">
       
        <div class="left-sidebar">
            <siderbar-device :maskImg="maskImg" @pointerdown="pointerdownHandler" @pointerup="pointerupHandler" @pointermove="pointermoveHandler"></siderbar-device>
        </div>
        <div class="control-body">
            <body-container :imgSrc="maskImg.imgSrc" ref="bodyContainerRef"></body-container>
        </div>            

        <!--
        <div class="right-sidebar">
            <el-input v-model="maskImg.rotation"></el-input>
            <el-button @click="clickHandler">旋转</el-button>
            <el-button @click="consoleHandler">获得</el-button>

        </div>
        
       
        <img ondragstart="return false"
             class="cover-node"
             :src="maskImg.imgSrc"
             v-if="maskImg.imgSrc&&maskImg.imgSrc !== ''"
             :style="{left: maskImg.coverLeft+'px', top: maskImg.coverTop+'px'}"/>
        -->
    </el-container>
</template>
<script>
    import SiderbarDevice from "./frame/siderbarDevice.vue"
    import BodyContainer from "./frame/bodyContainer/index.vue"

    export default {
        components:{
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
                this.maskImg.imgSrc = null;
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
    @import "src/styles/mixin.scss";
    .configuration-page{
        overflow: hidden;
    }
    .top-menu{
        height: 24px;
    }
    .configuration-page{
        height: calc(100% - 24px);
        display: flex;
        flex-direction: row;

        .left-sidebar, .control-body, .right-sidebar{
            height:100%;
            border: 1px solid black;
        }
        .left-sidebar{
            width: 280px;
            flex:initial;
        }
        .control-body{
            flex-direction: column;
            flex: 1;
        }
        .right-sidebar{
            width: 300px;
            right: 0;
        }
    }
    
    .cover-node{
        position: absolute;
        pointer-events:none;
    }
</style>