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
        graphics.drawCircle(0, 0, this.computedRadius(this.efficacyFrame.efficacyFrameSize.width, this.efficacyFrame.efficacyFrameSize.height));
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
    rotationMove(e, efficacyInitPosition){
        let {x, y} = this.efficacyFrame.getFrameCenter();
        let rotationAngle = Math.atan((e.x-x)/(e.y-y)) - Math.atan((efficacyInitPosition.x - x) / (efficacyInitPosition.y - y));
    }
}