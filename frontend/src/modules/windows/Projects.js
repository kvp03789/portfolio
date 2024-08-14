import { Container, Graphics, TextStyle, Text, Sprite } from "pixi.js"

export default class Projects{
    constructor(x, y, windowsContainer, icons_assets){
        this.graphic = new Graphics() // the PIXI Graphics obj for this window
        this.windowsContainer = windowsContainer
        this.graphic.x = x
        this.graphic.y = y

        this.clicked = false

        this.icons_assets = icons_assets

        

        this.windowWidth = 300
        this.windowHeight = 300

        //draw the main window
        this.graphic.rect(x, y, this.windowWidth, this.windowHeight)
        this.graphic.fill(0xffffff);
        this.graphic.stroke({ width: 2, color: 0x000000 });

        //menu bar
        this.bar = new Graphics()
        this.bar.rect(x, y, this.windowWidth, 20)
        this.bar.fill(0x000000);
        this.bar.stroke({ width: 2, color: 0x000000 });
        this.bar.interactive = true;
        this.bar.eventMode = 'static';
        this.bar.cursor = 'pointer'
        this.bar.on('pointerdown', () => {
            this.clicked = true
        })
        this.bar.on('pointerup', () => {
            this.clicked = false
        })
        this.bar.on('pointerupoutside', () => {
            this.clicked = false
        })
        this.bar.on('globalmousemove', (e) => {
            this.handleDrag(e)
        })

        //menu bar X
        this.xButton = new Sprite(this.icons_assets.XButton)
        this.xButton.x = (this.graphic.x + this.graphic.width) - (this.xButton.width - 10)
        this.xButton.y = 100.5
        this.xButton.scale.set(.6, .6)
        this.xButton.interactive = true;
        this.xButton.eventMode = 'static';
        this.xButton.cursor = 'pointer'
        this.xButton.on('mouseenter', this.onXButtonMouseEnter, this.xButton)
        this.xButton.on('mouseleave', this.onXButtonMouseLeave, this.xButton)
        this.xButton.on('click', this.onXButtonClick)

        
        this.graphic.interactive = true;
        this.graphic.eventMode = 'static';
        this.graphic.cursor = 'pointer'
        
        this.graphic.addChild(this.bar, this.xButton)
        this.windowsContainer.addChild(this.graphic)

        
    }

    onXButtonMouseEnter = () => {
        this.xButton.texture = this.icons_assets.XButtonRed
    }

    onXButtonMouseLeave = () => {
        this.xButton.texture = this.icons_assets.XButton
    }

    onXButtonClick = () => {
        this.windowsContainer.removeChild(this.graphic)
    }

    handleDrag = (e) => {
        console.log(this.clicked)
        if(this.clicked){
            let pos = e.data.global
            const bounds = this.graphic.parent.parent.getBounds()
            this.graphic.x = pos.x - 100
            this.graphic.y = pos.y - 100
            // if(0 <= this.graphic.x && this.graphic.x + this.graphic.width <= 700 
            //     && 
            //     0 <= this.graphic.y + this.graphic.height <= 600){
            //     let pos = e.data.global
            //     this.graphic.x = pos.x - 100
            //     this.graphic.y = pos.y - 100
            //     console.log(this.graphic.x)
            // }
            if(this.graphic.x < -10){
                this.graphic.x = -10
            }
            else if (this.graphic.x + this.graphic.width > 700){
                this.graphic.x = 700 - this.graphic.width
            }

            if(this.graphic.y < -30){
                this.graphic.y = -30
            }
            else if (this.graphic.y + this.graphic.height > 440){
                this.graphic.y = 440 - this.graphic.height
            }
            console.log(this.graphic.x, " ,", this.graphic.y)
            
        }
        
    }
}