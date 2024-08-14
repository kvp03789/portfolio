import Icon from "../base_classes/Icon"
import { DropShadowFilter } from "pixi-filters";
import { Sprite, Graphics } from 'pixi.js'
import AboutMe from "../windows/AboutMe";

export default class AboutMeIcon extends Icon{
    constructor(texture, x_pos, y_pos, app, desktopContainer, iconsContainer, windowsContainer, icons_assets){
        super(texture, x_pos, y_pos, app, desktopContainer, iconsContainer, windowsContainer, icons_assets)
        this.sprite.on('click', this.handleClick);
    }  

    handleClick = () => {
        console.log("about me icon clicked")
        this.iconsContainer.children.forEach((sprite) => {
            sprite.filters = []
        })
        this.sprite.filters = [new DropShadowFilter({blur: 0, alpha: 1})]
        this.handleOpenAboutWindow()
    }

    handleOpenAboutWindow = () => {
        const aboutMeWindow = new AboutMe(50, 100, this.windowsContainer, this.icons_assets)

        
    }

}