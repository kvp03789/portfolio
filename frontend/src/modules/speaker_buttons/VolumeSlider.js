import SpeakerButton from "../base_classes/SpeakerButton"
import { DropShadowFilter } from "pixi-filters";

export default class VolumeSlider extends SpeakerButton{
    constructor(texture, x_pos, y_pos, app, speakerContainer, speakerSliderContainer, adjustVolume){
        super(texture, x_pos, y_pos, app, speakerContainer, speakerSliderContainer)
        // this.sprite.on('pointerdown', this.handleClick);
        this.sprite.anchor.set(0.5);
        this.sprite.eventMode = 'static';
        this.sprite.interactive = true;
        this.speakerSliderContainer = speakerSliderContainer
        this.speakerSliderContainer.addChild(this.sprite)
        this.sprite.label = 'volume_slider'

        // Setup events for mouse + touch using the pointer events
        this.sprite.on('pointerdown', this.onDragStart, this.sprite);

        this.sprite.on('pointerup', this.onDragEnd);
        this.sprite.on('pointerupoutside', this.onDragEnd);

        this.dragTarget = null
        this.adjustVolume = adjustVolume
    }  

    handleClick = () => {
        console.log("volume slider clicked", this.speakerSliderContainer)
        this.speakerSliderContainer.children.forEach((sprite) => {
            sprite.filters = []
        })
        this.sprite.filters = [new DropShadowFilter({blur: 0, alpha: 1})]
    }

    onDragStart = () => {
        this.sprite.alpha = 0.5;
        this.dragTarget = this.sprite;
        this.sprite.on('pointermove', this.onDragMove);

        console.log('DRAG START')
    }

    onDragMove = (event) => {
        
        if (this.dragTarget)
            {
                const newPosition = this.dragTarget.parent.toLocal(event.global);
                //check that the slider doesnt move outside of its bounds
                if(newPosition.x >= this.x_pos - 69.5 && newPosition.x <= this.x_pos + 69.5){
                    const newPosition = this.dragTarget.parent.toLocal(event.global);
                    this.dragTarget.position.x = newPosition.x;
                    this.adjustVolume(newPosition.x)
                }
                    
            }
    }

    onDragEnd = () => {
        console.log('DRAG END')
        if (this.dragTarget)
            {
                this.app.stage.off('pointermove', this.onDragMove);
                this.dragTarget.alpha = 1;
                this.dragTarget = null;
            }
    }

}