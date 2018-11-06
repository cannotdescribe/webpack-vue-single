import * as PIXI from 'pixi.js'

import RotationPock from "./rotationPock.js"

export default class EfficacyFrame{
    constructor(app, plane, bunnyContainer, bunnySelect){
        this.app = app;
        this.plane = plane;
        this.bunnyContainer = bunnyContainer;
        //选择中的bunny
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
            centerTop: false,
            rightTop: false,
            rightCenter: false,
            rightBottom: false,
            centerBottom: false,
            leftBottom: false,
            leftCenter: false,
            rotation: false,
            remove: false
        };
        this.rotationPock = new RotationPock(this);
        //efficacyFrame 整个位置变换是所需要的参照坐标
        this.initPosition = {
            x: 0, y:0
        };
        //efficacyFrame 单个点变换是所需要的参照坐标
        this.efficacyInitPosition = {
            x:0, y:0
        };
        //efficacyFrameSize efficacyFrame 真实大小
        this.efficacyFrameSize = {
            width:0, height:0
        };

        this.efficacyMouseUp = ()=>{
            //bunny变化完成，将所有bunny的anchor恢复回原状
            this.bunnySelect.forEach(bunny =>{
                let anchorReferenceX = bunny.anchor.x;
                let anchorReferenceY = bunny.anchor.y;
                bunny.anchor.set(0.5);
                bunny.position.x = bunny.position.x - bunny.width/2 - (anchorReferenceX-1) * bunny.width;
                bunny.position.y = bunny.position.y - bunny.height/2 - (anchorReferenceY-1) * bunny.height;
            });


            this.btnState.leftTop = false;
            this.btnState.centerTop = false;
            this.btnState.rightTop = false;
            this.btnState.rightCenter = false;
            this.btnState.rightBottom = false;
            this.btnState.centerBottom = false;
            this.btnState.leftBottom = false;
            this.btnState.leftCenter = false;
            this.btnState.rotation = false;
            this.btnState.remove = false;
        };
        /**
         * efficacy拖拽移动的核心方法, 所有的动作都在这里面完成。
         * @param e
         */
        this.efficacyMouseMove = e=>{
            let widthMove = e.x - this.efficacyInitPosition.x ;
            let heightMove = e.y - this.efficacyInitPosition.y;

            if(this.btnState.leftTop){
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * -widthMove + bunny.initSizeAndPosition.width;
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * -heightMove + bunny.initSizeAndPosition.height;
                });
            }else if(this.btnState.centerTop){
                this.bunnySelect.forEach(bunny => {
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * -heightMove + bunny.initSizeAndPosition.height;
                });
            }else if(this.btnState.rightTop){
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * widthMove + bunny.initSizeAndPosition.width;
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * -heightMove + bunny.initSizeAndPosition.height;
                });
            }else if(this.btnState.rightCenter){
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * widthMove + bunny.initSizeAndPosition.width;
                });
            }else if(this.btnState.rightBottom){
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * widthMove + bunny.initSizeAndPosition.width;
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * heightMove + bunny.initSizeAndPosition.height;
                });
            }else if(this.btnState.centerBottom){
                this.bunnySelect.forEach(bunny => {
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * heightMove + bunny.initSizeAndPosition.height;
                });
            }else if(this.btnState.leftBottom){
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * -widthMove + bunny.initSizeAndPosition.width;
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * heightMove + bunny.initSizeAndPosition.height;
                });
            }else if(this.btnState.leftCenter){
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * -widthMove + bunny.initSizeAndPosition.width;
                });
            }else if(this.btnState.rotation){

            }


        };

        window.document.addEventListener("mouseup", this.efficacyMouseUp);
        window.document.addEventListener("mousemove", this.efficacyMouseMove);
    }

    destroy(){
        window.document.addEventListener("mouseup", this.efficacyMouseUp);
        window.document.addEventListener("mousemove", this.efficacyMouseMove);
        this.rotationPock.destroy();
    }

    _initEfficacy(){
        this.efficacyContainer = new PIXI.Container();
        this.app.stage.addChild(this.efficacyContainer);

        this.efficacyContainer.buttonMode = true;
        this.efficacyContainer.interactive = true;

        this.plane.on("pointerdown", ()=>{
            this.clearEfficacy();
        });
    }

    efficacyFramePositionComputed(squaresEfficacy, btnState, widthMove, hieghtMove){
        if(btnState.leftTop){

        }
    }
    //点击设备时触发的efficacyFrame事件
    startEfficacy(x, y){
        this.efficacy.x = x;
        this.efficacy.y = y;
    }
    //释放设备时触发的efficacyFrame事件
    endEfficacy(x, y){
    }
    //移动设备时触发的efficacyFrame事件
    moveEfficacy(x, y){
        this.efficacyContainer.position.x = x - this.efficacy.x + this.initPosition.x;
        this.efficacyContainer.position.y = y - this.efficacy.y + this.initPosition.y;
    }
    clearEfficacy(){
        this.efficacyContainer.removeChildren(0, this.efficacyContainer.children.length);
    }

    /**
     * 求出实际efficacyFrame所占用的宽高
     * 和bunny的宽高，旋转角度都有关系
     * @param bunnys
     * @returns {{top: *, right: *, bottom: *, left: *}}
     */
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
        return {top: top, right: right, bottom: bottom, left: left};
    }
    /**
     * 计算新的anchor
     * @param width                  float                  bunny宽
     * @param height                 float                  bunny高
     * @param x                      float                  bunny 位置x轴
     * @param y                      float                  bunny 位置y轴
     * @param anchor                 {x: float, y: float}   bunny anchor
     * @param efficacyAnchorPosition {x: float, y: float}   efficacy应该的anchor位置
     */
    computedAnchor(width, height, x, y, anchor, efficacyAnchorPosition){
        return {x :(efficacyAnchorPosition.x - (x - width * anchor.x)) / width, y: (efficacyAnchorPosition.y - (y - height * anchor.y)) / height};
    }

    /**
     * 获得 新的anchor坐标
     * @param bunny
     * @param efficacyFrameSize
     * @returns {{x, y}|*}
     */
    efficacyGetAnchor(bunny, efficacyAnchorPosition){
        return this.computedAnchor(
            bunny.initSizeAndPosition.width,
            bunny.initSizeAndPosition.height,
            bunny.initSizeAndPosition.x,
            bunny.initSizeAndPosition.y,
            {
                x: bunny.anchor.x,
                y: bunny.anchor.y
            },
            efficacyAnchorPosition
        );
    }

    /**
     * 入口:
     *  所选的bunnys在这里进行初始化工作。
     *
     *  TODO ##注意:目前不支持bunny的append动作##
     * @param bunnys
     */
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
            graphics.interactive = true;
            graphics.on("pointerdown", e=>{
                if(btnState) _this.btnState[btnState] = true;
                _this.efficacyInitPosition.x = e.data.originalEvent.x;
                _this.efficacyInitPosition.y = e.data.originalEvent.y;
                //为了对bunny形态做出变化，需要设置新的anchor
                _this.bunnySelect.forEach(bunny =>{
                    bunny.initSizeAndPosition = {};
                    bunny.initSizeAndPosition.width = bunny.width;
                    bunny.initSizeAndPosition.height = bunny.height;
                    bunny.initSizeAndPosition.x = bunny.position.x;
                    bunny.initSizeAndPosition.y = bunny.position.y;

                    let efficacyAnchorPosition = {x: 0, y: 0};
                    if(_this.btnState.leftTop){
                        efficacyAnchorPosition.x = _this.efficacyContainer.position.x + _this.efficacyFrameSize.width/2 ;
                        efficacyAnchorPosition.y = _this.efficacyContainer.position.y + _this.efficacyFrameSize.height/2;
                    }else if(_this.btnState.centerTop){
                        efficacyAnchorPosition.x = _this.efficacyContainer.position.x;
                        efficacyAnchorPosition.y = _this.efficacyContainer.position.y + _this.efficacyFrameSize.height/2;
                    }else if(_this.btnState.rightTop){
                        efficacyAnchorPosition.x = _this.efficacyContainer.position.x - _this.efficacyFrameSize.width/2;
                        efficacyAnchorPosition.y = _this.efficacyContainer.position.y + _this.efficacyFrameSize.height/2;
                    }else if(_this.btnState.rightCenter){
                        efficacyAnchorPosition.x = _this.efficacyContainer.position.x - _this.efficacyFrameSize.width/2;
                        efficacyAnchorPosition.y = _this.efficacyContainer.position.y;
                    }else if(_this.btnState.rightBottom){
                        efficacyAnchorPosition.x = _this.efficacyContainer.position.x - _this.efficacyFrameSize.width/2;
                        efficacyAnchorPosition.y = _this.efficacyContainer.position.y - _this.efficacyFrameSize.height/2;
                    }else if(_this.btnState.centerBottom){
                        efficacyAnchorPosition.x = _this.efficacyContainer.position.x;
                        efficacyAnchorPosition.y = _this.efficacyContainer.position.y - _this.efficacyFrameSize.height/2;
                    }else if(_this.btnState.leftBottom){
                        efficacyAnchorPosition.x = _this.efficacyContainer.position.x + _this.efficacyFrameSize.width/2;
                        efficacyAnchorPosition.y = _this.efficacyContainer.position.y - _this.efficacyFrameSize.height/2;
                    }else if(_this.btnState.leftCenter){
                        efficacyAnchorPosition.x = _this.efficacyContainer.position.x + _this.efficacyFrameSize.width/2;
                        efficacyAnchorPosition.y = _this.efficacyContainer.position.y;
                    }
                    let anchor = _this.efficacyGetAnchor(bunny, efficacyAnchorPosition);
                    bunny.anchor.set(anchor.x, anchor.y);
                    bunny.position.x = bunny.position.x + bunny.width/2 + (bunny.anchor.x-1)*bunny.width;
                    bunny.position.y = bunny.position.y + bunny.height/2 + (bunny.anchor.y-1)*bunny.height;
                });

                //为efficacyFrame形态变化做好数据初始化
                this.squaresEfficacy.forEach(square=>{
                    square.initPosition.x = square.position.x;
                    square.initPosition.y = square.position.y;
                })
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
            createSquare(0, -this.size.height/2, "centerTop"),
            createSquare(this.size.width/2, -this.size.height/2, "rightTop"),

            createSquare(this.size.width/2, 0, "rightCenter"),
            createSquare(this.size.width/2, this.size.height/2, "rightBottom"),

            createSquare(0, this.size.height/2, "centerBottom"),
            createSquare(-this.size.width/2, this.size.height/2, "leftBottom"),
            createSquare(-this.size.width/2, 0, "leftCenter"),

            createCircle(0, -this.size.height/2-20, "rotation"),

            createSquare(-this.size.width/2-15, -this.size.height/2-15),
            createSquare(this.size.width/2+15, -this.size.height/2-15),

            createRemove(this.size.width/2+15, this.size.height/2+15),
            createSquare(-this.size.width/2-15, this.size.height/2+15)
        ];

        this.squaresEfficacy.forEach(s=>{ this.efficacyContainer.addChild(s); });
        // this.efficacyContainer.anchor.set(0.5);
        this.efficacyContainer.position.x = (right - left)/2 + left;
        this.efficacyContainer.position.y = (bottom - top)/2 + top;

        this.efficacyFrameSize.width = right - left;
        this.efficacyFrameSize.height = bottom - top;

        this.initPosition.x = this.efficacyContainer.position.x;
        this.initPosition.y = this.efficacyContainer.position.y;
    }
}
