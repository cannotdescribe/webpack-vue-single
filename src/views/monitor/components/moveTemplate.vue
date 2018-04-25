<template>
    <div :class="['move-template', mouseLeftDown? 'devSelect': '']"
         @mouseup="nodeMouseUp"
         @mousedown="nodeMousedown"
         v-bind:style="{
             top: nodeY + 'px',
             left: nodeX + 'px'
         }">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props:{
            backgroundX : {
                type: Number,
                require:true
            },
            backgroundY : {
                type: Number,
                require:true
            },
            nodeX: {
                type: Number,
                require: true
            },
            nodeY: {
                type: Number,
                require: true
            },
            nodeIndex:{
                type: Number,
                require: true
            },
            mouseLeftDown:{
                type: Boolean,
                require: true
            },
            clickPoint:{
                type: Object,
                require: true
            },
            initX:{
                type: Number,
                require: true
            },
            initY:{
                type: Number,
                require: true
            },
        },
        data(){
            return {}
        },
        mounted() {
            console.log(this.rotate);
        },
        destroyed() {
        },
        methods:{
            nodeMousedown(e){
                if(e.buttons === 1){
                    this.nodeLeftClick(e);
                }else if(e.buttons === 2){
                    this.nodeRightClick(e);
                }
            },
            nodeLeftClick(e){
//                this.clickPoint.layerX = e.layerX;
//                this.clickPoint.layerY = e.layerY;
//                this.initX = this.nodeX;
//                this.initY = this.nodeY;
//                this.mouseLeftDown = true;
                this.$emit("nodeMouseDown", this, e);
            },
            nodeMouseUp(e){
//                this.mouseLeftDown = false;
                this.$emit("nodeClick", this, e);
            },
            nodeRightClick(e){

            }
        }
    }
</script>
<style>
    .move-template{
        position: absolute;
        border: 2px solid rgba(0,0,0,0);
    }
    .devSelect{
        border: 2px solid #6cf;
    }
</style>