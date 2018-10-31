<template>
    <div>

    </div>
</template>

<script>
    import PIXI from "pixi.js"

    export default {
        mounted(){
            let app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
            this.$el.appendChild(app.view);

            let bunny = PIXI.Sprite.fromImage('static/pixi/pony.png')
            app.stage.addChild(bunny);
        }
    }
</script>