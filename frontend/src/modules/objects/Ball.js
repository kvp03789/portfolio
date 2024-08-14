import { Sprite } from "pixi.js";

export default class Ball {
    constructor(image, x, y, app, roomEntitiesContainer){
        this.sprite = new Sprite(image)
        this.sprite.scale.set(.5, .5)
        this.sprite.x = x
        this.sprite.y = y
        this.sprite.interactive = true
        this.sprite.on('click', this.handleClick)
        this.app = app
        this.roomEntitiesContainer = roomEntitiesContainer

        this.xv = .55
        this.yv = 0
        this.friction = .1

        // this.sprite.pivot.set(this.width/2, this.height/2);

        this.roomEntitiesContainer.addChild(this.sprite)
        this.app.ticker.add(this.animate)
    }

    animate = () => {
        this.sprite.y += this.yv
        this.yv += 0.2
        if (this.sprite.y >= 350){
            this.yv *= -.5
            this.sprite.y += this.yv
        }
        this.sprite.x += this.xv
        // this.xv += 0.2
        if (this.sprite.x <= 10){
            this.xv *= -.5
            this.sprite.x += this.xv
        }

        if (this.sprite.x >= 10){
            this.xv *= .5
            this.sprite.x += this.xv
        }

        this.xv -= this.friction
    }

    handleClick = () => {
        this.xv = (Math.random() * 2 - 1) * 25
        this.yv = Math.random() * 25 -10
    }
}