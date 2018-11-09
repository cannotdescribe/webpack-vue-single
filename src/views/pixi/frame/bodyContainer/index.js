import * as PIXI from 'pixi.js'

import EfficacyFrame from "./efficacyFrame.js"

export default class BodyContainer{
    constructor(imgSrc, el){
        this.$el = el;
        this.app = {};
        this.groups =[];
        this.imgSrcReference = null;
        this.bunnyContainer = {};
        this.plane = {};
        this.isCtrlDown = false;
        this.bunnySelect = [];
        this.spriteDemo = {};
        this.mouseEvent = {
            initX: 0,
            initY: 0
        };
        this.imgSrc = imgSrc;
        let _this = this;

        this.app = new PIXI.Application({width: this.$el.offsetWidth, height: this.$el.offsetHeight, transparent: true});
        this.$el.appendChild(this.app.view);

        this.mouseover = ()=>{
            this.imgSrcReference = this.imgSrc;
        }
        this.mouseup = e=>{
            if(this.imgSrcReference){
                let bunny = this.nodeSpriteChange({imgSrc: this.imgSrcReference, x:e.offsetX, y:e.offsetY});
                this.bunnyContainer.addChild(bunny);

                bunny.initSizeAndPosition = {};
                bunny.initSizeAndPosition.width = bunny.width;
                bunny.initSizeAndPosition.height = bunny.height;
                bunny.rotation = Math.PI/4;

                this.imgSrcReference = null;
            }
        }
        this.app.view.addEventListener("mouseover", this.mouseover);
        this.app.view.addEventListener("mouseup", this.mouseup);

        document.onkeydown=function(e) {
            if(e.keyCode === 17){
                _this.isCtrlDown = true;
            }
        };

        document.onkeyup=function(e) {
            if(e.keyCode === 17){
                _this.isCtrlDown = false;
            }
        };

        this.plane = this.createFloor();

        this.bunnyContainer = new PIXI.Container();

        this.efficacyFrame = new EfficacyFrame(this.app, this.plane, this.bunnyContainer, this.bunnySelect);

        this.app.stage.addChild(this.bunnyContainer);

        this.efficacyFrame._initEfficacy();

        this.createDemo();
    }

    destroy(){
        this.app.view.removeEventListener("mouseover", this.mouseover);
        this.app.view.removeEventListener("mouseup", this.mouseup);
        this.efficacyFrame.destroy();
    }
    setImgSrc(imgSrc){
        this.imgSrc = imgSrc;
    }
    createDemo(){
        this.spriteDemo = PIXI.Sprite.fromImage('http://127.0.0.1:8090/static/pixitest/yuan.png');
        this.spriteDemo.position.x = 50;
        this.spriteDemo.position.y = 50;
        this.spriteDemo.anchor.set(0.5);
        this.app.stage.addChild(this.spriteDemo);
    }
    //创建地板，主要是为了做背景事件用的
    createFloor(){
        let planeTexture = new PIXI.Texture(PIXI.Texture.EMPTY)
        let plane = new PIXI.extras.TilingSprite(
            planeTexture,
            this.app.screen.width,
            this.app.screen.height
        );
        plane.interactive = true;
        this.app.stage.addChild(plane);

        plane.on("pointerdown", e=>{
            this.bunnySelect.splice(0, this.bunnySelect.length);
        });

        return plane;
    }
    nodeSpriteChange(node){
        let texture = PIXI.Texture.fromImage(node.imgSrc);
        texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        let bunny = new PIXI.Sprite(texture);
        bunny.anchor.set(0.5);
        this.nodePositionInit(bunny, node.x, node.y);
        return bunny;
    }
    nodePositionInit(bunny, x, y){
        let _this = this;
        bunny.interactive = true;
        bunny.buttonMode = true;
        bunny.anchor.set(0.5);
        bunny.scale.set(3);

        bunny
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);

        bunny.x = x;
        bunny.y = y;

        function onDragStart(event) {
            _this.mouseEvent.initX = event.data.originalEvent.screenX;
            _this.mouseEvent.initY = event.data.originalEvent.screenY;

            this.mouseEvent = {};
            this.mouseEvent.positionInitX = this.position.x;
            this.mouseEvent.positionInitY = this.position.y;

            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;

            let clickSelected = false;
            for(let b of _this.bunnySelect){
                if(b === this) {
                    clickSelected = true ;
                    break
                }
            }
            if(!clickSelected){
                bunny.initSizeAndPosition.x = bunny.position.x;
                bunny.initSizeAndPosition.y = bunny.position.y;
                if(_this.isCtrlDown){
                    _this.bunnySelect.push(bunny);
                }else{
                    _this.bunnySelect.splice(0, _this.bunnySelect.length);
                    _this.bunnySelect.push(bunny);
                }
            }
            _this.efficacyFrame.compose();
            _this.efficacyFrame.startEfficacy(this.x, this.y);
        }

        function onDragEnd() {
            this.alpha = 1;
            this.dragging = false;
            this.data = null;
            for(let bunny of _this.bunnySelect){
                bunny.initSizeAndPosition.x = bunny.position.x;
                bunny.initSizeAndPosition.y = bunny.position.y;
            }
            _this.efficacyFrame.endEfficacy(this.x, this.y);
        }

        function onDragMove(event) {
            if (this.dragging) {
                for(let bunny of _this.bunnySelect){
                    bunny.position.x = bunny.initSizeAndPosition.x + event.data.originalEvent.screenX - _this.mouseEvent.initX;
                    bunny.position.y = bunny.initSizeAndPosition.y + event.data.originalEvent.screenY - _this.mouseEvent.initY;
                }
                _this.efficacyFrame.moveEfficacy(this.x, this.y);
            }
        }
    }
    rotation(){
        this.spriteDemo.rotation += 0.1;
    }
    consoleFmt(){
        console.log(this.spriteDemo);
    }
}