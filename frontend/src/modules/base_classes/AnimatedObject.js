// const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d')
import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import { desk_spritesheet_json2 } from '../../json/desk_spritesheet'
import SelectionArrow from '../Objects/SelectionArrow'

export default class AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer){
        
        this.app = app
        this.numberOfFrames = 0
        this.sprite_sheet = sprite_sheet
        this.sprite = new PIXI.AnimatedSprite(this.sprite_sheet.animations.main)
        this.sprite.animationSpeed = 0.1666;
        this.sprite.anchor.set(0.5)
        this.sprite.x = x_pos
        this.sprite.y = y_pos

        this.desktopIsDisplaying = false

        // Set up mouse hover event for deskSprite
        this.sprite.interactive = true;
        this.sprite.eventMode = 'static';
        this.sprite.on('pointerover', this.handleMouseIn)
        this.sprite.on('pointerout', this.handleMouseOut)
        this.roomEntitiesContainer = roomEntitiesContainer
        this.roomEntitiesContainer.addChild(this.sprite)
        this.desktopContainer = desktopContainer
        // this.app.stage.addChild(this.sprite)
        this.sprite.play()
        this.selection_arrow_sprite_sheet = arrowSpriteSheet
        this.selectionArrow = new SelectionArrow(this.selection_arrow_sprite_sheet, x_pos, y_pos, app, this.sprite.height) 
        this.app.ticker.add(this.getIsDesktopDisplaying)
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
}