import * as PIXI from "pixi.js"

export default class RotationPock{
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
    moveRotation(e, efficacyInitPosition, initRotation){
        let widthMove = e.x - efficacyInitPosition.x ;
        let heightMove = e.y - efficacyInitPosition.y;

        let circleX = Math.sin(initRotation) * (this.efficacyFrame.efficacyFrameSize.width/2);
        let circleY = Math.cos(initRotation) * (this.efficacyFrame.efficacyFrameSize.height/2);

        if(circleX+widthMove>0){
            return Math.PI/2 - Math.atan((circleY-heightMove)/(circleX+widthMove));
        }else if(circleX+widthMove<0){
            return Math.PI*3/2 - Math.atan((circleY-heightMove)/(circleX+widthMove));
        }else{
            return 0;
        }
    }

    bunnyMoveRotation(e, efficacyInitPosition, initRotation){
        let widthMove = e.x - efficacyInitPosition.x ;
        let heightMove = e.y - efficacyInitPosition.y;

        let circleX = Math.sin(initRotation) * (this.efficacyFrame.efficacyFrameSize.width/2);
        let circleY = Math.cos(initRotation) * (this.efficacyFrame.efficacyFrameSize.height/2);
        if(initRotation !== 0){
            console.log(efficacyInitPosition);
            console.log({widthMove, heightMove, circleX, circleY});
        }

        if(circleX+widthMove>0){
            return Math.PI/2 - Math.atan((circleY-heightMove)/(circleX+widthMove));
        }else if(circleX+widthMove<0){
            return Math.PI*3/2 - Math.atan((circleY-heightMove)/(circleX+widthMove));
        }else{
            return 0;
        }
    }
    //旋转移动响应事件
    rotationMove(e, efficacyInitPosition){
        this.efficacyFrame.efficacyContainer.rotation = this.moveRotation(e, efficacyInitPosition, this.efficacyFrame.efficacyContainer.initRotation);
        this.efficacyFrame.bunnySelect.forEach(bunny =>{
            bunny.rotation = this.bunnyMoveRotation(e, efficacyInitPosition, bunny.initRotation);
        })
    }
}
