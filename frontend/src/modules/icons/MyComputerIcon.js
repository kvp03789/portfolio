import Icon from "../base_classes/Icon"
import { DropShadowFilter } from "pixi-filters";

export default class MyComputerIcon extends Icon{
    constructor(texture, x_pos, y_pos, app, desktopContainer, iconsContainer, windowsContainer, icons_assets){
        super(texture, x_pos, y_pos, app, desktopContainer, iconsContainer, windowsContainer, icons_assets)
        this.sprite.on('pointerdown', this.handleClick);
    }  

    handleClick = () => {
        console.log("my computer icon clicked", this.iconsContainer)
        this.iconsContainer.children.forEach((sprite) => {
            sprite.filters = []
        })
        this.sprite.filters = [new DropShadowFilter({blur: 0, alpha: 1})]
    }
}