import AnimatedObject from "../base_classes/AnimatedObject"

const overlayDiv = document.querySelector(".glass-overlay")

export default class OnlineOfflineSign extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.frameWidth = 163
        this.frameHeight = 125
        this.numberOfFrames = 0
        this.currentFrame = 0
        this.clicked = false
        
        //for mouseover
        this.mouseOver = false
        this.shadowBlur = 10
        // this.selectionArrow = new SelectionArrow((this.x_pos + this.frameWidth / 2) - 25, this.y_pos)

    }

    animate(cycleCount){
        
    }

    handleMouseOver(mouseX, mouseY){
        
    }

    handleClick(){
        
    }

    run = (cycleCount, mouseX, mouseY) => {
        
    }
}