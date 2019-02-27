import Bunny from "./Bunny.js"

export default class BunnyGroup {
    constructor(array, options){
        this.__array = array;
        //borderColor
        //border
        this.__options = options;
    }
    appendBunny(bunny){
        if(bunny instanceof Bunny){
            this.__array.append(bunny);
        }
    }
    forEach(callback){
        this.__array.forEach(callback);
    }

}