<template>
    <div>

    </div>
</template>

<script>
    import * as PIXI from 'pixi.js'

    export default {
        data(){
            return {
                app:{},
                sprite: {}
            }
        },
        mounted(){
            this.app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
            this.$el.appendChild(this.app.view);

            this.initSprite();
        },
        methods:{
            initSprite(){
                this.sprite = PIXI.Container();

                for(let i=0;i<3;i++){
                    let bunny = PIXI.Sprite.fromImage('static/pixi/pony.png')
                    bunny.interactive = true;
                    bunny.width = 50;
                    bunny.height = 60;
                    bunny.anchor.set(0.5)
                    bunny.x = i*90;
                    bunny.y = i*90;
                    this.sprite.addChild(bunny);
                }
                this.stage.addChild(this.sprite);
            }
        }
    }
</script>