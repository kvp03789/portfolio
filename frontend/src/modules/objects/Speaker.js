import AnimatedObject from "../base_classes/AnimatedObject"
import SelectionArrow from "./SelectionArrow"
import { Sprite } from "pixi.js"
import { BlurFilter, Ticker } from "pixi.js"
import * as TWEEN from "@tweenjs/tween.js"


export default class Speaker extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, speakerContainer, pngAssets, displaySpeakerMenu, hideSpeakerMenu, soundsObject){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, speakerContainer)
        this.frameWidth = 69,
        this.frameHeight = 70,
        this.numberOfFrames = 0,
        this.currentFrame = 0
        this.x_pos = x_pos
        this.y_pos = y_pos
        this.pngAssets = pngAssets

        this.speakerContainer = speakerContainer

        this.sprite.eventMode = 'static'

        this.sprite.scale.set(1.4, 1.3)
        this.sprite.label = 'speaker'
        this.sprite.on('click', this.handleClick);
        this.sprite.eventMode = 'static';
        this.on = true

        this.displaySpeakerMenu = displaySpeakerMenu
        this.hideSpeakerMenu = hideSpeakerMenu

        this.soundsObject = soundsObject
        
    }

    init = () => {
        for (const audio in this.soundsObject){
            console.log(this.soundsObject[audio])
        }
    }

    handleClick = () => {

        console.log("speaker clicked!!!", this.app)
        
        const blurFilter = new BlurFilter()
        blurFilter.blur = 0
        this.roomEntitiesContainer.filters = [blurFilter]
        const blurTween = new TWEEN.Tween(blurFilter)
        blurTween.to({blur: 10}, 400)
        blurTween.easing(TWEEN.Easing.Quadratic.InOut)
        blurTween.start()
        blurTween.onComplete(() => {
            this.displaySpeakerMenu()
            const speakerMenuAlphaTween = new TWEEN.Tween(this.speakerContainer.children[0])
            speakerMenuAlphaTween.to({alpha: 1}, 800)
            speakerMenuAlphaTween.easing(TWEEN.Easing.Quadratic.InOut)
            speakerMenuAlphaTween.start()

            const speakerMenuTween = new TWEEN.Tween(this.speakerContainer)
            speakerMenuTween.to({width: 400}, 200)
            speakerMenuTween.easing(TWEEN.Easing.Quadratic.InOut)
            speakerMenuTween.start()

            const speakerSlidersArray = this.speakerContainer.children[2].children
            speakerSlidersArray.forEach((sprite, index) => {
                const alphaTween = new TWEEN.Tween(sprite)
                alphaTween.to({alpha: 1}, 800)
                alphaTween.easing(TWEEN.Easing.Quadratic.InOut)
                alphaTween.start()

                if(sprite.label == 'tracking_slider'){
                    const trackingSliderContainerTween = new TWEEN.Tween(sprite) 
                    trackingSliderContainerTween.to({y: 350}, 700)
                    trackingSliderContainerTween.delay(200)
                    trackingSliderContainerTween.easing(TWEEN.Easing.Quadratic.In)
                    trackingSliderContainerTween.start()

                    const trackingSliderContainerTweenBack = new TWEEN.Tween(sprite) 
                    trackingSliderContainerTweenBack.to({y: 337}, 400)
                    trackingSliderContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    

                    trackingSliderContainerTween.chain(trackingSliderContainerTweenBack)
                }
                else if(sprite.label == 'volume_slider'){
                    const volumeSliderContainerTween = new TWEEN.Tween(sprite) 
                    volumeSliderContainerTween.to({y: 270}, 800)
                    volumeSliderContainerTween.delay(200)
                    volumeSliderContainerTween.easing(TWEEN.Easing.Quadratic.In)
                    volumeSliderContainerTween.start()

                    const volumeSliderContainerTweenBack = new TWEEN.Tween(sprite) 
                    volumeSliderContainerTweenBack.to({y: 254}, 400)
                    volumeSliderContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    

                    volumeSliderContainerTween.chain(volumeSliderContainerTweenBack)
                }
            })
            
            const speakerButtonsArray = this.speakerContainer.children[1].children
            speakerButtonsArray.forEach((sprite, index) => {
                const alphaTween = new TWEEN.Tween(sprite)
                alphaTween.to({alpha: 1}, 800)
                alphaTween.easing(TWEEN.Easing.Quadratic.InOut)
                alphaTween.start()

                if(sprite.label == 'power_icon'){
                    const speakerButtonsContainerTween = new TWEEN.Tween(sprite) 
                    speakerButtonsContainerTween.to({y: 200}, 700)
                    speakerButtonsContainerTween.delay(200)
                    speakerButtonsContainerTween.easing(TWEEN.Easing.Quadratic.In)
                    speakerButtonsContainerTween.start()

                    const speakerButtonsContainerTweenBack = new TWEEN.Tween(sprite) 
                    speakerButtonsContainerTweenBack.to({y: 130}, 400)
                    speakerButtonsContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    

                    speakerButtonsContainerTween.chain(speakerButtonsContainerTweenBack)
                }
                else{
                    let endPos = 23
                    const speakerButtonsContainerTween = new TWEEN.Tween(sprite) 
                    speakerButtonsContainerTween.to({y: endPos + (50 * Math.random()) }, 800 * Math.random())
                    speakerButtonsContainerTween.delay((index * 20) + 100)
                    speakerButtonsContainerTween.easing(TWEEN.Easing.Quadratic.In)
                    speakerButtonsContainerTween.start()

                    const speakerButtonsContainerTweenBack = new TWEEN.Tween(sprite) 
                    speakerButtonsContainerTweenBack.to({y: endPos}, 300)
                    speakerButtonsContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                    
                    speakerButtonsContainerTween.chain(speakerButtonsContainerTweenBack)
                }
            })

            const speakerContainerTween = new TWEEN.Tween(this.speakerContainer.children[1]) //tween the speaker container
            speakerContainerTween.to({y: 350}, 1000)
            speakerContainerTween.easing(TWEEN.Easing.Quadratic.InOut)
            speakerContainerTween.start()
        })
        // this.setDisplayDesktop()
    }

    handleTrackClick = (track) => {
        console.log(`you clicked ${track.trackTitle}`)
    }
}