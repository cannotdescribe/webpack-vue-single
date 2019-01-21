import * as PIXI from 'pixi.js'

import EfficacyFrame from "./efficacyFrame.js"

/**
 * 目前不集成ctrl功能，这个功能还未开发完成，下版本想办法修复
 * 
 * pixi相关参考说明，
 * 在PIXI中，因为他的大部分属性都采用 Object.defineProperty()————属性监听，采用mvvm模式。
 * 如果直接console.log(对象),无法看清他真实属性，请将将输出内容写的详细，
 * 比如说：console.log(e.data.global.x, e.data.global.y);
 *
 * 1. 在响应事件回调函数中, e.data.global.x, e.data.global.y 为鼠标相对canvas的位置
 *
 */
export default class BodyContainer{
    constructor(el, options){
        this.$el = el;
        this.app = {};
        this.groups =[];
        this.options = options;
        this.bunnyContainer = {};
        this.plane = {};
        this.isCtrlDown = false;
        this.bunnySelectStore = [];
        this.spriteDemo = {};
        this.eventHandler = {
            mouseover: [],
            mouseup: [],

            bunnyMoveEnd: [],
            bunnyMove: [],
            bunnyRotate: [],
            bunnyRemove: []
        }

        this.__planeTexture;
        /**
         * 鼠标点击bunny的初始化位置，参照点
         * @type {{initX: number, initY: number}}
         */
        this.mouseEvent = {
            initX: 0,
            initY: 0
        };
        // this.imgSrc = imgSrc;
        let _this = this;

        this.app = new PIXI.Application({width: this.$el.offsetWidth, height: this.$el.offsetHeight, transparent: true});
        this.$el.appendChild(this.app.view);

        this.mouseover = e =>{
            this.executeHandler("mouseover", e)
        }
        this.mouseup = e =>{
            this.executeHandler("mouseup", e)
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

        this.efficacyFrame = new EfficacyFrame(this, this.app, this.plane, this.bunnyContainer, this.bunnySelectStore);

        this.app.stage.addChild(this.bunnyContainer);

        this.efficacyFrame._initEfficacy();

    }
    executeHandler(eventName, ...args){
        for(let mouseoverHandler of this.eventHandler[eventName]){
            mouseoverHandler.apply(this, args)
        }
    }
    on(eventName, eventHandler){
        this.eventHandler[eventName].push(eventHandler);
    }
    setBackground(background){
        this.__planeTexture.baseTexture = PIXI.BaseTexture.fromImage(background);
    }
    appendChild(imageUrl, options){
        let bunny = this.nodeSpriteChange({imgSrc: imageUrl, x:options.x, y:options.y});
        this.bunnyContainer.addChild(bunny);

        bunny.initSizeAndPosition = {};
        bunny.initSizeAndPosition.width = bunny.width;
        bunny.initSizeAndPosition.height = bunny.height;
        bunny.rotation = 0;
        bunny.initRotation = 0;
    }
    destroy(){
        this.app.view.removeEventListener("mouseover", this.mouseover);
        this.app.view.removeEventListener("mouseup", this.mouseup);
        this.efficacyFrame.destroy();
    }
    
    clearBunnySelected(){
        for(let key in this.bunnySelectStore){
            this.bunnySelectStore[key].bunnySelected = false;
        }
        this.bunnySelectStore.splice(0, this.bunnySelectStore.length);
    }
    //创建地板，主要是为了做背景事件用的
    createFloor(){
        // let planeTexture = new PIXI.Texture(PIXI.Texture.EMPTY)
        this.__planeTexture = PIXI.Texture.fromImage(this.options.background);
        let plane = new PIXI.extras.TilingSprite(
            this.__planeTexture,
            this.app.screen.width,
            this.app.screen.height
        );
        plane.interactive = true;
        this.app.stage.addChild(plane);

        plane.on("pointerdown", e=>{
           this.clearBunnySelected();
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

            /**
             * 为 bunny 属性初始化位置
             * @type {{}}
             */
            this.mouseEvent = {};


            this.mouseEvent.positionInitX = this.position.x;
            this.mouseEvent.positionInitY = this.position.y;

            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;

            //TODO
            _this.efficacyFrame.startEfficacy(event.data.global.x, event.data.global.y);

            if(!this.bunnySelected){
                bunny.initSizeAndPosition.x = bunny.position.x;
                bunny.initSizeAndPosition.y = bunny.position.y;
                if(_this.isCtrlDown){
                    _this.bunnySelectStore.push(bunny);
                }else{
                    _this.clearBunnySelected();
                    _this.bunnySelectStore.push(bunny);
                }

                _this.efficacyFrame.compose(bunny);

                /**
                 * 表示该bunny已经被选中了
                 * @type {boolean}
                 */
                this.bunnySelected = true;
            }
            _this.efficacyFrame.initEfficacyContainerPosition();
        }

        function onDragEnd() {
            this.alpha = 1;
            this.dragging = false;
            this.data = null;
            for(let bunny of _this.bunnySelectStore){
                bunny.initSizeAndPosition.x = bunny.position.x;
                bunny.initSizeAndPosition.y = bunny.position.y;
            }
            _this.efficacyFrame.endEfficacy(this.x, this.y);
            
            _this.executeHandler("bunnyMoveEnd", _this.bunnySelectStore)
        }

        function onDragMove(event) {
            if (this.dragging) {
                for(let bunny of _this.bunnySelectStore){
                    bunny.position.x = bunny.initSizeAndPosition.x + event.data.originalEvent.screenX - _this.mouseEvent.initX;
                    bunny.position.y = bunny.initSizeAndPosition.y + event.data.originalEvent.screenY - _this.mouseEvent.initY;
                }
                _this.efficacyFrame.moveEfficacy(event.data.global.x, event.data.global.y);

                this.executeHandler("bunnyMove", _this.bunnySelectStore)
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