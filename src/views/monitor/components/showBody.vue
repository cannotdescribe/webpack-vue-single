<template>
    <div class="show-body"
         @mousedown="backgroundMousedown"
         @mousemove="backgroundMousemove"
         @mouseup="backgroundMouseup"
    >
        <div class="show-background"
             v-bind:style="{
                top: backgroundY + 'px',
                left: backgroundX + 'px',
                width: width + 'px',
                height: height + 'px',
                background: 'url(' + background + ')'
         }">
            <template v-for="(dev, index) in devs" >
                <move-template @nodeClick="nodeClick"
                               @nodeMouseDown="nodeMouseDown"

                               :backgroundY="backgroundY"
                               :backgroundX="backgroundX"
                               :nodeX="dev.nodeX"
                               :nodeY="dev.nodeY"
                               :mouseLeftDown="dev.mouseLeftDown"
                               :clickPoint="dev.clickPoint"
                               :initX="dev.initX"
                               :initY="dev.initY"
                               :nodeIndex="parseInt(index)"
                               :rotate="dev.rotate"
                >
                    <dev-node
                            :topList="dev.topList"
                            :devNodeTop="dev.devNameTop"
                            :imgRotate="dev.imgRotate"
                            :imgSrc="dev.imgSrc"
                            :rotate="dev.rotate"
                    ></dev-node>
                </move-template>
            </template>

        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    import DevNode from "./devNode.vue"

    import MoveTemplate from "./moveTemplate.vue"

    export default {
        name: "showBody",
        components:{
            DevNode,
            MoveTemplate
        },
        props:{
            devs:{
                type: Object,
                default: []
            },
            background:{
                type: String,
                default: ""
            },
            height:{
                type: Number,
                default: 0
            },
            width:{
                type: Number,
                default: 0
            }
        },
        data() {
            return{
                nodeSelect: false,
                mouseDownNow: false,
                mouseLeftDown: false,
                isCtrlDown: false,
                clickPoint:{
                    screenX: 0,
                    screenY: 0
                },
                backgroundX: 0,
                backgroundY: 0,
                initX: 0,
                initY: 0,
                devSelects: []
            }
        },
        mounted() {
            let _this = this;

            this.$store.dispatch('addMouseUp',
                {key:"monitor", event(){
                    _this.mouseLeftDown = false;
                    _this.clickPoint.screenX = 0;
                    _this.clickPoint.screenY = 0;
                }}
            );

            this.$store.dispatch('addMouseMove',
                {key:"monitor", event(e){
                    if(_this.mouseLeftDown ){
                        _this.backgroundX = _this.initX + e.screenX - _this.clickPoint.screenX;
                        _this.backgroundY = _this.initY + e.screenY - _this.clickPoint.screenY;
                    }
                }}
            );

            for(let key in this.devs){
                this.$set(this.devs[key], "mouseLeftDown", false);
                this.$set(this.devs[key], "initX", this.devs[key].nodeX);
                this.$set(this.devs[key], "initY", this.devs[key].nodeY);
            };

            document.onkeydown=function(e) {
                if(e.keyCode === 17){
                    _this.isCtrlDown = true;
                }
            }

            document.onkeyup=function(e) {
                if(e.keyCode === 17){
                    _this.isCtrlDown = false;
                }
            }

        },
        destroyed() {
            this.$store.dispatch('removeMouseUp', "monitor");
            this.$store.dispatch('removeMouseMove', "monitor");
        },
        methods: {
            backgroundMousedown(e){

                this.clickPoint.screenX = e.screenX;
                this.clickPoint.screenY = e.screenY;
                if(e.target.className ==="show-body" || e.target.className==="show-background"){
                    this.clearNodeSelect();
                    if(e.buttons === 1){
                        this.bgLeftClick(e);
                    }else if(e.buttons === 2){
                        this.bgRightClick(e);
                    }
                }
            },
            bgLeftClick(e){
                this.clickPoint.screenX = e.screenX;
                this.clickPoint.screenY = e.screenY;
                this.initX = this.backgroundX;
                this.initY = this.backgroundY;
                this.mouseLeftDown = true;
            },
            bgRightClick(e){

            },
            nodeClick(node, e){

            },
            clearNodeSelect(){
                for(let key in this.devs){
                    this.devs[key].mouseLeftDown = false;
                }
            },
            nodeMouseDown(node){
                this.nodeSelect = true;
                this.mouseDownNow = true;
                if(!this.isCtrlDown && !this.devs[node.nodeIndex].mouseLeftDown ){
                    this.clearNodeSelect();
                }
                this.devs[node.nodeIndex].mouseLeftDown = true;
            },
            backgroundMousemove(e){
                for(let key in this.devs){
                    if(this.devs[key].mouseLeftDown && this.mouseDownNow){
                        this.devs[key].nodeX = this.devs[key].initX + e.screenX - this.clickPoint.screenX;
                        this.devs[key].nodeY = this.devs[key].initY + e.screenY - this.clickPoint.screenY;
                    }
                }
            },
            backgroundMouseup(e){
                this.mouseDownNow = false;
                for(let key in this.devs){
                    this.devs[key].initX = this.devs[key].nodeX;
                    this.devs[key].initY = this.devs[key].nodeY;
                }
                if(e.target.className==="show-body" || e.target.className==="show-background"){
                    this.nodeSelect = false;
                    for(let key in this.devs){
                        this.devs[key].mouseLeftDown = false;
                    }
                }
            },
            demomd(){
                console.log("demomd");
            }
        }
    }
</script>

<style>
    .show-body{
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .show-background{
        width:0;
        height:0;
        position: relative;
    }
</style>