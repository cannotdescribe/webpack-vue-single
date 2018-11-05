import * as PIXI from "pixi.js"

export default class RotationPock{
    constructor(efficacyFrame){
        this.efficacyFrame = efficacyFrame;
        this.efficacy = efficacyFrame.efficacy;
        this.size = efficacyFrame.size;

        this._graphics = null;
        this.container = new PIXI.Container();
    }
    destroy(){

    }
    computedRadius(width, height){
        return Math.sqrt(Math.pow(width+40, 2)+Math.pow(height+40, 2))/2
    }
    displayRotationPock(){
        let graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x2C3E50, 1);
        graphics.beginFill(0xFF0000, 0.05);
        graphics.drawCircle(0, 0, this.computedRadius(this.size.width, this.size.height));
        graphics.endFill();

        this._graphics = graphics;
        this.efficacyFrame.efficacyContainer.addChildAt(graphics, 0)
    }
    hideRotationPock(){
        this.efficacyFrame.efficacyContainer.removeChild(this._graphics);
    }
}