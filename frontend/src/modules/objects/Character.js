import AnimatedObject from "../base_classes/AnimatedObject"
import SelectionArrow from "./SelectionArrow"

export default class Character extends AnimatedObject{
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.frameWidth = 187
        this.frameHeight = 157
        this.numberOfFrames = 0
        this.currentFrame = 0
        
        //for mouseover
        this.mouseOver = false
        this.shadowBlur = 10
        // this.selectionArrow = new SelectionArrow((this.x_pos + this.frameWidth / 2) - 25, this.y_pos)


        // this.init()
    }

//     handleMouseOver = (mouseX, mouseY) => {
//         let mouseIsCollidingX = mouseX > this.x_pos && mouseX <= this.x_pos + this.frameWidth
//         let mouseIsCollidingY = mouseY > this.y_pos && mouseY <= this.y_pos + this.frameHeight
        
//         if(mouseIsCollidingX && mouseIsCollidingY){
//             this.mouseOver = true
//             document.documentElement.style.cursor = 'pointer'
//         }   
//         else {
//             this.mouseOver = false
//             document.documentElement.style.cursor = 'default'
//         } 
//     }

//     animate(cycleCount){
//         //highlight on mouse over
//         if (this.mouseOver == true){
//             this.selectionArrow.animate(cycleCount)
//             this.shadowBlur > 70 ? this.shadowBlur = 10 : this.shadowBlur++
//             this.ctx.shadowBlur = this.shadowBlur / 2; 
//             this.ctx.shadowColor = "white"; 
//             this.ctx.shadowOffsetX = 0; 
//             this.ctx.shadowOffsetY = 0; 
//             this.ctx.fillRect(this.x_pos, this.y_pos, this.frameWidth, this.frameHeight);
//             this.ctx.shadowBlur = 0;  
//         }
//         //draw image at current frame
//         this.ctx.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x_pos, this.y_pos, this.frameWidth, this.frameHeight)
//         if (this.currentFrame >= this.numberOfFrames - 1){
//             this.currentFrame = 0
//         } else{
//             if(cycleCount % 6 == 0){
//                 this.currentFrame++
//             }
//         }
//     }

//     run = (cycleCount, mouseX, mouseY) => {
//         this.animate(cycleCount)
//         this.handleMouseOver(mouseX, mouseY)
//     }
}