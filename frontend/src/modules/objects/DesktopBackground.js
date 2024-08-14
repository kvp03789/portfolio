import * as PIXI from 'pixi.js'
import { AlphaFilter, DropShadowFilter } from 'pixi-filters'

export default class DesktopBackground{
    constructor(sprite_sheet, x_pos, y_pos, app, height){
        console.log(sprite_sheet, '222222222')
        this.app = app
        this.numberOfFrames = 0
        this.sprite_sheet = sprite_sheet
        // this.sprite_sheet.onload = () => console.log(this.sprite_sheet)
        this.sprite = new PIXI.AnimatedSprite(this.sprite_sheet.animations.main)
        this.sprite.animationSpeed = 0.3;
        this.sprite.anchor.set(0.5)
        this.sprite.x = x_pos
        this.sprite.y = y_pos - (height / 2 + 10)
        this.sprite.filters = [new PIXI.AlphaFilter({alpha: .8}), new DropShadowFilter()];
        // this.app.stage.addChild(this.sprite)
        this.sprite.play()

        this.display = false
    }

    animate(cycleCount){
        
    }
}