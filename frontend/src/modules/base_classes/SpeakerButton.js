import { Sprite } from 'pixi.js'

export default class Icon {
    constructor(texture, x_pos, y_pos, app, speakerContainer, speakerButtonsContainer){
        this.texture = texture
        this.sprite = new Sprite(this.texture)
        this.sprite.alpha = 0  //initialize alpha at 0 for animation later
        this.x_pos = x_pos
        this.y_pos = y_pos
        this.sprite.x = x_pos
        this.sprite.y = y_pos
        this.sprite.interactive = true;
        this.sprite.eventMode = 'static';
        this.sprite.cursor = 'pointer'
        this.app = app
        
        this.speakerContainer = speakerContainer
        // this.desktopContainer.addChild(this.sprite)

        this.speakerButtonsContainer = speakerButtonsContainer
        
        // this.sprite.on("click", this.handleOpenWindow)
    }  

    
}