import Icon from "../base_classes/Icon"
import { DropShadowFilter, GlowFilter } from "pixi-filters";
import * as TWEEN from "@tweenjs/tween.js"

export default class PowerIcon extends Icon{
    constructor(texture, x_pos, y_pos, app, desktopContainer, iconsContainer, roomEntities, setHideDesktop, windowsContainer, icons_assets){
        super(texture, x_pos, y_pos, app, desktopContainer, iconsContainer, windowsContainer, icons_assets)
        this.sprite.on('pointerdown', this.handleClick);
        this.sprite.on('mouseover', this.handleMouseOver)
        this.sprite.on('mouseout', this.handleMouseOut)
        this.roomEntities = roomEntities
        this.setHideDesktop = setHideDesktop
        this.sprite.label = 'power_icon'
    }  

    handleClick = () => {
        console.log("power icon clicked", this.iconsContainer)
        // this.iconsContainer.children.forEach((sprite) => {
        //     sprite.filters = []
        // })
        // const tween = new TWEEN.Tween(this.desktopContainer)
        // tween.to({width: 0}, 300)
        // tween.easing(TWEEN.Easing.Quadratic.InOut)
        // tween.start()

        const blurFilter = this.roomEntities.filters[0]
        const blurTween = new TWEEN.Tween(blurFilter)
        blurTween.to({blur: 0}, 600)
        blurTween.easing(TWEEN.Easing.Quadratic.InOut)
        blurTween.start()
        blurTween.onComplete(() => {
            this.setHideDesktop()
            this.roomEntities.filters = []
        })

        
        const iconsArray = this.desktopContainer.children[1].children
            iconsArray.forEach((sprite, index) => {
                const alphaTween = new TWEEN.Tween(sprite)
                alphaTween.to({alpha: 0}, 800)
                alphaTween.easing(TWEEN.Easing.Quadratic.InOut)
                alphaTween.start()

                if(sprite.label == 'power_icon'){
                    const iconsContainerTween = new TWEEN.Tween(sprite) 
                    iconsContainerTween.to({y: 0}, 400)
                    iconsContainerTween.delay(100)
                    iconsContainerTween.easing(TWEEN.Easing.Quadratic.In)
                    iconsContainerTween.start()

                    const iconsContainerTweenBack = new TWEEN.Tween(sprite) 
                    iconsContainerTweenBack.to({y: 0}, 400)
                    iconsContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    

                    iconsContainerTween.chain(iconsContainerTweenBack)
                }
                else{
                    let endPos = -200
                    const iconsContainerTween = new TWEEN.Tween(sprite) 
                    iconsContainerTween.to({y: endPos }, 100 + (500 + 20 * Math.random()))
                    iconsContainerTween.delay((index * 20) + 100)
                    iconsContainerTween.easing(TWEEN.Easing.Quadratic.In)
                    iconsContainerTween.start()

                    // const iconsContainerTweenBack = new TWEEN.Tween(sprite) 
                    // iconsContainerTweenBack.to({y: endPos}, 300)
                    // iconsContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    
                    // iconsContainerTween.chain(iconsContainerTweenBack)
                    iconsContainerTween.start()
                }
            })

            const iconsContainerTween = new TWEEN.Tween(this.desktopContainer.children[1]) //tween the icons container
            iconsContainerTween.to({y: 350}, 1000)
            iconsContainerTween.easing(TWEEN.Easing.Quadratic.InOut)
            iconsContainerTween.start()
        
    }

    handleMouseOver = () => {
        this.sprite.filters = [new GlowFilter()]
    }

    handleMouseOut = () => {
        this.sprite.filters = []
    }
}