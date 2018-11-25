import * as PIXI from 'pixi.js'
import PIXI_BASE_UTILS from "../../utils/PIXI_BASE_UTILS.js"
import BunnyRotationPock from "./bunnyRotationPock.js"
import BunnyResizeHandler from "./bunnyResizeHandler.js"

export default class EfficacyFrame{
    constructor(app, plane, bunnyContainer, bunnySelectStore){
        this.app = app;
        //底
        this.plane = plane;
        //bunny的Container
        this.bunnyContainer = bunnyContainer;
        //选择中的bunny
        this.bunnySelectStore = bunnySelectStore;
        //efficacyFrame 的边框的Container
        this.efficacyContainer = {};
        //efficacyFrame 的边框组件
        this.squaresEfficacy = [];
        //鼠标点击设备后的参考坐标
        this.efficacy = {x:0, y:0};

        //debug用的容器， 如果不用了就删掉吧
        this.testContainer = new PIXI.Container();
        this.app.stage.addChild(this.testContainer);

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

        //efficacyFrame 单个点变换是所需要的参照坐标, 相对窗口而言
        this.efficacyInitPosition = {
            x:0, y:0
        };
        //efficacyFrame 单个点变换是所需要的参照坐标, 相对画布而言
        this.efficacyCanvasInitPosition = {
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

        this.bunnyRotationPock = new BunnyRotationPock(this);
        this.bunnyResizeHandler = new BunnyResizeHandler(this);

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

            this.efficacyContainer.initRotation = this.efficacyContainer.rotation;

            this.bunnySelectStore.forEach(bunny =>{
                PIXI_BASE_UTILS.bunnySetNewAnchor(bunny, {x: 0.5, y: 0.5})

                bunny.initSizeAndPosition.width = bunny.width;
                bunny.initSizeAndPosition.height = bunny.height;
                bunny.initSizeAndPosition.x = bunny.position.x;
                bunny.initSizeAndPosition.y = bunny.position.y;

                bunny.initRotation = bunny.rotation;
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

            // this.bunnySelectStore.forEach(bunny =>{
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
            this.initEfficacyContainerPosition();
            // console.log(this.efficacyContainer.width, this.efficacyContainer.height, this.efficacyContainer.position.x, this.efficacyContainer.position.y);

        };
        /**
         * efficacy拖拽移动的核心方法, 所有的动作都在这里面完成。
         * @param e
         */
        this.efficacyMouseMove = e=>{

            if(this.btnState.rotation){
                this.bunnyRotationPock.rotationMove(e, this.efficacyCanvasInitPosition);
            }else if(
                this.btnState.leftTop ||
                this.btnState.centerTop ||
                this.btnState.rightTop ||
                this.btnState.rightCenter ||
                this.btnState.rightBottom ||
                this.btnState.centerBottom ||
                this.btnState.leftBottom ||
                this.btnState.leftCenter
            ){
                this.bunnyResizeHandler.moveHandler(e);
            }

        };

        window.document.addEventListener("mouseup", this.efficacyMouseUp);
        window.document.addEventListener("mousemove", this.efficacyMouseMove);
    }

    destroy(){
        window.document.removeEventListener("mouseup", this.efficacyMouseUp);
        window.document.removeEventListener("mousemove", this.efficacyMouseMove);
        this.bunnyRotationPock.destroy();
        this.bunnyResizeHandler.destroy();
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

    /**
     * 求出所有点位的最左顶点，上顶点，右定点，下定点
     *
     * 公式:
     *
     * x: a - b / Math.tan(rotation);
     * y: b - a * Math.tan(rotation);
     * @param points
     * @param rotation 旋转角度
     * @returns {{left: *, top: *, right: *, bottom: *}}
     */
    distributeDirection(points, rotation){
        // console.log("rotation: ", rotation/Math.PI);
        let left={x:0, y:0}, top={x:0, y:0}, right={x:0, y:0}, bottom={x:0, y:0};
        let transverseReference = points.sort((a0, a1)=>{
            return (a0.x - a0.y / Math.tan(Math.PI/2 + rotation)) > (a1.x - a1.y / Math.tan(Math.PI/2 + rotation));
        });
        // for(let tr of transverseReference){
        //     console.log("tr: ", tr.x - tr.y / Math.tan(Math.PI/2 - rotation), tr.x);
        // }
        left.x = transverseReference[0].x;
        left.y = transverseReference[0].y;
        right.x = transverseReference[points.length-1].x;
        right.y = transverseReference[points.length-1].y;
        let verticalReference = points.sort((a0, a1)=>{
            return (a0.y - a0.x * Math.tan(rotation)) > (a1.y - a1.x * Math.tan(rotation));
        });
        // for(let vr of verticalReference){
        //     console.log("vr: ", vr.y - vr.x * Math.tan(rotation), vr.y);
        // }
        top.x = verticalReference[0].x;
        top.y = verticalReference[0].y;
        bottom.x = verticalReference[points.length-1].x;
        bottom.y = verticalReference[points.length-1].y;
        return {left, top, right, bottom};
    }


    /**
     * 一个直角坐标系中，存在a, b两点，存在一个与x轴夹角为θ的线l，这条线过b点，a点可过l做条垂线，求垂足坐标
     *
     * @param point
     * @returns {{a0: *, a1: *, a2: *, a3: *}}
     */
    footPoint(a, b, rotation, state){
        let od, result;
        if(b.x-a.x === 0){
            od = Math.PI / 2;
        }else{
            od = Math.atan((b.y - a.y) / (b.x - a.x));
        }

        if(a.x < b.x ){
            result = {
                x: (b.x - (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) * Math.cos(od - rotation) * Math.cos(rotation))),
                y: (b.y - (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) * Math.cos(od - rotation) * Math.sin(rotation)))
            };
        }else if(a.x > b.x ){
            result = {
                x: (b.x + (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) * Math.cos(od - rotation) * Math.cos(rotation))),
                y: (b.y + (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) * Math.cos(od - rotation) * Math.sin(rotation)))
            };
        }else if(a.x === b.x){
            if(a.y < b.y){
                result = {
                    x: (b.x - (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) * Math.cos(od - rotation) * Math.cos(rotation))),
                    y: (b.y - (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) * Math.cos(od - rotation) * Math.sin(rotation)))
                };
            }else if(a.y > b.y){
                result = {
                    x: (b.x + (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) * Math.cos(od - rotation) * Math.cos(rotation))),
                    y: (b.y + (Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) * Math.cos(od - rotation) * Math.sin(rotation)))
                };
            }else{
                result = {
                    x: b.x,
                    y: b.y
                };
            }
        }

        return result;
    }

    rectanglePoint(point, rotation){
        return {
            leftTop: this.footPoint(point.left, point.top, rotation, "leftTop"),
            rightTop: this.footPoint(point.right, point.top, rotation, "rightTop"),
            rightBottom: this.footPoint(point.right, point.bottom, rotation, "rightBottom"),
            leftBottom: this.footPoint(point.left, point.bottom, rotation, "leftBottom")
        };
    }

    /**
     * 求出实际efficacyFrame所占用的宽高
     * 和bunny的宽高，旋转角度都有关系
     * @param bunnies
     * @returns {{top: *, right: *, bottom: *, left: *}}
     */
    efficacyMaxSize(bunnies, rotation){
        if(!rotation){
            rotation = 0;
        }
        let points = [];
        for(let bunny of bunnies){
            bunny.lt = {x: bunny.position.x - bunny.width/2, y: bunny.position.y - bunny.height/2};
            bunny.rt = {x: bunny.position.x + bunny.width/2, y: bunny.position.y - bunny.height/2};
            bunny.lb = {x: bunny.position.x - bunny.width/2, y: bunny.position.y + bunny.height/2};
            bunny.rb = {x: bunny.position.x + bunny.width/2, y: bunny.position.y + bunny.height/2};

            let bunnyRotation = bunny.rotation===undefined ?0:bunny.rotation;
            let lt = PIXI_BASE_UTILS.rotationPoint(bunny.lt, bunny.position, bunnyRotation);
            let rt = PIXI_BASE_UTILS.rotationPoint(bunny.rt, bunny.position, bunnyRotation);
            let rb = PIXI_BASE_UTILS.rotationPoint(bunny.rb, bunny.position, bunnyRotation);
            let lb = PIXI_BASE_UTILS.rotationPoint(bunny.lb, bunny.position, bunnyRotation);
            points.push(lt, rt, rb, lb);
        }
        let result = this.distributeDirection(points, rotation);

        let {leftTop, rightTop, rightBottom, leftBottom} = this.rectanglePoint(result, rotation);

        let centerPoint = {x: (leftTop.x+rightBottom.x)/2, y: (leftTop.y+rightBottom.y)/2};
        let leftTopRotated = PIXI_BASE_UTILS.rotationPoint(leftTop, centerPoint, -rotation);
        let rightBottomRotated = PIXI_BASE_UTILS.rotationPoint(rightBottom, centerPoint, -rotation);

        return {
            top: leftTopRotated.y,
            left: leftTopRotated.x,
            right: rightBottomRotated.x,
            bottom: rightBottomRotated.y
        }
    }
    createTestSquare(x, y, text) {
        let t = new PIXI.Text(text,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
        t.position.x = x;
        t.position.y = y;
        t.anchor.set(0.5);
        return t;
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

            _this.efficacyCanvasInitPosition.x = e.data.global.x;
            _this.efficacyCanvasInitPosition.y = e.data.global.y;

            //为了对bunny大小做出变化，需要设置新的anchor
            _this.bunnySelectStore.forEach(bunny =>{
                bunny.initSizeAndPosition.width = bunny.width;
                bunny.initSizeAndPosition.height = bunny.height;
                bunny.initSizeAndPosition.x = bunny.position.x;
                bunny.initSizeAndPosition.y = bunny.position.y;

                _this.efficacyContainer.initSizeAndPosition.x = _this.efficacyContainer.position.x;
                _this.efficacyContainer.initSizeAndPosition.y = _this.efficacyContainer.position.y;
                _this.efficacyContainer.initSizeAndPosition.width = _this.efficacyContainer.width;
                _this.efficacyContainer.initSizeAndPosition.height = _this.efficacyContainer.height;

                let efficacyAnchorPosition = {x: 0, y: 0};
                let efficacyAnchor ;
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
                efficacyAnchor = PIXI_BASE_UTILS.rotationPoint(efficacyAnchorPosition, _this.efficacyContainer.position, _this.efficacyContainer.rotation);
                PIXI_BASE_UTILS.bunnySetNewAnchorPosition(bunny, efficacyAnchor);
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
        graphics.on("pointerover", ()=>{_this.bunnyRotationPock.displayRotationPock()});
        graphics.on("pointerout", ()=>{_this.bunnyRotationPock.hideRotationPock()});
        graphics.on("pointerdown", e=>{

            if(btnState) _this.btnState[btnState] = true;
            _this.efficacyContainer.initRotation = _this.efficacyContainer.rotation;

            _this.efficacyInitPosition.x = e.data.originalEvent.x;
            _this.efficacyInitPosition.y = e.data.originalEvent.y;

            _this.efficacyCanvasInitPosition.x = e.data.global.x;
            _this.efficacyCanvasInitPosition.y = e.data.global.y;

            let frameCenter = this.getFrameCenter();

            this.bunnySelectStore.forEach(bunny =>{
                PIXI_BASE_UTILS.bunnySetNewAnchorPosition(bunny, frameCenter)
            })
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
            _this.bunnySelectStore.forEach(bunny =>{
                _this.bunnyContainer.removeChild(bunny);
                bunny.destroy();
            });
            _this.bunnySelectStore.splice(0, _this.bunnySelectStore.length);
            _this.clearEfficacy();
        });
        return removeContainer;
    }
    getFrameCenter(){
        return {
            x: this.efficacyContainer.position.x,
            y: this.efficacyContainer.position.y
        };
    }
    initEfficacyContainerPosition(){
        if(!this.efficacyContainer.initSizeAndPosition){
            this.efficacyContainer.initSizeAndPosition = {};
        }
        this.efficacyContainer.initSizeAndPosition.x = this.efficacyContainer.position.x;
        this.efficacyContainer.initSizeAndPosition.y = this.efficacyContainer.position.y;
    }
    /**
     * 入口:
     *  所选的bunnys在这里进行初始化工作。
     *
     *  TODO ##注意:目前不支持bunny的append动作##
     */
    compose(selectBunny){
        let _this = this;

        //TODO DEBUG
        this.testContainer.removeChildren(0, this.testContainer.children.length);

        this.clearEfficacy();
        let lastBunny = {
            rotation: 0
        }
        if(selectBunny){
            lastBunny = selectBunny;
        }else{
            if(this.bunnySelectStore.length > 0){
                lastBunny = this.bunnySelectStore[this.bunnySelectStore.length-1];
            }
        }

        let {top, right, bottom, left} = this.efficacyMaxSize(_this.bunnySelectStore, lastBunny.rotation);

        this.efficacyFrameSize.width = Math.abs(right - left);
        this.efficacyFrameSize.height = Math.abs(bottom - top);

        this.efficacyContainer.pivot.x = this.efficacyFrameSize.width/2 +10;
        this.efficacyContainer.pivot.y = this.efficacyFrameSize.height/2 +10;

       //TODO
        /**
         * 这里的顺序不能乱来，通常情况下，我们是看下标的来判断是属于哪个按钮
         * @type {[null,null,null,null,null,null,null,null,null,null,null,null,null]}
         */
        this.squaresEfficacy.splice(0, this.squaresEfficacy.length);
        this.squaresEfficacy[0] = this.createSquare(15, 15, "leftTop");
        this.squaresEfficacy[1] = this.createSquare(15+this.efficacyFrameSize.width/2, 15, "centerTop");
        this.squaresEfficacy[2] = this.createSquare(15+this.efficacyFrameSize.width, 15, "rightTop");
        this.squaresEfficacy[3] = this.createSquare(15+this.efficacyFrameSize.width, 15+this.efficacyFrameSize.height/2, "rightCenter");
        this.squaresEfficacy[4] = this.createSquare(15+this.efficacyFrameSize.width, 15+this.efficacyFrameSize.height, "rightBottom");
        this.squaresEfficacy[5] = this.createSquare(15+this.efficacyFrameSize.width/2, 15+this.efficacyFrameSize.height, "centerBottom");
        this.squaresEfficacy[6] = this.createSquare(15, 15+this.efficacyFrameSize.height, "leftBottom");
        this.squaresEfficacy[7] = this.createSquare(15, 15+this.efficacyFrameSize.height/2, "leftCenter");

        this.squaresEfficacy[8] = this.createCircle(this.efficacyFrameSize.width/2+15, 0, "rotation");
        this.squaresEfficacy[9] = this.createSquare(0, 0);
        this.squaresEfficacy[10] = this.createSquare(this.efficacyFrameSize.width+30, 0);
        this.squaresEfficacy[11] = this.createRemove(this.efficacyFrameSize.width+30, this.efficacyFrameSize.height+30);
        this.squaresEfficacy[12] = this.createSquare(0, this.efficacyFrameSize.height+30);

        //为efficacyFrame形态变化做好数据初始化
        this.squaresEfficacy.forEach(s=>{this.efficacyContainer.addChild(s)});
        this.efficacyContainer.position.x = (right+left)/2;
        this.efficacyContainer.position.y = (top+bottom)/2;

        this.efficacyContainer.rotation = lastBunny.rotation===undefined ?0:lastBunny.rotation;

        this.efficacyFrameInitSize.width = this.efficacyFrameSize.width;
        this.efficacyFrameInitSize.height = this.efficacyFrameSize.height;

    }
}
