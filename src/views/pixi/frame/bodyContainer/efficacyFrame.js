import * as PIXI from 'pixi.js'

import RotationPock from "./rotationPock.js"

export default class EfficacyFrame{
    constructor(app, plane, bunnyContainer, bunnySelect){
        this.app = app;
        this.plane = plane;
        this.bunnyContainer = bunnyContainer;
        this.bunnySelect = bunnySelect;
        this.efficacyContainer = {};
        this.squaresEfficacy = [];
        this.efficacy = {x:0, y:0};
        this.size = {
            width: 0,
            height: 0
        };
        this.btnState = {
            leftTop: false,
            middleTop: false,
            rightTop: false,
            rightMiddle: false,
            rightBottom: false,
            centerBottom: false,
            leftBottom: false,
            leftCenter: false,
            rotation: false,
            remove: false
        };
        this.rotationPock = new RotationPock(this);
        this.initPosition = {
            x: 0, y:0
        }

        this.efficacyMouseUp = ()=>{
            this.btnState.leftTop = false;
            this.btnState.middleTop = false;
            this.btnState.rightTop = false;
            this.btnState.rightMiddle = false;
            this.btnState.rightBottom = false;
            this.btnState.centerBottom = false;
            this.btnState.leftBottom = false;
            this.btnState.leftCenter = false;
            this.btnState.rotation = false;
            this.btnState.remove = false;
        }

        this.efficacyMouseMove = ()=>{
            if(this.btnState.leftTop){

            }else if(this.btnState.middleTop){

            }else if(this.btnState.rightTop){

            }else if(this.btnState.rightMiddle){

            }else if(this.btnState.rightBottom){

            }else if(this.btnState.centerBottom){

            }else if(this.btnState.leftBottom){

            }else if(this.btnState.leftCenter){

            }else if(this.btnState.rotation){

            }
        }

        window.document.addEventListener("mouseup", this.efficacyMouseUp);
        window.document.addEventListener("mousemove", this.efficacyMouseMove);
    }

    destroy(){
        window.document.addEventListener("mouseup", this.efficacyMouseUp);
        window.document.addEventListener("mousemove", this.efficacyMouseMove);
        this.rotationPock.destroy();
    }

    leftTopHandler(){

    }
    _initEfficacy(){
        this.efficacyContainer = new PIXI.Container();
        this.app.stage.addChild(this.efficacyContainer);

        this.efficacyContainer.buttonMode = true;
        this.efficacyContainer.interactive = true;

        this.plane.on("pointerdown", e=>{
            this.clearEfficacy();
        });
    }
    startEfficacy(x, y){
        this.efficacy.x = x;
        this.efficacy.y = y;
    }
    endEfficacy(x, y){
    }
    moveEfficacy(x, y){
        this.efficacyContainer.position.x = x - this.efficacy.x + this.initPosition.x;
        this.efficacyContainer.position.y = y - this.efficacy.y + this.initPosition.y;
    }
    clearEfficacy(){
        this.efficacyContainer.removeChildren(0, this.efficacyContainer.children.length);
    }
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
        return {top: top-6, right: right+6, bottom: bottom+6, left: left-6};
    }

    compose(bunnys){
        let _this = this;
        this.clearEfficacy();

        function createSquare(x, y, btnState) {
            let graphics = new PIXI.Graphics();
            graphics.beginFill(0xD9D9D9);
            graphics.lineStyle(1, 0x2C3E50, 1);

            graphics.moveTo(x-5, y-5);
            graphics.lineTo(x-5, y+5);
            graphics.lineTo(x+5, y+5);
            graphics.lineTo(x+5, y-5);
            graphics.lineTo(x-5, y-5);
            graphics.endFill();

            graphics.on("pointerdown", ()=>{
                if(btnState) _this.btnState[btnState] = true
            });
            graphics.zOrder = 1;
            return graphics;
        }

        function createCircle(x, y, btnState){
            let graphics = new PIXI.Graphics();
            graphics.interactive = true;
            graphics.lineStyle(1, 0x2C3E50, 1);
            graphics.beginFill(0xD9D9D9, 1);
            graphics.drawCircle(x, y, 5);
            graphics.endFill();

            graphics.on("pointerover", ()=>{_this.rotationPock.displayRotationPock()});
            graphics.on("pointerout", ()=>{_this.rotationPock.hideRotationPock()});
            graphics.on("pointerdown", ()=>{
                if(btnState) _this.btnState[btnState] = true
            });
            return graphics;
        }

        function createRemove(x, y){
            let removeContainer = new PIXI.Container();

            let planeTexture = new PIXI.Texture(PIXI.Texture.EMPTY);
            let plane = new PIXI.extras.TilingSprite(planeTexture, 18, 18);

            removeContainer.addChild(plane);

            let graphics = new PIXI.Graphics();
            graphics.lineStyle(2, 0xFF0000, 1);
            graphics.beginFill(0xFF0000, 1);
            graphics.moveTo(0, 0);
            graphics.lineTo(-8, -8);
            graphics.lineTo(0, 0);
            graphics.lineTo(8, -8);
            graphics.lineTo(0, 0);
            graphics.lineTo(-8, 8);
            graphics.lineTo(0, 0);
            graphics.lineTo(8, 8);
            graphics.lineTo(0, 0);
            graphics.position.x = 9;
            graphics.position.y = 9;

            removeContainer.addChild(graphics);
            removeContainer.interactive = true;
            removeContainer.cursor = "pointer";
            removeContainer.position.x = x-7;
            removeContainer.position.y = y-7;
            removeContainer.on("pointerdown", ()=>{
                _this.bunnySelect.forEach(bunny =>{
                    _this.bunnyContainer.removeChild(bunny);
                    bunny.destroy();
                });
                _this.bunnySelect.splice(0, _this.bunnySelect.length);
                _this.clearEfficacy();
            });
            return removeContainer;
        }

        let {top, right, bottom, left} = this.efficacyMaxSize(bunnys);

        this.size.width = right - left;
        this.size.height = bottom - top;
        this.squaresEfficacy = [
            createSquare(-this.size.width/2, -this.size.height/2, "leftTop"),
            createSquare(0, -this.size.height/2, "middleTop"),
            createSquare(this.size.width/2, -this.size.height/2, "rightTop"),

            createSquare(this.size.width/2, 0, "rightMiddle"),
            createSquare(this.size.width/2, this.size.height/2, "rightBottom"),

            createSquare(0, this.size.height/2, "centerBottom"),
            createSquare(-this.size.width/2, this.size.height/2, "leftBottom"),
            createSquare(-this.size.width/2, 0, "leftCenter"),

            createCircle(0, -this.size.height/2-20, "rotation"),

            createSquare(-this.size.width/2-20, -this.size.height/2-20),
            createSquare(this.size.width/2+20, -this.size.height/2-20),

            createRemove(this.size.width/2+20, this.size.height/2+20),
            createSquare(-this.size.width/2-20, this.size.height/2+20)
        ];

        this.squaresEfficacy.forEach(s=>{ this.efficacyContainer.addChild(s); });
        // this.efficacyContainer.anchor.set(0.5);
        this.efficacyContainer.position.x = (right - left)/2 + left;
        this.efficacyContainer.position.y = (bottom - top)/2 + top;

        this.initPosition.x = this.efficacyContainer.position.x;
        this.initPosition.y = this.efficacyContainer.position.y;
    }
}