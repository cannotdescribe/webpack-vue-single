export default {
    /**
     * 计算新的anchor
     * @param width                  float                  bunny宽
     * @param height                 float                  bunny高
     * @param x                      float                  bunny 位置x轴
     * @param y                      float                  bunny 位置y轴
     * @param anchor                 {x: float, y: float}   bunny anchor
     * @param efficacyAnchorPosition {x: float, y: float}   efficacy应该的anchor位置
     * @param rotation               float                  deg 图形旋转的角度
     */
    computedAnchor(width, height, x, y, anchor, efficacyAnchorPosition, rotation){
        if(rotation === undefined){
            rotation = 0;
        }
        let abLength = Math.sqrt(Math.pow(efficacyAnchorPosition.x - x, 2) + Math.pow(efficacyAnchorPosition.y - y, 2));
        let angle;

        if(efficacyAnchorPosition.x - x === 0){
            angle = rotation - Math.PI/2;
        }else{
            // console.log("+++: ", efficacyAnchorPosition.x, efficacyAnchorPosition.y, x, y);
            // console.log("---: ", Math.atan((efficacyAnchorPosition.x - x)/(efficacyAnchorPosition.y - y)), rotation, Math.PI/2);
            // console.log("##宽度和高##: ", (efficacyAnchorPosition.x - x), (efficacyAnchorPosition.y - y));
            // console.log("position: ", {x, y});
            angle = Math.atan((efficacyAnchorPosition.x - x)/(efficacyAnchorPosition.y - y)) - (Math.PI/2 - rotation);
        }
        // console.log("width: ", Math.cos(angle)+"*"+abLength, "height: ", Math.sin(angle)+"*"+abLength, "angle: ", angle);

        let moveWidth = abLength * Math.cos(angle);
        let moveHeight = abLength * Math.sin(angle);

        // console.log("moveWidth: ",moveWidth, "moveHeight: ", moveHeight);

        let res = {x: 0.5, y: 0.5}
        if(efficacyAnchorPosition.x > x && efficacyAnchorPosition.y < y){
            console.log("-----------A----------");
            res.x = (width/2 - moveWidth) / width;
            res.y = (height/2 + moveHeight) / height;
        }else if(efficacyAnchorPosition.x > x && efficacyAnchorPosition.y > y){
            console.log("-----------B----------");
            res.x = (width/2 + moveWidth) / width;
            res.y = (height/2 - moveHeight) / height;
        }else if(efficacyAnchorPosition.x < x && efficacyAnchorPosition.y < y){
            console.log("-----------C----------");
            res.x = (width/2 - moveWidth) / width;
            res.y = (height/2 + moveHeight) / height;
        }else if(efficacyAnchorPosition.x < x && efficacyAnchorPosition.y > y){
            console.log("-----------D----------");
            res.x = (width/2 + moveWidth) / width;
            res.y = (height/2 - moveHeight) / height;
        }else if(efficacyAnchorPosition.x > x && efficacyAnchorPosition.y === y){
            console.log("-----------e----------");
            // res.x = (width/2 - moveWidth) / width;
            res.y = (height/2 - moveHeight) / height;
        }else if(efficacyAnchorPosition.x > x && efficacyAnchorPosition.y === y){
            console.log("-----------f----------");
            // res.x = (width/2 + moveWidth) / width;
            res.y = (height/2 + moveHeight) / height;
        }else if(efficacyAnchorPosition.x === x && efficacyAnchorPosition.y < y){
            console.log("-----------g----------");
            res.x = (width/2 + moveWidth) / width;
            // res.y = (height/2 + moveHeight) / height;
        }else if(efficacyAnchorPosition.x === x && efficacyAnchorPosition.y > y){
            console.log("-----------h----------");
            res.x = (width/2 - moveWidth) / width;
            // res.y = (height/2 - moveHeight) / height;
        }else{
            console.log("fffffffffffffffffffff");
            console.log(efficacyAnchorPosition.x , x ,efficacyAnchorPosition.y , y);
        }

        console.log("res: ", res);
        return res;
    },

    /**
     * 获得 新的anchor坐标
     * @param bunny
     * @param position {{x, y}}
     * @returns {{x, y}|*}
     */
    efficacyGetAnchor(bunny, position){
        return this.computedAnchor(
            bunny.initSizeAndPosition.width,
            bunny.initSizeAndPosition.height,
            bunny.initSizeAndPosition.x,
            bunny.initSizeAndPosition.y,
            {
                x: bunny.anchor.x,
                y: bunny.anchor.y
            },
            position,
            bunny.rotation
        );
    },

    bunnySetNewAnchorPosition(bunny, position){
        this.bunnySetNewAnchor(bunny, this.efficacyGetAnchor(bunny, position));
    },

    bunnySetNewAnchor(bunny, newAnchor){
        /*
            测试代码
            bunny.anchor.set(1.5, 1.5);
            bunny.position.x = bunny.position.x + bunny.width * Math.cos(bunny.rotation) - bunny.height * Math.sin(bunny.rotation);
            bunny.position.y = bunny.position.y + bunny.width * Math.sin(bunny.rotation) + bunny.height * Math.cos(bunny.rotation);
        */
        let oldAnchor ={x: bunny.anchor.x, y: bunny.anchor.y};
        // console.log("newAnchor: ",  newAnchor);
        bunny.anchor.set(newAnchor.x, newAnchor.y);
        bunny.position.x = bunny.position.x + (newAnchor.x - oldAnchor.x) * bunny.width * Math.cos(bunny.rotation) - (newAnchor.y - oldAnchor.y) * bunny.height * Math.sin(bunny.rotation);
        bunny.position.y = bunny.position.y + (newAnchor.x - oldAnchor.x) * bunny.width * Math.sin(bunny.rotation) + (newAnchor.y - oldAnchor.y) * bunny.height * Math.cos(bunny.rotation);
    }

}