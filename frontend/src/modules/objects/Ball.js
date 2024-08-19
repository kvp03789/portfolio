import { Sprite } from "pixi.js";

export default class Ball {
    constructor(image, x, y, app, roomEntitiesContainer){
        this.sprite = new Sprite(image)
        this.sprite.scale.set(.5, .5)
        this.sprite.x = x
        this.sprite.y = y
        // center the sprite's anchor point
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.interactive = true
        
        this.app = app
        this.roomEntitiesContainer = roomEntitiesContainer

        //velocity x and y - vector for getting ball direction
        this.xv = 0
        this.yv = 0

        this.friction = .999
        this.gravity = .05
        this.speed = 3
        
        //as user holds down mouse button mousePower builds and increases ballspeed on mouseup
        this.mousePower = 0
        this.mouseIsHolding = false

        this.sprite.on('mousedown', this.handlePowerUp)
        this.sprite.on('mouseup', this.handlePowerRelease)

        this.roomEntitiesContainer.addChild(this.sprite)
        this.app.ticker.add(this.animate)
    }

    animate = () => {
        
        if(this.mouseIsHolding){
            this.mousePower += .05
        }

        //gravity affects the y velocity
        this.yv += this.gravity
        
        //move the ball in the direction based on xv/yv vectors by this.speed
        this.sprite.x += this.xv * this.speed
        this.sprite.y += this.yv * this.speed
        
        //make ball boucne off sides of screen
        if (this.sprite.x <= 10 + this.sprite.width){
            this.xv *= -.5
        }
        else if (this.sprite.x >= this.app.screen.width - this.sprite.width){
            this.xv *= -.5
        }

        //make ball bounce off top and bottom of screen
        if (this.sprite.y <= 10){
            this.yv *= -.5
        }
        else if(this.sprite.y >= this.app.screen.height - this.sprite.width){
            this.yv *= -.5
            this.sprite.y = this.app.screen.height - this.sprite.height;
        }

        //slow the ball down because of friction 
        this.xv *= this.friction
        this.yv *= this.friction

        //rotate the ball
        
        if (this.xv !== 0 || this.yv !== 0){
            this.sprite.rotation += (this.xv * .5 / 2)
        }

        // if the velocity is too low, stop the ball
        if (Math.abs(this.xv) < 0.01) this.xv = 0;
        if (Math.abs(this.yv) < 0.01) this.yv = 0;
        
    }

    handleClick = (event) => {

        let mousePosition = event.data.global;
        console.log('MOUSE POSITION: ', mousePosition)

        //check which side of ball was clicked along x axis
        if(mousePosition.x < this.sprite.x){
            console.log('ball clicked on left side. xv: ', this.xv)
            this.xv = 1
        }
        else if(mousePosition.x > this.sprite.x){
            console.log('ball clicked on right side. xv: ', this.xv)
            this.xv = -1
        }

        //check which side of ball was clicked along y axis
        if(mousePosition.y < this.sprite.y){
            this.yv = 1
        }
        else if(mousePosition.y > this.sprite.y){
            this.yv = -1
        }

        // normalize vector
        let magnitude = Math.sqrt(this.xv ** 2 + this.yv ** 2);
        if (magnitude > 0) {
            this.xv /= magnitude;
            this.yv /= magnitude;
        }
    }

    handlePowerUp = () => {
        this.mouseIsHolding = true
    }

    handlePowerRelease = (event) => {
        console.log('RELEASE THE POWER: ', this.mousePower)
        this.handleClick(event)

        // apply power to the velocity
        this.xv *= 1 + this.mousePower; 
        this.yv *= 1 + this.mousePower;

        //reset mousePower to 0 and mouseIsHolding to false
        this.mouseIsHolding = false
        this.mousePower = 0 
    }

}