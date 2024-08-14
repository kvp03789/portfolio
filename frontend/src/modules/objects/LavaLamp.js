import AnimatedObject from "../base_classes/AnimatedObject"
import SelectionArrow from "./SelectionArrow"
import { Sprite } from "pixi.js"


export default class LavaLamp extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, pngAssets){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.frameWidth = 125,
        this.frameHeight = 128,
        this.numberOfFrames = 0,
        this.currentFrame = 0
        this.x_pos = x_pos
        this.y_pos = y_pos
        this.pngAssets = pngAssets

        this.offSprite = new Sprite(this.pngAssets.LavaLampOff)
        this.offSprite.position.set(508, 240)
        this.offSprite.scale.set(1.4, 1.3)
        this.offSprite.label = 'lava_lamp_off'
        this.offSprite.interactive = true;
        this.offSprite.on('click', this.handleClick)
        this.sprite.eventMode = 'static'

        this.sprite.scale.set(1.4, 1.3)
        this.sprite.label = 'lava_lamp_on'
        this.sprite.on('click', this.handleClick);
        this.sprite.eventMode = 'static';
        this.on = true
        
    }

    handleClick = () => {
        console.log('clicked')
        this.on = !this.on
        if(this.on){
            this.roomEntitiesContainer.removeChild(this.offSprite)
            this.roomEntitiesContainer.addChildAt(this.sprite, 6)
            this.app.stage.addChild(this.selectionArrow.sprite)
            console.log("lamp clicked!!! turned on")
        } 
        else {
            this.roomEntitiesContainer.removeChild(this.sprite)
            this.roomEntitiesContainer.addChildAt(this.offSprite, 6)
            this.app.stage.removeChild(this.selectionArrow.sprite)
            console.log("lamp clicked!!! turned off")
        }
    }
}