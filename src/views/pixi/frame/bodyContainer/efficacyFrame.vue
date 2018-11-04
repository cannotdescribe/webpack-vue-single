<script>
    import * as PIXI from 'pixi.js'

    import rotationPock from "./rotationPock"

    export default {
        data(){
            return {
                efficacyContainer: {},
                squaresEfficacy: [],
                efficacy:{x:0, y:0}
            }
        },
        mixins: [rotationPock],
        methods: {
            _initEfficacy(){
                let efficacy = new PIXI.Container();
                this.app.stage.addChild(efficacy);
                this.efficacyContainer = efficacy;

                this.efficacyContainer.buttonMode = true;
                this.efficacyContainer.interactive = true;

                this.plane.on("pointerdown", e=>{
                    this.clearEfficacy();
                });
            },
            startEfficacy(x, y){
                this.efficacy.x = x;
                this.efficacy.y = y;
                this.efficacyContainer.position.x = 0;
                this.efficacyContainer.position.y = 0;
            },
            endEfficacy(x, y){
//                this.efficacy.x = 0;
//                this.efficacy.y = 0;
            },
            moveEfficacy(x, y){
                this.efficacyContainer.position.x = x - this.efficacy.x;
                this.efficacyContainer.position.y = y - this.efficacy.y;
            },
            clearEfficacy(){
                this.efficacyContainer.removeChildren(0, this.efficacyContainer.children.length);
            },
            efficacyMaxSize(bunnys){
                let left , right , top , bottom ;
                for(let bunny of bunnys){
                    let new_lt, new_rt, new_lb, new_rb ;
                    bunny.lt = [bunny.position.x - bunny.width/2, bunny.position.y - bunny.height/2];
                    bunny.rt = [bunny.position.x + bunny.width/2, bunny.position.y - bunny.height/2];

                    bunny.lb = [bunny.position.x - bunny.width/2, bunny.position.y + bunny.height/2];
                    bunny.rb = [bunny.position.x + bunny.width/2, bunny.position.y + bunny.height/2];
                    /**
                     * x0= (x - rx0)*cos(a) - (y - ry0)*sin(a) + rx0 ;
                     * y0= (x - rx0)*sin(a) + (y - ry0)*cos(a) + ry0 ;
                     * 参考: https://jingyan.baidu.com/article/2c8c281dfbf3dd0009252a7b.html
                     */
                    if(bunny.rotation !== 0){
                        let lt_x = (bunny.position.x - bunny.lt[0]) * Math.cos(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.lt[1]) * Math.sin(bunny.rotation * 180 / Math.PI) + bunny.lt[0];
                        let lt_y = (bunny.position.x - bunny.lt[0]) * Math.sin(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.lt[1]) * Math.cos(bunny.rotation * 180 / Math.PI) + bunny.lt[1];

                        let rt_x = (bunny.position.x - bunny.rt[0]) * Math.cos(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.rt[1]) * Math.sin(bunny.rotation * 180 / Math.PI) + bunny.rt[0];
                        let rt_y = (bunny.position.x - bunny.rt[0]) * Math.sin(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.rt[1]) * Math.cos(bunny.rotation * 180 / Math.PI) + bunny.rt[1];

                        let lb_x = (bunny.position.x - bunny.lb[0]) * Math.cos(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.lb[1]) * Math.sin(bunny.rotation * 180 / Math.PI) + bunny.lb[0];
                        let lb_y = (bunny.position.x - bunny.lb[0]) * Math.sin(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.lb[1]) * Math.cos(bunny.rotation * 180 / Math.PI) + bunny.lb[1];

                        let rb_x = (bunny.position.x - bunny.rb[0]) * Math.cos(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.rb[1]) * Math.sin(bunny.rotation * 180 / Math.PI) + bunny.rb[0];
                        let rb_y = (bunny.position.x - bunny.rb[0]) * Math.sin(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.rb[1]) * Math.cos(bunny.rotation * 180 / Math.PI) + bunny.rb[1];
                        /*
                        if(bunny.rotation % (Math.PI*2) > 0 && bunny.rotation % (Math.PI*2) < (Math.PI/2)){
                            // 0-90dep
                            x = (bunny.position.x - bunny.rt[0]) * Math.cos(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.rt[1]) * Math.sin(bunny.rotation * 180 / Math.PI) + bunny.rt[0]; // rt_x
                            y = (bunny.position.x - bunny.lt[0]) * Math.sin(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.lt[1]) * Math.cos(bunny.rotation * 180 / Math.PI) + bunny.lt[1]; // lt_y
                        }else if(bunny.rotation % (Math.PI*2) > (Math.PI/2) && bunny.rotation % (Math.PI*2) < (Math.PI)){
                            // 90-180dep
                            x = (bunny.position.x - bunny.lt[0]) * Math.cos(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.lt[1]) * Math.sin(bunny.rotation * 180 / Math.PI) + bunny.lt[0]; // lt_x
                            y = (bunny.position.x - bunny.lb[0]) * Math.sin(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.lb[1]) * Math.cos(bunny.rotation * 180 / Math.PI) + bunny.lb[1]; // lb_y
                        }else if(bunny.rotation % (Math.PI*2) > (Math.PI) && bunny.rotation % (Math.PI*2) < (Math.PI * 3 / 2)){
                            // 180-270dep
                            x = (bunny.position.x - bunny.rb[0]) * Math.sin(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.rb[1]) * Math.cos(bunny.rotation * 180 / Math.PI) + bunny.rb[1]; // rb_y
                            y = (bunny.position.x - bunny.lb[0]) * Math.cos(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.lb[1]) * Math.sin(bunny.rotation * 180 / Math.PI) + bunny.lb[0]; // lb_x
                        }else{
                            //270-360dep
                            x = (bunny.position.x - bunny.rb[0]) * Math.cos(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.rb[1]) * Math.sin(bunny.rotation * 180 / Math.PI) + bunny.rb[0]; // rb_x
                            y = (bunny.position.x - bunny.rt[0]) * Math.sin(bunny.rotation * 180 / Math.PI) - (bunny.position.y - bunny.rt[1]) * Math.cos(bunny.rotation * 180 / Math.PI) + bunny.rt[1]; // rt_y
                        }
                        */
                        if(bunny.rotation % (Math.PI*2) > 0 && bunny.rotation % (Math.PI*2) < (Math.PI/2)){
                            // 0-90dep
                            new_lt = [lb_x, lt_y];
                            new_rt = [rt_x, lt_y];
                            new_rb = [rt_x, rb_y];
                            new_lb = [lb_x, rb_y];
                        }else if(bunny.rotation % (Math.PI*2) > (Math.PI/2) && bunny.rotation % (Math.PI*2) < (Math.PI)){
                            // 90-180dep
                            new_lt = [rb_x, lb_y];
                            new_rt = [lt_x, lb_y];
                            new_rb = [lt_x, rt_y];
                            new_lb = [rb_x, rt_y];
                        }else if(bunny.rotation % (Math.PI*2) > (Math.PI) && bunny.rotation % (Math.PI*2) < (Math.PI * 3 / 2)){
                            // 180-270dep
                            new_lt = [rt_x, rb_y];
                            new_rt = [lb_x, rb_y];
                            new_rb = [lb_x, lt_y];
                            new_lb = [rt_x, lt_y];
                        }else{
                            //270-360dep
                            new_lt = [rb_x, rt_y];
                            new_rt = [lt_x, rt_y];
                            new_rb = [lt_x, lb_y];
                            new_lb = [rb_x, lb_y];
                        }
                    }else{
                        new_lt = bunny.lt;
                        new_rt = bunny.rt;
                        new_rb = bunny.rb;
                        new_lb = bunny.lb;
                    }

                    if(left===undefined) left = new_lt[0];
                    if(right===undefined) right = new_rb[0];
                    if(top===undefined) top = new_rt[1];
                    if(bottom===undefined) bottom = new_lb[1];

                    if(left > new_lt[0]) left = new_lt[0];
                    if(right < new_rb[0]) right = new_rb[0];
                    if(top > new_rt[1]) top = new_rt[1];
                    if(bottom < new_lb[1]) bottom = new_lb[1];
                }
                return {top: top-10, right: right+10, bottom: bottom+10, left: left-10};
            },
            compose(bunnys){
                this.clearEfficacy();

                function createSquare(x, y) {
                    let graphics = new PIXI.Graphics();
                    graphics.beginFill(0xD9D9D9);
                    graphics.lineStyle(1, 0x2C3E50, 1);

                    graphics.moveTo(x-5, y-5);
                    graphics.lineTo(x-5, y+5);
                    graphics.lineTo(x+5, y+5);
                    graphics.lineTo(x+5, y-5);
                    graphics.lineTo(x-5, y-5);
                    graphics.endFill();
                    return graphics;
                }

                function createCircle(){
                    let graphics = new PIXI.Graphics();
                    graphics.lineStyle(0);
                    graphics.beginFill(0xFFFF0B, 0.5);
                    graphics.drawCircle(470, 90,60);
                    graphics.endFill();
                    return graphics;
                }

                let {top, right, bottom, left} = this.efficacyMaxSize(bunnys);
                this.squaresEfficacy = [
                    createSquare(left, top),
                    createSquare((right-left)/2+left, top),
                    createSquare(right, top),

                    createSquare(right, (bottom-top)/2+top),
                    createSquare(right, bottom),

                    createSquare((right-left)/2+left, bottom),
                    createSquare(left, bottom),
                    createSquare(left, (bottom-top)/2+top),

                    createSquare((right-left)/2+left, top-30),

                    createSquare(left-30, top-30),
                    createSquare(right+30, top-30),

                    createSquare(right+30, bottom+30),
                    createSquare(left-30, bottom+30)
                ];

                this.squaresEfficacy.forEach(s=>{ this.efficacyContainer.addChild(s); });
            },

        }
    }
</script>

<style>
    .aa{
        color: rgb(44,62,80);
    }
</style>