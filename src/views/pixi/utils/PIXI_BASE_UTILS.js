export default {
    /**
     * x0= (x - rx0)*cos(a) - (y - ry0)*sin(a) + rx0 ;
     * y0= (x - rx0)*sin(a) + (y - ry0)*cos(a) + ry0 ;
     * 参考: https://jingyan.baidu.com/article/2c8c281dfbf3dd0009252a7b.html
     * 在平面中，一个点绕任意点旋转θ度后的点的坐标
     * 
     * @param position {{x: *, y:*}} 点的初始位置
     * @param origin {{x: *, y:*}} efficacyContainer 点的旋转中心
     * @param rotation int rad efficacyContainer 点的旋转角度
     * @returns {{x: *, y: *}} 结果
     */
    rotationPoint(position, origin, rotation, btnState){
        return {
            x: (position.x - origin.x) * Math.cos(rotation) - (position.y - origin.y) * Math.sin(rotation) + origin.x,
            y: (position.x - origin.x) * Math.sin(rotation) + (position.y - origin.y) * Math.cos(rotation) + origin.y
        }
    },

    rotationBunnyPoint(bunny, efficacyContainer, btnState){
        let rotation = this.getRealRotation(bunny - efficacyContainer.rotation);

        if(btnState.leftTop){
            
        }else if(btnState.centerTop){
            
        }
        console.log(bunny, efficacyContainer);
        
        return {
            // x: (position.x - origin.x) * Math.cos(rotation) - (position.y - origin.y) * Math.sin(rotation) + origin.x,
            // y: (position.x - origin.x) * Math.sin(rotation) + (position.y - origin.y) * Math.cos(rotation) + origin.y
        }
    },

    getRealRotation(rotation){
        return (rotation%(2*Math.PI)<0)? (rotation%(2*Math.PI)+2*Math.PI) : (rotation%(2*Math.PI));
    },

    getMove(rotation, widthMove, heightMove){
        return {
            width: Math.cos(rotation)*widthMove + Math.sin(rotation)*heightMove,
            height: -Math.sin(rotation)*widthMove + Math.cos(rotation)*heightMove
        };
    },

    getBunnySize(efficacyRotation, bunnyRotation, widthMove, heightMove, btnState, state){
        if(state === "c"){
            widthMove = 0;
        }else if(state === "r"){
            heightMove = 0;
        }
        let rotation = bunnyRotation - efficacyRotation, result = {};
        console.log("rotation: ", rotation);

        if(rotation === 0){
            result = {
                width: widthMove,
                height: heightMove
            }
        }else{
            
            let ro = (rotation%(2*Math.PI)<0)? (rotation%(2*Math.PI)+2*Math.PI) : (rotation%(2*Math.PI));

            if(btnState.leftTop){
                console.log("leftTop: ", ro)
                if(ro > Math.PI*7/4 || ro <= Math.PI/4){
                    result.height = (-Math.sin(rotation) * widthMove + Math.cos(rotation) * heightMove);
                    result.width = widthMove;
                }else if(ro > Math.PI/4 && ro <= Math.PI*3/4){
                    
                }else if(ro > Math.PI*3/4 && ro <= Math.PI*5/4){
    
                }else if(ro > Math.PI*5/4 && ro <= Math.PI*7/4){
    
                }
            }else if(btnState.centerTop){
                console.log("centerTop: ", ro)
                if(ro > Math.PI*7/4 || ro <= Math.PI/4){
                    result.height = (-Math.sin(rotation) * widthMove + Math.cos(rotation) * heightMove);
                    result.width = widthMove;
                }else if(ro > Math.PI/4 && ro <= Math.PI*3/4){
                    
                }else if(ro > Math.PI*3/4 && ro <= Math.PI*5/4){
    
                }else if(ro > Math.PI*5/4 && ro <= Math.PI*7/4){
    
                }
            }else if(btnState.rightTop){

            }else if(btnState.rightCenter){

            }else if(btnState.rightBottom){

            }else if(btnState.centerBottom){

            }else if(btnState.leftBottom){

            }else if(btnState.leftCenter){

            }

            

            // if(0 < ro && ro <= Math.PI/2){
            //     if(0<ro && ro<= Math.PI/4){
            //         console.log("0 ~ PI/4");
            //     }else{
            //         console.log("PI/4 ~ PI/2");
            //     }
            //     rotation = rotation;
            // }else if(Math.PI/2 < ro && ro <= Math.PI){
            //     if(Math.PI/2<ro && ro<= Math.PI*3/4){
            //         console.log("PI/2 ~ 3*PI/4");
            //     }else{
            //         console.log("3*PI/4 ~ PI");
            //     }
            //     rotation = -rotation;
            // }else if(Math.PI < ro && ro <= Math.PI*3/2){
            //     if(Math.PI<ro && ro<= Math.PI*5/4){
            //         console.log("PI ~ 5*PI/4");
            //     }else{
            //         console.log("5*PI/4 ~ 3*PI/2");
            //     }
            //     rotation = -rotation;
            // }else if(Math.PI * 3/2 < ro && ro <= Math.PI*2){
            //     if(Math.PI * 3/2 < ro && ro<= Math.PI*7/4){
            //         console.log("3*PI/2 ~ 7*PI/4");
            //     }else{
            //         console.log("7*PI/4 ~ 2*PI");
            //     }
            //     rotation = rotation;
            // }

            // result = {
            //     width: (Math.cos(rotation) * widthMove 
            //             + 
            //             Math.sin(rotation) * heightMove )
            //             ,
            //     height: (-Math.sin(rotation) * widthMove 
            //             + 
            //             Math.cos(rotation) * heightMove ) 
            // }
        }
        if(bunnyRotation !==0){
            console.log(
                result
            );
        }
        return result;
    },
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
            angle = Math.atan((efficacyAnchorPosition.x - x)/(efficacyAnchorPosition.y - y)) - (Math.PI/2 - rotation);
        }

        let moveWidth = abLength * Math.cos(angle);
        let moveHeight = abLength * Math.sin(angle);

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
        }else if(efficacyAnchorPosition.x < x && efficacyAnchorPosition.y === y){
            console.log("-----------e----------");
            res.x = (width/2 + moveWidth) / width;
            // res.y = (height/2 - moveHeight) / height;
        }else if(efficacyAnchorPosition.x > x && efficacyAnchorPosition.y === y){
            console.log("-----------f----------");
            res.x = (width/2 + moveWidth) / width;
            // res.y = (height/2 + moveHeight) / height;
        }else if(efficacyAnchorPosition.x === x && efficacyAnchorPosition.y < y){
            console.log("-----------g----------");
            // res.x = (width/2 + moveWidth) / width;
            res.y = (height/2 + moveHeight) / height;
        }else if(efficacyAnchorPosition.x === x && efficacyAnchorPosition.y > y){
            console.log("-----------h----------");
            res.y = (height/2 - moveHeight) / height;
            // res.x = (width/2 - moveWidth) / width;
        }else{
            console.log("----------------------");
        }

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
        console.log("position: ", position);
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
        // console.log("setNewAnchor: ", newAnchor, oldAnchor);
        bunny.anchor.set(newAnchor.x, newAnchor.y);
        bunny.position.x = bunny.position.x + (newAnchor.x - oldAnchor.x) * bunny.width * Math.cos(bunny.rotation) - (newAnchor.y - oldAnchor.y) * bunny.height * Math.sin(bunny.rotation);
        bunny.position.y = bunny.position.y + (newAnchor.x - oldAnchor.x) * bunny.width * Math.sin(bunny.rotation) + (newAnchor.y - oldAnchor.y) * bunny.height * Math.cos(bunny.rotation);
    }

}