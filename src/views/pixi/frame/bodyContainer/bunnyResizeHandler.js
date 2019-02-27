import PIXI_BASE_UTILS from "../../utils/PIXI_BASE_UTILS.js"

export default class BunnyResizeHandler{
    constructor(efficacyFrame){
        this.efficacyFrame = efficacyFrame;
        this.btnState = this.efficacyFrame.btnState;
        this.squaresEfficacy = this.efficacyFrame.squaresEfficacy;
        this.efficacyInitPosition = this.efficacyFrame.efficacyInitPosition;
        this.bunnySelectStore = this.efficacyFrame.bunnySelectStore;
        this.efficacyFrameSize = this.efficacyFrame.efficacyFrameSize;
    }
    destroy(){

    }
    moveHandler(e) {
        let verticalWidthMove = e.x - this.efficacyInitPosition.x;
        let verticalHeightMove = e.y - this.efficacyInitPosition.y;
        let efficacyMove = PIXI_BASE_UTILS.getMove(this.efficacyFrame.efficacyContainer.rotation, verticalWidthMove, verticalHeightMove);
        let widthMove = efficacyMove.width;
        let heightMove = efficacyMove.height;
        // console.log("move handler: ", heightMove, widthMove);
        // if(heightMove>0){}


        if (this.btnState.leftTop) {
            if(widthMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.width){
                widthMove = this.efficacyFrame.efficacyContainer.initSizeAndPosition.width-64
            }
            if(heightMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.height){
                heightMove = this.efficacyFrame.efficacyContainer.initSizeAndPosition.height-64
            }
            
            
            this.bunnySelectStore.forEach(bunny => {
                let {width, height} = PIXI_BASE_UTILS.getBunnySize(this.efficacyFrame.efficacyContainer.rotation, bunny.rotation, widthMove, heightMove, this.btnState);
                bunny.width = bunny.initSizeAndPosition.width / this.efficacyFrameSize.width * - width + bunny.initSizeAndPosition.width;
                bunny.height = bunny.initSizeAndPosition.height / this.efficacyFrameSize.height * - height + bunny.initSizeAndPosition.height;
            });

            this.squaresEfficacy[0].position.x = this.squaresEfficacy[0].initPosition.x + widthMove;
            this.squaresEfficacy[0].position.y = this.squaresEfficacy[0].initPosition.y + heightMove;
            this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove / 2;
            this.squaresEfficacy[1].position.y = this.squaresEfficacy[1].initPosition.y + heightMove;
            this.squaresEfficacy[2].position.y = this.squaresEfficacy[2].initPosition.y + heightMove;
            this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove / 2;
            this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove / 2;
            this.squaresEfficacy[6].position.x = this.squaresEfficacy[6].initPosition.x + widthMove;
            this.squaresEfficacy[7].position.x = this.squaresEfficacy[7].initPosition.x + widthMove;
            this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove / 2;

            this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove / 2;
            this.squaresEfficacy[8].position.y = this.squaresEfficacy[8].initPosition.y + heightMove;
            this.squaresEfficacy[9].position.x = this.squaresEfficacy[9].initPosition.x + widthMove;
            this.squaresEfficacy[9].position.y = this.squaresEfficacy[9].initPosition.y + heightMove;
            this.squaresEfficacy[10].position.y = this.squaresEfficacy[10].initPosition.y + heightMove;
            this.squaresEfficacy[12].position.x = this.squaresEfficacy[12].initPosition.x + widthMove;

        } else if (this.btnState.centerTop) {
            if(heightMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.height){
                heightMove = this.efficacyFrame.efficacyContainer.initSizeAndPosition.height-64
            }

            this.bunnySelectStore.forEach(bunny => {
                let {width, height} = PIXI_BASE_UTILS.getBunnySize(this.efficacyFrame.efficacyContainer.rotation, bunny.rotation, widthMove, heightMove, this.btnState, "c");
                 //TODO
                bunny.width = bunny.initSizeAndPosition.width / this.efficacyFrameSize.width * - width + bunny.initSizeAndPosition.width;
                bunny.height = bunny.initSizeAndPosition.height / this.efficacyFrameSize.height * -height + bunny.initSizeAndPosition.height;
            });

            this.squaresEfficacy[0].position.y = this.squaresEfficacy[0].initPosition.y + heightMove;
            this.squaresEfficacy[1].position.y = this.squaresEfficacy[1].initPosition.y + heightMove;
            this.squaresEfficacy[2].position.y = this.squaresEfficacy[2].initPosition.y + heightMove;
            this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove / 2;
            this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove / 2;

            this.squaresEfficacy[8].position.y = this.squaresEfficacy[8].initPosition.y + heightMove;
            this.squaresEfficacy[9].position.y = this.squaresEfficacy[9].initPosition.y + heightMove;
            this.squaresEfficacy[10].position.y = this.squaresEfficacy[10].initPosition.y + heightMove;

        } else if (this.btnState.rightTop) {
            if(-widthMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.width){
                widthMove = -(this.efficacyFrame.efficacyContainer.initSizeAndPosition.width-64)
            }
            if(heightMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.height){
                heightMove = this.efficacyFrame.efficacyContainer.initSizeAndPosition.height-64
            }

            this.bunnySelectStore.forEach(bunny => {
                let {width, height} = PIXI_BASE_UTILS.getBunnySize(this.efficacyFrame.efficacyContainer.rotation, bunny.rotation, widthMove, heightMove, this.btnState);
                bunny.width = bunny.initSizeAndPosition.width / this.efficacyFrameSize.width * width + bunny.initSizeAndPosition.width;
                bunny.height = bunny.initSizeAndPosition.height / this.efficacyFrameSize.height * -height + bunny.initSizeAndPosition.height;
            });
            this.squaresEfficacy[0].position.y = this.squaresEfficacy[0].initPosition.y + heightMove;
            this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove / 2;
            this.squaresEfficacy[1].position.y = this.squaresEfficacy[1].initPosition.y + heightMove;
            this.squaresEfficacy[2].position.x = this.squaresEfficacy[2].initPosition.x + widthMove;
            this.squaresEfficacy[2].position.y = this.squaresEfficacy[2].initPosition.y + heightMove;
            this.squaresEfficacy[3].position.x = this.squaresEfficacy[3].initPosition.x + widthMove;
            this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove / 2;
            this.squaresEfficacy[4].position.x = this.squaresEfficacy[4].initPosition.x + widthMove;
            this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove / 2;
            this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove / 2;

            this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove / 2;
            this.squaresEfficacy[8].position.y = this.squaresEfficacy[8].initPosition.y + heightMove;
            this.squaresEfficacy[9].position.y = this.squaresEfficacy[9].initPosition.y + heightMove;
            this.squaresEfficacy[10].position.x = this.squaresEfficacy[10].initPosition.x + widthMove;
            this.squaresEfficacy[10].position.y = this.squaresEfficacy[10].initPosition.y + heightMove;
            this.squaresEfficacy[11].position.x = this.squaresEfficacy[11].initPosition.x + widthMove;
        } else if (this.btnState.rightCenter) {
            if(-widthMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.width){
                widthMove = -(this.efficacyFrame.efficacyContainer.initSizeAndPosition.width-64)
            }
            this.bunnySelectStore.forEach(bunny => {
                let {width, height} = PIXI_BASE_UTILS.getBunnySize(this.efficacyFrame.efficacyContainer.rotation, bunny.rotation, widthMove, heightMove, this.btnState, "r");
                bunny.width = bunny.initSizeAndPosition.width / this.efficacyFrameSize.width * width + bunny.initSizeAndPosition.width;
                //TODO
                bunny.height = bunny.initSizeAndPosition.height / this.efficacyFrameSize.height * -height + bunny.initSizeAndPosition.height;
            });

            this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove / 2;
            this.squaresEfficacy[2].position.x = this.squaresEfficacy[2].initPosition.x + widthMove;
            this.squaresEfficacy[3].position.x = this.squaresEfficacy[3].initPosition.x + widthMove;
            this.squaresEfficacy[4].position.x = this.squaresEfficacy[4].initPosition.x + widthMove;
            this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove / 2;

            this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove / 2;
            this.squaresEfficacy[10].position.x = this.squaresEfficacy[10].initPosition.x + widthMove;
            this.squaresEfficacy[11].position.x = this.squaresEfficacy[11].initPosition.x + widthMove;
        } else if (this.btnState.rightBottom) {
            if(-widthMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.width){
                widthMove = -(this.efficacyFrame.efficacyContainer.initSizeAndPosition.width-64)
            }
            if(-heightMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.height){
                heightMove = -(this.efficacyFrame.efficacyContainer.initSizeAndPosition.height-64)
            }

            this.bunnySelectStore.forEach(bunny => {
                let {width, height} = PIXI_BASE_UTILS.getBunnySize(this.efficacyFrame.efficacyContainer.rotation, bunny.rotation, widthMove, heightMove, this.btnState);
                bunny.width = bunny.initSizeAndPosition.width / this.efficacyFrameSize.width * width + bunny.initSizeAndPosition.width;
                bunny.height = bunny.initSizeAndPosition.height / this.efficacyFrameSize.height * height + bunny.initSizeAndPosition.height;
            });

            this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove / 2;
            this.squaresEfficacy[2].position.x = this.squaresEfficacy[2].initPosition.x + widthMove;
            this.squaresEfficacy[3].position.x = this.squaresEfficacy[3].initPosition.x + widthMove;
            this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove / 2;
            this.squaresEfficacy[4].position.x = this.squaresEfficacy[4].initPosition.x + widthMove;
            this.squaresEfficacy[4].position.y = this.squaresEfficacy[4].initPosition.y + heightMove;
            this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove / 2;
            this.squaresEfficacy[5].position.y = this.squaresEfficacy[5].initPosition.y + heightMove;
            this.squaresEfficacy[6].position.y = this.squaresEfficacy[6].initPosition.y + heightMove;
            this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove / 2;

            this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove / 2;
            this.squaresEfficacy[10].position.x = this.squaresEfficacy[10].initPosition.x + widthMove;
            this.squaresEfficacy[11].position.x = this.squaresEfficacy[11].initPosition.x + widthMove;
            this.squaresEfficacy[11].position.y = this.squaresEfficacy[11].initPosition.y + heightMove;
            this.squaresEfficacy[12].position.y = this.squaresEfficacy[12].initPosition.y + heightMove;
        } else if (this.btnState.centerBottom) {
            if(-heightMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.height){
                heightMove = -(this.efficacyFrame.efficacyContainer.initSizeAndPosition.height-64)
            }
            this.bunnySelectStore.forEach(bunny => {
                let {width, height} = PIXI_BASE_UTILS.getBunnySize(this.efficacyFrame.efficacyContainer.rotation, bunny.rotation, widthMove, heightMove, this.btnState, "c");
                //TODO
                bunny.width = bunny.initSizeAndPosition.width / this.efficacyFrameSize.width * width + bunny.initSizeAndPosition.width;
                bunny.height = bunny.initSizeAndPosition.height / this.efficacyFrameSize.height * height + bunny.initSizeAndPosition.height;
            });
            this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove / 2;
            this.squaresEfficacy[4].position.y = this.squaresEfficacy[4].initPosition.y + heightMove;
            this.squaresEfficacy[5].position.y = this.squaresEfficacy[5].initPosition.y + heightMove;
            this.squaresEfficacy[6].position.y = this.squaresEfficacy[6].initPosition.y + heightMove;
            this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove / 2;

            this.squaresEfficacy[11].position.y = this.squaresEfficacy[11].initPosition.y + heightMove;
            this.squaresEfficacy[12].position.y = this.squaresEfficacy[12].initPosition.y + heightMove;
        } else if (this.btnState.leftBottom) {
            if(widthMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.width){
                widthMove = this.efficacyFrame.efficacyContainer.initSizeAndPosition.width-64
            }
            if(-heightMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.height){
                heightMove = -(this.efficacyFrame.efficacyContainer.initSizeAndPosition.height-64)
            }
            this.bunnySelectStore.forEach(bunny => {
                let {width, height} = PIXI_BASE_UTILS.getBunnySize(this.efficacyFrame.efficacyContainer.rotation, bunny.rotation, widthMove, heightMove, this.btnState);
                bunny.width = bunny.initSizeAndPosition.width / this.efficacyFrameSize.width * -width + bunny.initSizeAndPosition.width;
                bunny.height = bunny.initSizeAndPosition.height / this.efficacyFrameSize.height * height + bunny.initSizeAndPosition.height;
            });
            this.squaresEfficacy[0].position.x = this.squaresEfficacy[0].initPosition.x + widthMove;
            this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove / 2;
            this.squaresEfficacy[3].position.y = this.squaresEfficacy[3].initPosition.y + heightMove / 2;
            this.squaresEfficacy[4].position.y = this.squaresEfficacy[4].initPosition.y + heightMove;
            this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove / 2;
            this.squaresEfficacy[5].position.y = this.squaresEfficacy[5].initPosition.y + heightMove;
            this.squaresEfficacy[6].position.y = this.squaresEfficacy[6].initPosition.y + heightMove;
            this.squaresEfficacy[6].position.x = this.squaresEfficacy[6].initPosition.x + widthMove;
            this.squaresEfficacy[7].position.x = this.squaresEfficacy[7].initPosition.x + widthMove;
            this.squaresEfficacy[7].position.y = this.squaresEfficacy[7].initPosition.y + heightMove / 2;

            this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove / 2;
            this.squaresEfficacy[9].position.x = this.squaresEfficacy[9].initPosition.x + widthMove;
            this.squaresEfficacy[11].position.y = this.squaresEfficacy[11].initPosition.y + heightMove;
            this.squaresEfficacy[12].position.y = this.squaresEfficacy[12].initPosition.y + heightMove;
            this.squaresEfficacy[12].position.x = this.squaresEfficacy[12].initPosition.x + widthMove;
        } else if (this.btnState.leftCenter) {
            if(widthMove+64 > this.efficacyFrame.efficacyContainer.initSizeAndPosition.width){
                widthMove = this.efficacyFrame.efficacyContainer.initSizeAndPosition.width-64
            }
            this.bunnySelectStore.forEach(bunny => {
                let {width, height} = PIXI_BASE_UTILS.getBunnySize(this.efficacyFrame.efficacyContainer.rotation, bunny.rotation, widthMove, heightMove, this.btnState, "r");
                bunny.width = bunny.initSizeAndPosition.width / this.efficacyFrameSize.width * -width + bunny.initSizeAndPosition.width;
                //TODO
                bunny.height = bunny.initSizeAndPosition.height / this.efficacyFrameSize.height * height + bunny.initSizeAndPosition.height;
            });

            this.squaresEfficacy[0].position.x = this.squaresEfficacy[0].initPosition.x + widthMove;
            this.squaresEfficacy[1].position.x = this.squaresEfficacy[1].initPosition.x + widthMove / 2;
            this.squaresEfficacy[5].position.x = this.squaresEfficacy[5].initPosition.x + widthMove / 2;
            this.squaresEfficacy[6].position.x = this.squaresEfficacy[6].initPosition.x + widthMove;
            this.squaresEfficacy[7].position.x = this.squaresEfficacy[7].initPosition.x + widthMove;

            this.squaresEfficacy[8].position.x = this.squaresEfficacy[8].initPosition.x + widthMove / 2;
            this.squaresEfficacy[9].position.x = this.squaresEfficacy[9].initPosition.x + widthMove;
            this.squaresEfficacy[12].position.x = this.squaresEfficacy[12].initPosition.x + widthMove;
        }
    }
}