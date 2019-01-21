<template>
    <div class="pixi-body" ref="pixiBody">
    </div>
</template>

<script>
    import BodyContainer from "./index.js"

    export default {
        data(){
            return {
                bodyContainer: {},
            }
        },
        props:{
            imgSrc: {
                type: String
            }
        },
        mounted(){
            this.bodyContainer = new BodyContainer(this.$el, {
                background: "/static/pixi/background.jpg"
            });

            window.setTimeout(()=>{
                this.bodyContainer.setBackground("/static/pixi/background2.jpg");
            }, 1000);

            this.bodyContainer.on("mouseover", e=>{
            });
            this.bodyContainer.on("mouseup", e=>{
                if(this.imgSrc){
                    this.bodyContainer.appendChild(this.imgSrc, { x:e.offsetX, y:e.offsetY});
                }
            });
        },
        methods: {
        }
    }

</script>

<style>
    .pixi-body{
        height: 100%;
    }
</style>