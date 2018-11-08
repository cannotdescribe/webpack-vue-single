import * as PIXI from 'pixi.js'

import RotationPock from "./rotationPock.js"

export default class EfficacyFrame{
    constructor(app, plane, bunnyContainer, bunnySelect){
        this.app = app;
        //底
        this.plane = plane;
        //bunny的Container
        this.bunnyContainer = bunnyContainer;
        //选择中的bunny
        this.bunnySelect = bunnySelect;
        //efficacyFrame 的边框的Container
        this.efficacyContainer = {};
        //efficacyFrame 的边框组件
        this.squaresEfficacy = [];
        //鼠标点击设备后的参考坐标
        this.efficacy = {x:0, y:0};
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
        //efficacyFrame 单个点变换是所需要的参照坐标
        this.efficacyInitPosition = {
            x:0, y:0
        };
        //efficacyFrameSize efficacyFrame 真实大小
        this.efficacyFrameSize = {
            width:0, height:0
        };

        //参照用的初始化大小，私有属性，外界一般不需要掉用
        this.efficacyFrameInitSize = {
            width:0, height:0
        };

        this.efficacyMouseUp = ()=>{
            //bunny变化完成，将所有bunny的anchor恢复回原状
            let flag = false, _this = this;
            for(let state in _this.btnState){
                if(_this.btnState[state]){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                return;
            }

            this.efficacyFrameSize.width = this.squaresEfficacy[2].position.x - this.squaresEfficacy[0].position.x;
            this.efficacyFrameSize.height = this.squaresEfficacy[4].position.y - this.squaresEfficacy[2].position.y;

            this.bunnySelect.forEach(bunny =>{
                let anchorReferenceX = bunny.anchor.x;
                let anchorReferenceY = bunny.anchor.y;
                bunny.anchor.set(0.5);
                bunny.position.x = bunny.position.x - bunny.width/2 - (anchorReferenceX-1) * bunny.width;
                bunny.position.y = bunny.position.y - bunny.height/2 - (anchorReferenceY-1) * bunny.height;

                bunny.initSizeAndPosition.width = bunny.width;
                bunny.initSizeAndPosition.height = bunny.height;
                bunny.initSizeAndPosition.x = bunny.position.x;
                bunny.initSizeAndPosition.y = bunny.position.y;
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

            // this.bunnySelect.forEach(bunny =>{
            //     console.log(bunny.position.x, bunny.position.y);
            // });
            // this.efficacyFrameSize.width
            // console.log("efficacyContainer:  ", this.efficacyContainer.position.x, this.efficacyContainer.position.y);
            // this.clearEfficacy();
            // this.squaresEfficacy.forEach(s=>{this.efficacyContainer.addChild(s)});



            // this.efficacyContainer.position.x = this.efficacyContainer.position.x - ((this.efficacyFrameSize.width - this.efficacyFrameInitSize.width)/2);
            // this.efficacyContainer.position.y = this.efficacyContainer.position.y - ((this.efficacyFrameSize.height - this.efficacyFrameInitSize.height)/2);

            //
            // console.log("efficacyContainer:  ", this.efficacyContainer.position.x, this.efficacyContainer.position.y);
            this.compose();

            // console.log(this.efficacyContainer.width, this.efficacyContainer.height, this.efficacyContainer.position.x, this.efficacyContainer.position.y);

        };
        /**
         * efficacy拖拽移动的核心方法, 所有的动作都在这里面完成。
         * @param e
         */
        this.efficacyMouseMove = e=>{
            if(this.btnState.leftTop){
                let widthMove = e.x - this.efficacyInitPosition.x;
                let heightMove = e.y - this.efficacyInitPosition.y;

                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width* -widthMove + bunny.initSizeAndPosition.width;
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height* -heightMove + bunny.initSizeAndPosition.height;
                });

                this.squaresEfficacy[0].position.x = this.squaresEfficacy[0].initPosition.x + widthMove;
                this.squaresEfficacy[0].position.y = this.squaresEfficacy[0].initPosition.y + heightMove;
                this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove/2;
                this.squaresEfficacy[1].position.y = this.squaresEfficacy[1].initPosition.y + heightMove;
                this.squaresEfficacy[2].position.y = this.squaresEfficacy[2].initPosition.y + heightMove;
                this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove/2;
                this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove/2;
                this.squaresEfficacy[6].position.x = this.squaresEfficacy[6].initPosition.x + widthMove;
                this.squaresEfficacy[7].position.x = this.squaresEfficacy[7].initPosition.x + widthMove;
                this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove/2;

                this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove/2;
                this.squaresEfficacy[8].position.y = this.squaresEfficacy[8].initPosition.y + heightMove;
                this.squaresEfficacy[9].position.x = this.squaresEfficacy[9].initPosition.x + widthMove;
                this.squaresEfficacy[9].position.y = this.squaresEfficacy[9].initPosition.y + heightMove;
                this.squaresEfficacy[10].position.y = this.squaresEfficacy[10].initPosition.y + heightMove;
                this.squaresEfficacy[12].position.x = this.squaresEfficacy[12].initPosition.x + widthMove;

            }else if(this.btnState.centerTop){
                let heightMove = e.y - this.efficacyInitPosition.y;
                this.bunnySelect.forEach(bunny => {
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * -heightMove + bunny.initSizeAndPosition.height;
                });
                this.squaresEfficacy[0].position.y = this.squaresEfficacy[0].initPosition.y + heightMove;
                this.squaresEfficacy[1].position.y = this.squaresEfficacy[1].initPosition.y + heightMove;
                this.squaresEfficacy[2].position.y = this.squaresEfficacy[2].initPosition.y + heightMove;
                this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove/2;
                this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove/2;

                this.squaresEfficacy[8].position.y = this.squaresEfficacy[8].initPosition.y + heightMove;
                this.squaresEfficacy[9].position.y = this.squaresEfficacy[9].initPosition.y + heightMove;
                this.squaresEfficacy[10].position.y = this.squaresEfficacy[10].initPosition.y + heightMove;

            }else if(this.btnState.rightTop){
                let widthMove = e.x - this.efficacyInitPosition.x ;
                let heightMove = e.y - this.efficacyInitPosition.y;
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * widthMove + bunny.initSizeAndPosition.width;
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * -heightMove + bunny.initSizeAndPosition.height;
                });
                this.squaresEfficacy[0].position.y = this.squaresEfficacy[0].initPosition.y + heightMove;
                this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove/2;
                this.squaresEfficacy[1].position.y = this.squaresEfficacy[1].initPosition.y + heightMove;
                this.squaresEfficacy[2].position.x = this.squaresEfficacy[2].initPosition.x + widthMove;
                this.squaresEfficacy[2].position.y = this.squaresEfficacy[2].initPosition.y + heightMove;
                this.squaresEfficacy[3].position.x = this.squaresEfficacy[3].initPosition.x + widthMove;
                this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove/2;
                this.squaresEfficacy[4].position.x = this.squaresEfficacy[4].initPosition.x + widthMove;
                this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove/2;
                this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove/2;

                this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove/2;
                this.squaresEfficacy[8].position.y = this.squaresEfficacy[8].initPosition.y + heightMove;
                this.squaresEfficacy[9].position.y = this.squaresEfficacy[9].initPosition.y + heightMove;
                this.squaresEfficacy[10].position.x = this.squaresEfficacy[10].initPosition.x + widthMove;
                this.squaresEfficacy[10].position.y = this.squaresEfficacy[10].initPosition.y + heightMove;
                this.squaresEfficacy[11].position.x = this.squaresEfficacy[11].initPosition.x + widthMove;
            }else if(this.btnState.rightCenter){
                let widthMove = e.x - this.efficacyInitPosition.x ;
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * widthMove + bunny.initSizeAndPosition.width;
                });

                this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove/2;
                this.squaresEfficacy[2].position.x = this.squaresEfficacy[2].initPosition.x + widthMove;
                this.squaresEfficacy[3].position.x = this.squaresEfficacy[3].initPosition.x + widthMove;
                this.squaresEfficacy[4].position.x = this.squaresEfficacy[4].initPosition.x + widthMove;
                this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove/2;

                this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove/2;
                this.squaresEfficacy[10].position.x = this.squaresEfficacy[10].initPosition.x + widthMove;
                this.squaresEfficacy[11].position.x = this.squaresEfficacy[11].initPosition.x + widthMove;
            }else if(this.btnState.rightBottom){
                let widthMove = e.x - this.efficacyInitPosition.x ;
                let heightMove = e.y - this.efficacyInitPosition.y;
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * widthMove + bunny.initSizeAndPosition.width;
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * heightMove + bunny.initSizeAndPosition.height;
                });

                this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove/2;
                this.squaresEfficacy[2].position.x = this.squaresEfficacy[2].initPosition.x + widthMove;
                this.squaresEfficacy[3].position.x = this.squaresEfficacy[3].initPosition.x + widthMove;
                this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove/2;
                this.squaresEfficacy[4].position.x = this.squaresEfficacy[4].initPosition.x + widthMove;
                this.squaresEfficacy[4].position.y = this.squaresEfficacy[4].initPosition.y + heightMove;
                this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove/2;
                this.squaresEfficacy[5].position.y = this.squaresEfficacy[5].initPosition.y + heightMove;
                this.squaresEfficacy[6].position.y = this.squaresEfficacy[6].initPosition.y + heightMove;
                this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove/2;

                this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove/2;
                this.squaresEfficacy[10].position.x = this.squaresEfficacy[10].initPosition.x + widthMove;
                this.squaresEfficacy[11].position.x = this.squaresEfficacy[11].initPosition.x + widthMove;
                this.squaresEfficacy[11].position.y = this.squaresEfficacy[11].initPosition.y + heightMove;
                this.squaresEfficacy[12].position.y = this.squaresEfficacy[12].initPosition.y + heightMove;
            }else if(this.btnState.centerBottom){
                let heightMove = e.y - this.efficacyInitPosition.y;
                this.bunnySelect.forEach(bunny => {
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * heightMove + bunny.initSizeAndPosition.height;
                });
                this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove/2;
                this.squaresEfficacy[4].position.y = this.squaresEfficacy[4].initPosition.y + heightMove;
                this.squaresEfficacy[5].position.y = this.squaresEfficacy[5].initPosition.y + heightMove;
                this.squaresEfficacy[6].position.y = this.squaresEfficacy[6].initPosition.y + heightMove;
                this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove/2;

                this.squaresEfficacy[11].position.y = this.squaresEfficacy[11].initPosition.y + heightMove;
                this.squaresEfficacy[12].position.y = this.squaresEfficacy[12].initPosition.y + heightMove;
            }else if(this.btnState.leftBottom){
                let widthMove = e.x - this.efficacyInitPosition.x ;
                let heightMove = e.y - this.efficacyInitPosition.y;
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * -widthMove + bunny.initSizeAndPosition.width;
                    bunny.height = bunny.initSizeAndPosition.height/this.efficacyFrameSize.height * heightMove + bunny.initSizeAndPosition.height;
                });
                this.squaresEfficacy[0].position.x = this.squaresEfficacy[0].initPosition.x + widthMove;
                this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove/2;
                this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove/2;
                this.squaresEfficacy[4].position.y = this.squaresEfficacy[4].initPosition.y + heightMove;
                this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove/2;
                this.squaresEfficacy[5].position.y = this.squaresEfficacy[5].initPosition.y + heightMove;
                this.squaresEfficacy[6].position.y = this.squaresEfficacy[6].initPosition.y + heightMove;
                this.squaresEfficacy[6].position.x = this.squaresEfficacy[6].initPosition.x + widthMove;
                this.squaresEfficacy[7].position.x = this.squaresEfficacy[7].initPosition.x + widthMove;
                this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove/2;

                this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove/2;
                this.squaresEfficacy[9].position.x = this.squaresEfficacy[9].initPosition.x + widthMove;
                this.squaresEfficacy[11].position.y = this.squaresEfficacy[11].initPosition.y + heightMove;
                this.squaresEfficacy[12].position.y = this.squaresEfficacy[12].initPosition.y + heightMove;
                this.squaresEfficacy[12].position.x = this.squaresEfficacy[12].initPosition.x + widthMove;
            }else if(this.btnState.leftCenter){
                let widthMove = e.x - this.efficacyInitPosition.x ;
                this.bunnySelect.forEach(bunny => {
                    bunny.width = bunny.initSizeAndPosition.width/this.efficacyFrameSize.width * -widthMove + bunny.initSizeAndPosition.width;
                });

                this.squaresEfficacy[0].position.x = this.squaresEfficacy[0].initPosition.x + widthMove;
                this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove/2;
                this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove/2;
                this.squaresEfficacy[6].position.x = this.squaresEfficacy[6].initPosition.x + widthMove;
                this.squaresEfficacy[7].position.x = this.squaresEfficacy[7].initPosition.x + widthMove;

                this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove/2;
                this.squaresEfficacy[9].position.x = this.squaresEfficacy[9].initPosition.x + widthMove;
                this.squaresEfficacy[12].position.x = this.squaresEfficacy[12].initPosition.x + widthMove;
            }else if(this.btnState.rotation){
                this.rotationPock.rotationMove(e, this.efficacyInitPosition);
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
        this.efficacyContainer.position.x = x - this.efficacy.x + this.efficacyContainer.initSizeAndPosition.x;
        this.efficacyContainer.position.y = y - this.efficacy.y + this.efficacyContainer.initSizeAndPosition.y;
    }
    clearEfficacy(){
        this.efficacyContainer.removeChildren(0, this.efficacyContainer.children.length);
    }

    /**5
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

    createSquare(x, y, btnState) {
        let graphics = new PIXI.Graphics(), _this = this;
        graphics.beginFill(0xD9D9D9);
        graphics.lineStyle(1, 0x2C3E50, 1);
        graphics.moveTo(-5, -5);
        graphics.lineTo(-5, +5);
        graphics.lineTo(+5, +5);
        graphics.lineTo(+5, -5);
        graphics.lineTo(-5, -5);
        graphics.endFill();

        graphics.pivot.x = graphics.width / 2;
        graphics.pivot.y = graphics.height / 2;

        graphics.position.x = x;
        graphics.position.y = y;
        graphics.interactive = true;
        graphics.on("pointerdown", e=>{
            if(btnState) _this.btnState[btnState] = true;
            _this.efficacyInitPosition.x = e.data.originalEvent.x;
            _this.efficacyInitPosition.y = e.data.originalEvent.y;

            //为了对bunny形态做出变化，需要设置新的anchor
            _this.bunnySelect.forEach(bunny =>{
                bunny.initSizeAndPosition.width = bunny.width;
                bunny.initSizeAndPosition.height = bunny.height;
                bunny.initSizeAndPosition.x = bunny.position.x;
                bunny.initSizeAndPosition.y = bunny.position.y;

                _this.efficacyContainer.initSizeAndPosition.x = _this.efficacyContainer.position.x;
                _this.efficacyContainer.initSizeAndPosition.y = _this.efficacyContainer.position.y;
                _this.efficacyContainer.initSizeAndPosition.width = _this.efficacyContainer.width;
                _this.efficacyContainer.initSizeAndPosition.height = _this.efficacyContainer.height;

                let efficacyAnchorPosition = {x: 0, y: 0};
                if(_this.btnState.leftTop){
                    efficacyAnchorPosition.x = _this.efficacyContainer.position.x + _this.efficacyFrameInitSize.width/2;
                    efficacyAnchorPosition.y = _this.efficacyContainer.position.y + _this.efficacyFrameInitSize.height/2;
                }else if(_this.btnState.centerTop){
                    efficacyAnchorPosition.x = _this.efficacyContainer.position.x  ;
                    efficacyAnchorPosition.y = _this.efficacyContainer.position.y + _this.efficacyFrameInitSize.height/2;
                }else if(_this.btnState.rightTop){
                    efficacyAnchorPosition.x = _this.efficacyContainer.position.x - _this.efficacyFrameInitSize.width/2;
                    efficacyAnchorPosition.y = _this.efficacyContainer.position.y + _this.efficacyFrameInitSize.height/2;
                }else if(_this.btnState.rightCenter){
                    efficacyAnchorPosition.x = _this.efficacyContainer.position.x - _this.efficacyFrameInitSize.width/2;
                    efficacyAnchorPosition.y = _this.efficacyContainer.position.y;
                }else if(_this.btnState.rightBottom){
                    efficacyAnchorPosition.x = _this.efficacyContainer.position.x - _this.efficacyFrameInitSize.width/2;
                    efficacyAnchorPosition.y = _this.efficacyContainer.position.y - _this.efficacyFrameInitSize.height/2;
                }else if(_this.btnState.centerBottom){
                    efficacyAnchorPosition.x = _this.efficacyContainer.position.x;
                    efficacyAnchorPosition.y = _this.efficacyContainer.position.y - _this.efficacyFrameInitSize.height/2;
                }else if(_this.btnState.leftBottom){
                    efficacyAnchorPosition.x = _this.efficacyContainer.position.x + _this.efficacyFrameInitSize.width/2;
                    efficacyAnchorPosition.y = _this.efficacyContainer.position.y - _this.efficacyFrameInitSize.height/2;
                }else if(_this.btnState.leftCenter){
                    efficacyAnchorPosition.x = _this.efficacyContainer.position.x + _this.efficacyFrameInitSize.width/2;
                    efficacyAnchorPosition.y = _this.efficacyContainer.position.y;
                }
                console.log(efficacyAnchorPosition, _this.efficacyContainer.position);
                let anchor = _this.efficacyGetAnchor(bunny, efficacyAnchorPosition);
                bunny.anchor.set(anchor.x, anchor.y);
                bunny.position.x = bunny.position.x + bunny.width/2 + (bunny.anchor.x-1)*bunny.width;
                bunny.position.y = bunny.position.y + bunny.height/2 + (bunny.anchor.y-1)*bunny.height;
            });

            _this.squaresEfficacy.forEach(square=>{
                square.initPosition = {};
                square.initPosition.x = square.position.x;
                square.initPosition.y = square.position.y;
            });
        });
        return graphics;
    }

    createCircle(x, y, btnState){
        let graphics = new PIXI.Graphics(), _this = this;
        graphics.interactive = true;

        graphics.lineStyle(1, 0x2C3E50, 1);
        graphics.beginFill(0xD9D9D9, 1);
        graphics.drawCircle(0, 0, 5);

        graphics.pivot.x = graphics.width / 2;
        graphics.pivot.y = graphics.height / 2;

        graphics.endFill();
        graphics.position.x = x;
        graphics.position.y = y;
        graphics.on("pointerover", ()=>{_this.rotationPock.displayRotationPock()});
        graphics.on("pointerout", ()=>{_this.rotationPock.hideRotationPock()});
        graphics.on("pointerdown", ()=>{
            if(btnState) _this.btnState[btnState] = true
        });
        return graphics;
    }

    createRemove(x, y){
        let removeContainer = new PIXI.Container(), _this = this;

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
        removeContainer.pivot.x = removeContainer.width / 2;
        removeContainer.pivot.y = removeContainer.height / 2;

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
    getFrameCenter(){
        return {
            x: (this.efficacyFrame.squaresEfficacy[4].x + this.efficacyFrame.squaresEfficacy[0].x) / 2 + this.efficacyContainer.position.x,
            y: (this.efficacyFrame.squaresEfficacy[4].y + this.efficacyFrame.squaresEfficacy[0].y) / 2 + this.efficacyContainer.position.y
        };
    }
    /**
     * 入口:
     *  所选的bunnys在这里进行初始化工作。
     *
     *  TODO ##注意:目前不支持bunny的append动作##
     */
    compose(){
        let _this = this;
        this.clearEfficacy();

        let {top, right, bottom, left} = this.efficacyMaxSize(_this.bunnySelect);


        this.efficacyFrameSize.width = right - left;
        this.efficacyFrameSize.height = bottom - top;

        this.efficacyContainer.pivot.x = this.efficacyFrameSize.width/2 +10;
        this.efficacyContainer.pivot.y = this.efficacyFrameSize.height/2 +10;

       //TODO
        /**
         * 这里的顺序不能乱来，通常情况下，我们是看下标的来判断是属于哪个按钮
         * @type {[null,null,null,null,null,null,null,null,null,null,null,null,null]}
         */
        this.squaresEfficacy = [
            this.createSquare(15, 15, "leftTop"),
            this.createSquare(15+this.efficacyFrameSize.width/2, 15, "centerTop"),
            this.createSquare(15+this.efficacyFrameSize.width, 15, "rightTop"),
            this.createSquare(15+this.efficacyFrameSize.width, 15+this.efficacyFrameSize.height/2, "rightCenter"),
            this.createSquare(15+this.efficacyFrameSize.width, 15+this.efficacyFrameSize.height, "rightBottom"),
            this.createSquare(15+this.efficacyFrameSize.width/2, 15+this.efficacyFrameSize.height, "centerBottom"),
            this.createSquare(15, 15+this.efficacyFrameSize.height, "leftBottom"),
            this.createSquare(15, 15+this.efficacyFrameSize.height/2, "leftCenter"),

            this.createCircle(this.efficacyFrameSize.width/2+15, 5, "rotation"),
            this.createSquare(0, 0),
            this.createSquare(this.efficacyFrameSize.width+30, 0),
            this.createRemove(this.efficacyFrameSize.width+30, this.efficacyFrameSize.height+30),
            this.createSquare(0, this.efficacyFrameSize.height+30)
        ];



        //为efficacyFrame形态变化做好数据初始化
        // console.log("bunnySelect: ", this.bunnySelect);
        this.squaresEfficacy.forEach(s=>{this.efficacyContainer.addChild(s)});
        // this.efficacyContainer.anchor.set(0.5);
        // console.log("compose start:  ", this.efficacyContainer.position.x, this.efficacyContainer.position.y);
        this.efficacyContainer.position.x = (right+left)/2;
        this.efficacyContainer.position.y = (top+bottom)/2;

        console.log(this.efficacyContainer.position);
        // console.log("compose end:  ", this.efficacyContainer.position.x, this.efficacyContainer.position.y);


        this.efficacyFrameInitSize.width = this.efficacyFrameSize.width;
        this.efficacyFrameInitSize.height = this.efficacyFrameSize.height;
        this.efficacyContainer.initSizeAndPosition = {};
        this.efficacyContainer.initSizeAndPosition.x = this.efficacyContainer.position.x;
        this.efficacyContainer.initSizeAndPosition.y = this.efficacyContainer.position.y;
    }

}
