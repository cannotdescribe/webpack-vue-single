export default {
    /**
     * 计算新的anchor
     * @param width                  float                  bunny宽
     * @param height                 float                  bunny高
     * @param x                      float                  bunny 位置x轴
     * @param y                      float                  bunny 位置y轴
     * @param anchor                 {x: float, y: float}   bunny anchor
     * @param efficacyAnchorPosition {x: float, y: float}   efficacy应该的anchor位置
     */
    computedAnchor(width, height, x, y, anchor, efficacyAnchorPosition){
        return {x :(efficacyAnchorPosition.x - (x - width * anchor.x)) / width, y: (efficacyAnchorPosition.y - (y - height * anchor.y)) / height};
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
            position
        );
    },

    bunnySetNewAnchorPosition(bunny, position){
        this.bunnySetNewAnchor(bunny, this.efficacyGetAnchor(bunny, position));
    },

    bunnySetNewAnchor(bunny, newAnchor){
        let oldAnchor ={x: bunny.anchor.x, y: bunny.anchor.y};
        bunny.anchor.set(newAnchor.x, newAnchor.y);
        //TODO 角度 带进去算出结果

        bunny.position.x = bunny.position.x + (newAnchor.x - oldAnchor.x) * bunny.width;
        bunny.position.y = bunny.position.y + (newAnchor.y - oldAnchor.y) * bunny.height;
    }
}