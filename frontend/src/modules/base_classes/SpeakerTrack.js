import * as PIXI from 'pixi.js'

export default class SpeakerTrack {
    constructor(trackLabelWidth , trackLabelHeight, x_pos, y_pos, app, speaker, allTracksContainer, speakerContainer, speakerButtonsContainer, audio, trackTitle, index, playTrack, currentTrack, soundsObject){
        this.index = index
        this.trackContainer = new PIXI.Container()
        this.trackBackground = new PIXI.Graphics()
            .rect(x_pos, y_pos, trackLabelWidth , trackLabelHeight)
            .fill('black')
        this.textStyle = new PIXI.TextStyle({fontFamily: 'PixelEmulator', fontSize: 20, fill: '03a132'})
        this.trackText = new PIXI.Text(({text: `${trackTitle}`, style: this.textStyle}))

        this.audio = audio
        this.audio.loop = true
        this.trackTitle = trackTitle
        
        this.speaker = speaker
        this.x_pos = x_pos
        this.y_pos = y_pos

        this.app = app
        this.speakerButtonsContainer = speakerButtonsContainer
        this.allTracksContainer = allTracksContainer
        this.speakerContainer = speakerContainer

        this.playTrack = playTrack

        this.soundsObject = soundsObject
        this.currentTrack = currentTrack
        this.selectionRect = new PIXI.Graphics()
            .rect(x_pos, y_pos, trackLabelWidth , trackLabelHeight)
            .stroke({ width: 4, color: '03a132' })
        this.selectionRect.label = 'selection_rect'

        this.mouseOverRect = new PIXI.Graphics()
            .rect(x_pos, y_pos, trackLabelWidth , trackLabelHeight)
            .stroke({ width: 4, color: '03a132' })
        this.mouseOverRect.label = 'mouse_over_rect'
    }  

    init = () => {
        this.trackText.position.set(this.x_pos, this.y_pos)

        this.trackContainer.interactive = true;
        this.trackContainer.eventMode = 'static';
        this.trackContainer.cursor = 'pointer'
        this.trackContainer.on('pointerenter', this.handlePointerEnter)
        this.trackContainer.on('pointerleave', this.handlePointLeave)
        this.trackContainer.on('click', this.handleClick)
        this.trackContainer.label = `track_${this.index + 1}_container`
        this.trackContainer.addChild(this.trackBackground)
        this.trackContainer.addChild(this.trackText)
        this.allTracksContainer.addChild(this.trackContainer)
    }

    handlePointerEnter = () => {
        this.trackContainer.addChild(this.mouseOverRect)
    }

    handlePointLeave = () => {
        this.trackContainer.removeChild(this.mouseOverRect)
    }

    handleClick = () => {
        this.playTrack(this.audio, this.trackTitle)
        console.log('BIG DEBUG: ', this.allTracksContainer.children)
        this.allTracksContainer.children.forEach(trackContainer => {
            trackContainer.children.forEach(trackChild => {
                if(trackChild.label == 'selection_rect'){
                    trackContainer.removeChild(trackChild)
                }
            })
        })
        this.trackContainer.addChild(this.selectionRect)
    }
    
}