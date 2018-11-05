<template>
    <div class="pixi-body" ref="pixiBody">
    </div>
</template>

<script>
    import BodyContainer from "./index.js"

    export default {
        data(){
            return {
                bodyContainer: {}
            }
        },
        props:{
            imgSrc: {
                type: String
            }
        },
        watch:{
            imgSrc(newImgSrc){
                this.bodyContainer.setImgSrc(newImgSrc);
            }
        },
        mounted(){
            this.bodyContainer = new BodyContainer(this.imgSrc, this.$el);
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