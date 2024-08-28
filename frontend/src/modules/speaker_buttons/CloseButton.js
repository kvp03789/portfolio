import SpeakerButton from "../base_classes/SpeakerButton"
import * as TWEEN from "@tweenjs/tween.js"
import { DropShadowFilter } from "pixi-filters";

export default class CloseButton extends SpeakerButton{
    constructor(texture, x_pos, y_pos, app, speakerContainer, speakerButtonsContainer, roomEntities, setHideSpeakerMenu){
        super(texture, x_pos, y_pos, app, speakerContainer, speakerButtonsContainer)
        this.sprite.on('pointerdown', this.handleClick);
        this.roomEntities = roomEntities
        this.setHideSpeakerMenu = setHideSpeakerMenu
        this.speakerButtonsContainer.addChild(this.sprite)
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
            this.setHideSpeakerMenu()
            this.roomEntities.filters = []
        })

        const slidersArray = this.speakerContainer.children[2].children
            slidersArray.forEach((sprite, index) => {
                const alphaTween = new TWEEN.Tween(sprite)
                alphaTween.to({alpha: 0}, 800)
                alphaTween.easing(TWEEN.Easing.Quadratic.InOut)
                alphaTween.start()
                if(sprite.label == 'tracking_slider'){
                    const trackingSliderTween = new TWEEN.Tween(sprite) 
                    trackingSliderTween.to({y: 0}, 400)
                    trackingSliderTween.delay(100)
                    trackingSliderTween.easing(TWEEN.Easing.Quadratic.In)
                    trackingSliderTween.start()

                    const trackingSliderTweenBack = new TWEEN.Tween(sprite) 
                    trackingSliderTweenBack.to({y: 0}, 400)
                    trackingSliderTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    

                    trackingSliderTween.chain(trackingSliderTweenBack)
                }
                else if(sprite.label == 'volume_slider'){
                    const volumeSliderTween = new TWEEN.Tween(sprite) 
                    volumeSliderTween.to({y: 0}, 400)
                    volumeSliderTween.delay(100)
                    volumeSliderTween.easing(TWEEN.Easing.Quadratic.In)
                    volumeSliderTween.start()

                    const volumeSliderTweenBack = new TWEEN.Tween(sprite) 
                    volumeSliderTweenBack.to({y: 0}, 400)
                    volumeSliderTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    

                    volumeSliderTween.chain(volumeSliderTweenBack)
                }
            })

        
        const iconsArray = this.speakerContainer.children[1].children
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
                    iconsContainerTween.delay((index * 20))
                    iconsContainerTween.easing(TWEEN.Easing.Quadratic.In)
                    iconsContainerTween.start()

                    // const iconsContainerTweenBack = new TWEEN.Tween(sprite) 
                    // iconsContainerTweenBack.to({y: endPos}, 300)
                    // iconsContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    
                    // iconsContainerTween.chain(iconsContainerTweenBack)
                    iconsContainerTween.start()
                }
            })

            const iconsContainerTween = new TWEEN.Tween(this.speakerButtonsContainer.children[1]) //tween the icons container
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