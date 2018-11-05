<template>
    <div class="sidebar-device">

    </div>
</template>
<script>

    import * as PIXI from 'pixi.js'

    export default {
        data(){
            return {
                app: {},
                dragged: false
            }
        },
        props:{
            imgSrc: {
                type: String
            },
            //是父界面遮罩的img的一些信息
            maskImg:{
                type: Object,
                default: () => {}
            }
        },
        mounted(){
            this.nodeList();
            window.document.addEventListener("mouseup", this.mouseup);
            window.document.addEventListener("mousemove", this.mousemove);
        },
        destroyed(){
            window.document.removeEventListener("mouseup", this.mouseup);
            window.document.removeEventListener("mousemove", this.mousemove);
        },
        methods: {
            mouseup(e){
                this.dragged = false;
                this.maskImg.imgSrc = null;
                this.$emit("pointerup", e)
            },
            mousemove(e){
                if(this.dragged){
                    let positionStd = this.imgPositionStd(e);
                    this.maskImg.coverLeft = positionStd.x;
                    this.maskImg.coverTop = positionStd.y;
                    this.$emit("pointermove", e)
                }
            },
            imgPositionStd({x, y}){
                return {x: x-this.maskImg.imgWidth/2, y:y-this.maskImg.imgHeight/2};
            },
            nodeList(){
                let imgSrcs = ["http://127.0.0.1:8090/static/pixitest/bunny.png", "http://127.0.0.1:8090/static/pixitest/yuan.png"];
                for(let imgSrc of imgSrcs){
                    this.node(imgSrc)
                }
            },
            node(imgSrc){
                let image = new Image(), _this = this;
                image.src = imgSrc;
                image.onload = () => {
                    let width = image.naturalWidth;
                    let height = image.naturalHeight;
                    let app = new PIXI.Application({width, height, transparent: true});
                    this.$el.appendChild(app.view);
                    let texture = PIXI.Texture.fromImage(imgSrc);
                    let sprite = new PIXI.Sprite(texture);
                    app.imgSrc = imgSrc;
                    app.stage.addChild(sprite);
                    this.nodeEvent(app);
                }
            },
            nodeEvent(app){
                app.view.addEventListener("mousedown", e=>{
                    this.maskImg.imgSrc = app.imgSrc;
                    this.maskImg.imgHeight = e.srcElement.offsetHeight;
                    this.maskImg.imgWidth = e.srcElement.offsetWidth;
                    let positionStd = this.imgPositionStd(e);
                    this.maskImg.coverLeft = positionStd.x;
                    this.maskImg.coverTop = positionStd.y;

                    this.$emit("pointerdown", e);
                    this.dragged = true;
                });
            },

        }
    }
</script>
<style lang="scss">
    .sidebar-device{
        width:100%;
    }
</style>