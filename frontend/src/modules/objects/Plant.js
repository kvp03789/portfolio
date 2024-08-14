import StaticObject from "../base_classes/StaticObject"

export default class Plant extends StaticObject{
    constructor(src, x_pos, y_pos, app, roomEntitiesContainer){
        super(src, x_pos, y_pos, app, roomEntitiesContainer)
    }   
}