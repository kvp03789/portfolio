import SpeakerButton from "../base_classes/SpeakerButton"
import { DropShadowFilter } from "pixi-filters";

export default class NextButton extends SpeakerButton{
    constructor(texture, x_pos, y_pos, app, speakerContainer, speakerButtonsContainer){
        super(texture, x_pos, y_pos, app, speakerContainer, speakerButtonsContainer)
        this.sprite.on('pointerdown', this.handleClick);
        this.speakerButtonsContainer.addChild(this.sprite)
    }  

    handleClick = () => {
        console.log("next track button clicked", this.speakerButtonsContainer)
        this.speakerButtonsContainer.children.forEach((sprite) => {
            sprite.filters = []
        })
        this.sprite.filters = [new DropShadowFilter({blur: 0, alpha: 1})]
    }
}