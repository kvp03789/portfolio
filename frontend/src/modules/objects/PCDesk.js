import AnimatedObject from "../base_classes/AnimatedObject"
import { BlurFilter, Ticker } from "pixi.js"
import * as TWEEN from "@tweenjs/tween.js"

const overlayDiv = document.querySelector(".glass-overlay")

export default class PC_Desk extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, setDisplayDesktop, desktopContainer){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.frameWidth = 163
        this.frameHeight = 125
        this.numberOfFrames = 0
        this.currentFrame = 0
        this.clicked = false
        
        //for mouseover
        this.mouseOver = false
        this.shadowBlur = 10

        this.sprite.on('pointerdown', this.handleClick);
        this.sprite.eventMode = 'static';
        this.setDisplayDesktop = setDisplayDesktop
        this.desktopContainer = desktopContainer
        
    }

    

    handleClick = () => {
        console.log("desk clicked!!!", this.app)
        
        const blurFilter = new BlurFilter()
        blurFilter.blur = 0
        this.roomEntitiesContainer.filters = [blurFilter]
        const blurTween = new TWEEN.Tween(blurFilter)
        blurTween.to({blur: 10}, 400)
        blurTween.easing(TWEEN.Easing.Quadratic.InOut)
        blurTween.start()
        blurTween.onComplete(() => {
            this.setDisplayDesktop()
            const desktopAlphaTween = new TWEEN.Tween(this.desktopContainer.children[0])
            desktopAlphaTween.to({alpha: 0}, 800)
            desktopAlphaTween.easing(TWEEN.Easing.Quadratic.InOut)
            desktopAlphaTween.start()

            const desktopTween = new TWEEN.Tween(this.desktopContainer)
            desktopTween.to({width: 722}, 200)
            desktopTween.easing(TWEEN.Easing.Quadratic.InOut)
            desktopTween.start()
            
            const iconsArray = this.desktopContainer.children[1].children
            iconsArray.forEach((sprite, index) => {
                const alphaTween = new TWEEN.Tween(sprite)
                alphaTween.to({alpha: 1}, 800)
                alphaTween.easing(TWEEN.Easing.Quadratic.InOut)
                alphaTween.start()

                if(sprite.label == 'power_icon'){
                    const iconsContainerTween = new TWEEN.Tween(sprite) 
                    iconsContainerTween.to({y: 200}, 700)
                    iconsContainerTween.delay(200)
                    iconsContainerTween.easing(TWEEN.Easing.Quadratic.In)
                    iconsContainerTween.start()

                    const iconsContainerTweenBack = new TWEEN.Tween(sprite) 
                    iconsContainerTweenBack.to({y: 130}, 400)
                    iconsContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    

                    iconsContainerTween.chain(iconsContainerTweenBack)
                }
                else{
                    let endPos = (index * 2) * 20
                    const iconsContainerTween = new TWEEN.Tween(sprite) 
                    iconsContainerTween.to({y: endPos + (50 * Math.random()) }, 800 * Math.random())
                    iconsContainerTween.delay((index * 20) + 100)
                    iconsContainerTween.easing(TWEEN.Easing.Quadratic.In)
                    iconsContainerTween.start()

                    const iconsContainerTweenBack = new TWEEN.Tween(sprite) 
                    iconsContainerTweenBack.to({y: endPos}, 300)
                    iconsContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    
                    iconsContainerTween.chain(iconsContainerTweenBack)
                }
            })

            const iconsContainerTween = new TWEEN.Tween(this.desktopContainer.children[1]) //tween the icons container
            iconsContainerTween.to({y: 350}, 1000)
            iconsContainerTween.easing(TWEEN.Easing.Quadratic.InOut)
            iconsContainerTween.start()
        })
        // this.setDisplayDesktop()
    }

    run = (cycleCount, mouseX, mouseY) => {
       
    }
}