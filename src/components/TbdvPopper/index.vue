<template>
    <transition :name="transitionName">
        <div ref="popper"
             class="tbdv-popper"
             v-show="showPopper"
             :aria-hidden="!showPopper ? 'true' : 'false'"
        >
            <slot></slot>
            <div class="tbdv-popper__arrow"
                 :style="{
                    left: originPosition.left===undefined? null:originPosition.left+'px',
                    top: originPosition.top===undefined? null:originPosition.top+'px'
                 }"
            ></div>
        </div>
    </transition>
</template>
<style lang="scss">

    .tbdv-popper {
        position: absolute;
        background: #fff;
        min-width: 150px;
        border: 1px solid #ebeef5;
        padding: 12px;
        z-index: 2000;
        color: #606266;
        text-align: justify;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 4px;
    }

    .tbdv-popper[x-placement^=bottom]{
        margin-top: 12px;
    }
    .tbdv-popper[x-placement^=left]{
        margin-right: 12px;
    }
    .tbdv-popper[x-placement^=right]{
        margin-left: 12px;
    }
    .tbdv-popper[x-placement^=top]{
        margin-bottom: 12px;
    }
    /**/
    .tbdv-popper[x-placement^=bottom] .tbdv-popper__arrow {
        top: -6px;
        left: 50%;
        margin-right: 3px;
        border-top-width: 0;
        border-bottom-color: #ebeef5;

        &:after {
            top: -5px;
            left: -6px;
        }
    }

    .tbdv-popper[x-placement^=top] .tbdv-popper__arrow {
        bottom: -6px;
        left: 50%;
        margin-right: 3px;
        border-bottom-width: 0;
        border-top-color: #ebeef5;

        &:after {
            top: -7px;
            left: -6px;
        }
    }

    .tbdv-popper[x-placement^=left] .tbdv-popper__arrow {
        top: 50%;
        right: -6px;
        margin-bottom: 3px;
        border-right-width: 0;
        border-left-color: #ebeef5;

        &:after {
            top: -6px;
            left: -7px;
        }
    }

    .tbdv-popper[x-placement^=right] .tbdv-popper__arrow {
        top: 50%;
        left: -6px;
        margin-bottom: 3px;
        border-left-width: 0;
        border-right-color: #ebeef5;

        &:after {
            top: -6px;
            left: -5px;
        }
    }

    .tbdv-popper .tbdv-popper__arrow {
        border-width: 6px;
        filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
        position: absolute;

        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;

        box-sizing: border-box;

        &:after {
            content: " ";
            border-width: 6px;
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;

        }
    }

</style>
<script>
    import Vue from "vue";
    import PopperJS from "popper.js"

    export default {
        data(){
            return {
                popperElm: null,
                elm: {},
                originPosition: {}
            }
        },
        props:{
            transitionName:{
                type: String,
                default: "tbdv-popper-fade"
            },
            showPopper: {
                type: Boolean,
                default: false
            },
            position: {
                type: Object,
                default:()=>{return {x:0, y:0}}
            },
            referenceSize:{
                type: Object,
                default:()=>{return {width:0, height:0}}
            },
            popperOptions: {
                type: Object,
                default() {
                    return {
//                        gpuAcceleration: false
                    };
                }
            },
            placement: {
                type: String,
                default: "right"
            },
            originOffset: {
                type: Number,
                default: 6
            },
            radiusOffset: {
                type: Number,
                default: 9
            },
            referenceRef: {
                type: HTMLElement
            },
            refresh:{
                type: Number,
                value: 0
            }
        },
        watch:{
            showPopper(state){
                if(state){
                    this.updatePopper();
                }
            },
            position:{
                deep: true,
                handler(){
                    this.updatePopper();
                }
            },
            refresh(state){
                this.updatePopper();
            }
        },
        mounted(){
            this.createPopper();
        },
        methods:{
            createPopper(){
                this.$nextTick(_=>{
                    let x = this.position.x, y = this.position.y;
                    let popper = this.popperElm = this.$refs.popper;
                    let elm;    
                    if(this.referenceRef){
                        elm = this.elm = this.referenceRef;
                    }else{
                        elm = this.elm = this.getReference(x, y);
                    }
                    const options = this.popperOptions;
                    options.placement = this.placement;
                    options.onUpdate = (e)=>{
                        this.updateOriginPosition(e);
                    };
                    options.onCreate = (e)=>{
                        this.updateOriginPosition(e);
                    };
                    console.log("options: ", options);
                    this.popperJS = new PopperJS(elm, popper, options);
                })
                
            },
            updatePopper(){
                if(this.popperJS){
                    if(this.referenceRef){
                        this.popperJS.update();
                    }else{
                        this.elm.clientWidth = document.documentElement.clientWidth;;
                        this.elm.clientHeight = document.documentElement.clientHeight;
                        this.elm.getBoundingClientRect = this.getClientRect(this.position.x, this.position.y);
                        this.popperJS.update();
                    }
                }else{
                    this.createPopper();
                }
            },
            getReference(x, y){
                let clientWidth = document.documentElement.clientWidth;
                let clientHeight = document.documentElement.clientHeight;

                return {
                    clientWidth: clientWidth,
                    clientHeight: clientHeight,
                    getBoundingClientRect: this.getClientRect(x, y)
                }
            },

            getClientRect(x, y){
                return ()=>{
                    return {
                        left: x,
                        right: x,
                        top: y,
                        bottom:  y,
                        height: this.referenceSize.height,
                        width: this.referenceSize.width
                    }
                }
            },
            updateOriginPosition(e){
                if(["top", "bottom"].indexOf(e.originalPlacement)>-1){
                    if(e.popper.width/2 > Math.abs(e.popper.left - e.offsets.popper.left )+ this.radiusOffset){
                        this.originPosition = {left: (e.popper.width/2 +  e.popper.left - e.offsets.popper.left - this.originOffset)};
                    }else{
                        if(e.popper.left - e.offsets.popper.left>0){
                            this.originPosition = {left: (e.popper.width - this.radiusOffset - this.originOffset)};
                        }else{
                            this.originPosition = {left: this.radiusOffset + this.originOffset};
                        }
                    }
                }
                if(["left", "right"].indexOf(e.originalPlacement)>-1){
                    if(e.popper.height/2 > Math.abs(e.popper.bottom - e.offsets.popper.bottom ) + this.radiusOffset) {
                        this.originPosition = {top: (e.popper.height / 2 + e.popper.top - e.offsets.popper.top - this.originOffset)};
                    }else{
                        if(e.popper.top - e.offsets.popper.top>0){
                            this.originPosition = {top: (e.popper.height - this.radiusOffset - this.originOffset)};
                        }else{
                            this.originPosition = {top: this.radiusOffset + this.originOffset};
                        }
                    }
                }
                this.$emit("originUpdate", this.originPosition, e)
            },
            hide(){
                this.$emit('update:showPopper', false);
            },
            show(){
                this.$emit('update:showPopper', true);
            }
        },

    }
</script>