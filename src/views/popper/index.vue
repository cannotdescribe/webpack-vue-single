<template>
    <div>
        <!--
        <tbdv-popper
                class="map-popper"
                :originOffset="10"
                :radiusOffset="24"
                :referenceSize="referenceSize"
                :showPopper.sync="showPopper"
                :position="{x: x, y:y}"
                :placement="placement"
                :popperOptions="popperOptions"
                transitionName="map-popper-fade"
                @originUpdate="originUpdateHandler"
                :style="transformOrigin"
                :referenceRef="$refs.popperDiv"
        >
        -->
        <tbdv-popper
            :refresh="refresh"
            class="map-popper"
            :originOffset="10"
            :radiusOffset="24"
            :referenceSize="referenceSize"
            :showPopper.sync="showPopper"
            :placement="placement"
            :popperOptions="popperOptions"
            transitionName="map-popper-fade"
            @originUpdate="originUpdateHandler"
            :style="transformOrigin"
            :referenceRef="$refs.popperDiv"
        >
            war never changes
        </tbdv-popper>

        <div
            ref="popperDiv"
            class="ddv"
            :style='{top:y+"px",left:x+"px"}'
            @click="clickHandler"
            @mousedown="mousedownHandler"
            @mouseup="mouseupHandler"
        ></div>
    </div>
</template>

<script>
import TbdvPopper from "@/components/TbdvPopper/index.vue"

export default {
    components:{
        TbdvPopper
    },
    data() {
      return {
        showPopper: true,
        moveFlag: false,
        x: 330,
        y: 220,
        referenceSize: {width: 100, height: 100},
        placement:"top-start",
        transformOrigin:"",
        popperOptions:{},
        refresh: 0
      };
    },
    methods:{
      clickHandler(){
      },
      mousedownHandler(){
      	this.moveFlag = true;
      },
      mouseupHandler(){
        this.moveFlag = false;
      },
      originUpdateHandler(){

      }
    },
    mounted(){
    	window.addEventListener("mousemove", e=>{
       		if(this.moveFlag){
                this.refresh++;
                this.x = e.x;
                this.y = e.y;
            }
        })
    },
  };
</script>

<style lang="scss">
    .ddv {
        height: 100px;
        width: 100px;
        background-color: #6cf;
        position: absolute;
    }

    .tbdv-popper{
        &[x-placement^=bottom] .tbdv-popper__arrow{
            border-bottom-color: #2196F3;
            &::after {
            border-bottom-color: #1d2437;
            }
        }
        &[x-placement^=top] .tbdv-popper__arrow{
            border-top-color: #2196F3;
            &::after {
            border-top-color: #1d2437;
            }
        }
        &[x-placement^=right] .tbdv-popper__arrow{
            border-right-color: #2196F3;
            &::after {
            border-right-color: #1d2437;
            }
        }
        &[x-placement^=left] .tbdv-popper__arrow{
            border-left-color: #2196F3;
            &::after {
            border-left-color: #1d2437;
            }
        }
    }
</style>