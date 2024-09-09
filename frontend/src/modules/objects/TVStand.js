// const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d')
import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import { desk_spritesheet_json2 } from '../../json/desk_spritesheet'
import SelectionArrow from './SelectionArrow'
import SpotifyScene from './tv_scenes/SpotifyScene'
import Screensaver from './tv_scenes/Screensaver'

export default class TV_Stand {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, TVStandImage, pngAssets, weatherJson, weatherIcons, lastPlayedJson){
        
        this.app = app
        this.numberOfFrames = 0
        this.sprite_sheet = sprite_sheet
        this.sprite = new PIXI.AnimatedSprite(this.sprite_sheet.animations.main)
        this.sprite.animationSpeed = 0.1666;
        this.sprite.anchor.set(0.5)
        this.sprite.x = x_pos
        this.sprite.y = y_pos
        this.sprite.animationSpeed = .2
        this.TVStandImage = TVStandImage
        this.pngAssets = pngAssets
        this.weatherIcons = weatherIcons

        this.desktopIsDisplaying = false
        this.weatherJson = weatherJson
        this.lastPlayedJson = lastPlayedJson

        // Set up mouse hover event for deskSprite
        this.sprite.interactive = true;
        this.sprite.eventMode = 'static';
        this.sprite.on('pointerover', this.handleMouseIn)
        this.sprite.on('pointerout', this.handleMouseOut)
        this.sprite.on('click', this.handleClick)
        this.sprite.loop = false
        this.sprite.onComplete = () => this.sprite.gotoAndStop(0);

        this.tvContainer = new PIXI.Container()
        

        
        this.selection_arrow_sprite_sheet = arrowSpriteSheet
        this.selectionArrow = new SelectionArrow(this.selection_arrow_sprite_sheet, x_pos, y_pos, app, this.sprite.height) 

        this.roomEntitiesContainer = roomEntitiesContainer
        this.desktopContainer = desktopContainer

        this.sceneIndex = 0
        this.sceneList = [
            {
                sprite: new SpotifyScene(this.sprite, this.x_pos, this.y_pos, 'red', this.pngAssets, this.tvContainer, this.lastPlayedJson)
            },
            {
                sprite: new Screensaver(this.pngAssets, this.weatherJson, this.weatherIcons)
            }
        ]

        this.tvContainer.label = 'tv_container'
        this.tvContainer.addChild(this.sprite, this.sceneList[this.sceneIndex].sprite.container)
        this.roomEntitiesContainer.addChild(this.tvContainer)
        
        this.app.ticker.add(this.getIsDesktopDisplaying)
        this.app.ticker.add(this.sceneList[this.sceneIndex].sprite.animate)
    }

    animateScene = () => {
        this.sceneList[this.sceneIndex].animate()
    }

    getIsDesktopDisplaying = () => {
        this.desktopIsDisplaying = this.app.stage.children.some(cont => cont.label == 'desktop_container')
    }


    handleMouseIn = () => {
        if(this.desktopIsDisplaying == false){

        //add outline effect
        this.sprite.filters = [new GlowFilter({alpha: 0.2, color: '#bbb4f3'})];
        //display hovering arrow
        this.app.stage.addChild(this.selectionArrow.sprite)
        }
    }

    handleMouseOut = () => {
        if(this.desktopIsDisplaying == false){

        // // Remove outline effect from this
        this.sprite.filters = null;
       //display hovering arrow
        this.app.stage.removeChild(this.selectionArrow.sprite)
        }
    }

    handleClick = async () => {
        this.app.ticker.remove(this.sceneList[this.sceneIndex].sprite.animate)
        this.tvContainer.removeChild(this.sceneList[this.sceneIndex].sprite.container)
        this.sceneIndex < this.sceneList.length - 1 ? this.sceneIndex += 1 : this.sceneIndex = 0
        this.sprite.play() // play the blue screen transition animation
        this.sprite.onComplete = () => {
            
            this.sceneList[this.sceneIndex].sprite.load()
            this.tvContainer.addChild(this.sceneList[this.sceneIndex].sprite.container)
            this.app.ticker.add(this.sceneList[this.sceneIndex].sprite.animate)
        }

        

    }
}