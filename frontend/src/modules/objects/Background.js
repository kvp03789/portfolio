import StaticObject from "../base_classes/StaticObject"

export default class Background extends StaticObject {
    constructor(texture, x_pos, y_pos, app, roomEntitiesContainer){
        super(texture, x_pos, y_pos, app, roomEntitiesContainer)
    }  

}