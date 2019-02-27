<template>
    <tbdv-popper
            class="map-popper"
            :originOffset="10"
            :radiusOffset="24"
            :referenceSize="referenceSize"
            :showPopper.sync="showPopper"
            :position="position"
            :placement="placement"
            :popperOptions="popperOptions"
            transitionName="map-popper-fade"
            @originUpdate="originUpdateHandler"
            :style="transformOrigin"
    >
        <div class="map-popper-shorn"></div>
        <div class="map-popper-box">
            <span class="icon-wrapper" id="jModalClose" @click="closeHandler"><i class="icon-close"></i></span>
            <div class="map-popper-title">
                <span class="list-name baynet-name" v-html="title"></span>
            </div>
            <slot></slot>
        </div>
    </tbdv-popper>
</template>

<script>
    import TbdvPopper from "./index.vue"
    export default {
        components : { TbdvPopper},
        props:{
            title:{
                type: String,
                default: "title"
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
                default:()=>{return {width:44, height:44}}
            },
            placement:{
                type: String,
                default: "right"
            },
            popperOptions: {
                type: Object,
                default() {
                    return {
                        modifiers: {
                            computeStyle: {
                                gpuAcceleration: false
                            }
                        }
                    };
                }
            },
        },
        data(){
            return {
                transformOrigin:""
            }
        },
        methods: {
            closeHandler(){
                this.$emit("update:showPopper", false);
            },
            originUpdateHandler(originPosition, e){
                if(e.placement === "top"){
                    this.transformOrigin={"transform-origin": `${originPosition.left+10}px 100%`};
                }else if(e.placement === "bottom"){
                    this.transformOrigin={"transform-origin": `${originPosition.left+10}px 0`};
                }else if(e.placement === "left"){
                    this.transformOrigin={"transform-origin": `100% ${originPosition.top+10}px`};
                }else if(e.placement === "right"){
                    this.transformOrigin={"transform-origin": `0 ${originPosition.top+10}px`};
                }
            }
        }
    }
</script>

<style lang="scss">
    .map-popper-fade-enter-active, .map-popper-fade-leave-active {
        transition: transform 0.5s;
    }
    .map-popper-fade-enter, .map-popper-fade-leave-to {
        transform: scale(0);
    }

    .map-popper{
        border: 1px solid #1e3fe4;
        background: rgba(10,29,61,.7);
        box-shadow: inset -1px 0 20px 10px #066cbb;
        box-sizing: border-box;

        &:after, &:before {
            position: absolute;
            left: -2px;
            content: "";
            width: 10px;
            height: 10px;
            border-left: 2px solid #62cdf4;
        }
        &:before {
            top: -2px;
            border-top: 2px solid #62cdf4;
        }
        &:after {
            bottom: -2px;
            border-bottom: 2px solid #62cdf4;
        }

        .map-popper-shorn {
            &:after, &:before {
                position: absolute;
                right: -2px;
                content: "";
                width: 10px;
                height: 10px;
                border-right: 2px solid #62cdf4;
            }
            &:before {
                top: -2px;
                border-top: 2px solid #62cdf4;
            }
            &:after {
                bottom: -2px;
                border-bottom: 2px solid #62cdf4;
            }
        }

        .map-popper-box {
            width: 510px;
            height: 390px;
            position: relative;
            display: block;
            color: #fff;
            .map-popper-title{
                box-sizing: border-box;
                width: 100%;
                font-weight: 700;
                font-size: 16px;
                height: 45px;
                line-height: 45px;
                margin-bottom: 8px;
                padding: 4px 20px;
                box-shadow: inset -1px 0 20px 10px #066cbb;

                .list-name {
                    padding-left: 8px;
                    border-left: 3px solid #61cfed;
                    color: #fff;
                }
            }
            .icon-wrapper {
                position: absolute;
                display: flex;
                width: 25px;
                height: 25px;
                right: 20px;
                top: 10px;
                padding: 5px;
                border-radius: 50%;
                flex: none;
                justify-content: center;
                align-items: center;
                cursor: pointer;

            }

            .icon-close {
                width: 25px;
                height: 25px;
                background: url("/static/img/close.png") no-repeat 50%;
                background-size: cover;
                display: inline-block;
            }
        }


        &.tbdv-popper {
            border-radius: 0;
            padding:0;
        }

        &.tbdv-popper[x-placement^=bottom] .tbdv-popper__arrow {
            top: -10px;
            margin-right: 5px;
            border-top-width: 0;
            border-bottom-color: #066cbb;
        }

        &.tbdv-popper[x-placement^=top] .tbdv-popper__arrow {
            bottom: -10px;
            margin-right: 5px;
            border-bottom-width: 0;
            border-top-color: #066cbb;
        }

        &.tbdv-popper[x-placement^=left] .tbdv-popper__arrow {
            right: -10px;
            margin-bottom: 5px;
            border-right-width: 0;
            border-left-color: #066cbb;
        }

        &.tbdv-popper[x-placement^=right] .tbdv-popper__arrow {
            left: -10px;
            margin-bottom: 5px;
            border-left-width: 0;
            border-right-color: #066cbb;
        }

        &.tbdv-popper .tbdv-popper__arrow {
            border-width: 10px;
            &:after {
                border-width: 10px;
            }
        }
    }
</style>