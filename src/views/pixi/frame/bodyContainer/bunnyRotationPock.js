import * as PIXI from "pixi.js"

export default class BunnyRotationPock{
    constructor(efficacyFrame){
        this.efficacyFrame = efficacyFrame;
        this.efficacy = efficacyFrame.efficacy;

        this._graphics = null;
        this.container = new PIXI.Container();
    }
    destroy(){

    }
    computedRadius(width, height){
        return Math.sqrt(Math.pow(width+30, 2)+Math.pow(height+30, 2))/2
    }
    displayRotationPock(){
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x2C3E50, 1);
        graphics.beginFill(0xFF0000, 0.05);
        graphics.drawCircle(
            (this.efficacyFrame.efficacyFrameSize.width+15)/2,
            (this.efficacyFrame.efficacyFrameSize.height+15)/2,
            this.computedRadius(this.efficacyFrame.efficacyFrameSize.width, this.efficacyFrame.efficacyFrameSize.height)
        );
        graphics.endFill();

        this._graphics = graphics;
        this.efficacyFrame.efficacyContainer.addChildAt(graphics, 0)
    }
    hideRotationPock(){
        this.efficacyFrame.efficacyContainer.removeChild(this._graphics);
    }
    recoverAnchor(bunnys){
        for(let bunny of bunnys){
            bunny.anchor.set(0.5);
        }
    }
    newAnchor(bunnys){
        for(let bunny of bunnys){
            let position = this.efficacyFrame.getFrameCenter();
            let anchor = this.efficacyFrame.efficacyGetAnchor(bunny, position);
            bunny.anchor.set(anchor.x, anchor.y);
        }
    }
    recoverAnchorAndPock(){

    }
    atanAngle(widthInit, heightInit){
        if(widthInit>0 &&heightInit>0){
            return Math.atan(heightInit/widthInit);
        }else if(widthInit<0 &&heightInit>0){
            return Math.PI + Math.atan(heightInit/widthInit);
        }else if(widthInit<0 &&heightInit<0){
            return Math.PI + Math.atan(heightInit/widthInit);
        }else if(widthInit>0 &&heightInit<0){
            return 2 * Math.PI + Math.atan(heightInit/widthInit);
        }
    }
    moveRotation(e, efficacyCanvasInitPosition, initRotation){
        let widthMove = e.layerX - this.efficacyFrame.efficacyContainer.x;
        let heightMove = e.layerY - this.efficacyFrame.efficacyContainer.y;

        let widthInit = efficacyCanvasInitPosition.x - this.efficacyFrame.efficacyContainer.x;
        let heightInit = efficacyCanvasInitPosition.y - this.efficacyFrame.efficacyContainer.y;

        let initAngle = this.atanAngle(widthInit, heightInit);
        let moveAngle = this.atanAngle(widthMove, heightMove);

        return (initRotation + (moveAngle - initAngle));
    }

    bunnyMoveRotation(e, efficacyCanvasInitPosition, initRotation){
        let widthMove = e.layerX - this.efficacyFrame.efficacyContainer.x;
        let heightMove = e.layerY - this.efficacyFrame.efficacyContainer.y;

        let widthInit = efficacyCanvasInitPosition.x - this.efficacyFrame.efficacyContainer.x;
        let heightInit = efficacyCanvasInitPosition.y - this.efficacyFrame.efficacyContainer.y;

        let initAngle = this.atanAngle(widthInit, heightInit);
        let moveAngle = this.atanAngle(widthMove, heightMove);

        return (initRotation + (moveAngle - initAngle));
    }
    //旋转移动响应事件
    rotationMove(e, efficacyCanvasInitPosition){
        this.efficacyFrame.efficacyContainer.rotation = this.moveRotation(e, efficacyCanvasInitPosition, this.efficacyFrame.efficacyContainer.initRotation);
        this.efficacyFrame.bunnySelectStore.forEach(bunny =>{
            bunny.rotation = this.bunnyMoveRotation(e, efficacyCanvasInitPosition, bunny.initRotation);
        })
    }
}

