// const canvas = document.querySelector("canvas")
// const ctx = canvas.getContext('2d')
import * as PIXI from 'pixi.js'

export default class StaticObject{
    constructor(texture, x_pos, y_pos, app, roomEntitiesContainer){
        this.app = app
        this.texture = texture
        
        //sprite init
        this.sprite = PIXI.Sprite.from(this.texture)
        this.sprite.anchor.set(0.0, 0.0)
        this.sprite.x = x_pos
        this.sprite.y = y_pos
        // this.image.onload(() => this.image.src = src)
        // this.x = x_pos
        // this.y = y_pos
        this.roomEntitiesContainer = roomEntitiesContainer
        this.roomEntitiesContainer.addChild(this.sprite)
        // this.app.stage.addChild(this.sprite)

        this.init()
        
        console.log('static asset initialized: ', this.sprite)
        
    }

    init(){
        // this.image.src = this.src
    }

    display(){
        // ctx.drawImage(this.image, this.x_pos, this.y_pos)
        // this.x
        
    }
}