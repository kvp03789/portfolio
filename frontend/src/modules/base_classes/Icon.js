import { Sprite } from 'pixi.js'

export default class Icon {
    constructor(texture, x_pos, y_pos, app, desktopContainer, iconsContainer, windowsContainer, icons_assets){
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
        
        this.icons_assets = icons_assets
        this.desktopContainer = desktopContainer
        this.windowsContainer = windowsContainer
        // this.desktopContainer.addChild(this.sprite)

        this.iconsContainer = iconsContainer
        this.iconsContainer.addChild(this.sprite)
        // this.sprite.on("click", this.handleOpenWindow)
    }  

    
}