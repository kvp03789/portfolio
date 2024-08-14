import Icon from "../base_classes/Icon"
import { DropShadowFilter } from "pixi-filters";
import Projects from "../windows/Projects";

export default class ProjectsIcon extends Icon{
    constructor(texture, x_pos, y_pos, app, desktopContainer, iconsContainer, windowsContainer, icons_assets){
        super(texture, x_pos, y_pos, app, desktopContainer, iconsContainer, windowsContainer, icons_assets)
        this.sprite.on('pointerdown', this.handleClick);
    }  

    handleClick = () => {
        console.log("projects icon clicked")
        this.iconsContainer.children.forEach((sprite) => {
            sprite.filters = []
        })
        this.sprite.filters = [new DropShadowFilter({blur: 0, alpha: 1})]
        this.handleOpenProjectsWindow()
    }

    handleOpenProjectsWindow = () => {
        const projectsWindow = new Projects(150, 100, this.windowsContainer, this.icons_assets) 
    }
}