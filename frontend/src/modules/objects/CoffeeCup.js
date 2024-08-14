import AnimatedObject from "../base_classes/AnimatedObject"

export default class Coffee_Cup extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.frameWidth = 44,
        this.frameHeight = 61,
        this.numberOfFrames = 0,
        this.currentFrame = 0
        this.x_pos = x_pos
        this.y_pos = y_pos

    }

    animate(cycleCount){
        this.ctx.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x_pos, this.y_pos, this.frameWidth, this.frameHeight)
        if (this.currentFrame >= this.numberOfFrames - 1){
            this.currentFrame = 0
        } else{
            if(cycleCount % 10 == 0){
                this.currentFrame++
            }
        }
    }
}