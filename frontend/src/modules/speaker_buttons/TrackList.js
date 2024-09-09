import * as PIXI from 'pixi.js'
import SpeakerTrack from '../base_classes/SpeakerTrack'

export default class TrackList{
    constructor(x_pos, y_pos, app, trackLabelHeight, trackLabelWidth, soundsObject, speaker, speakerContainer, speakerButtonsContainer, playTrack, currentTrack, ScrollButton, ScrollButtonInactive){
        this.x_pos = x_pos
        this.y_pos = y_pos

        this.app = app
        this.soundsObject = soundsObject
        this.speaker = speaker
        this.speakerContainer = speakerContainer
        this.speakerButtonsContainer = speakerButtonsContainer
        this.playTrack = playTrack
        this.currentTrack = currentTrack 

        this.trackLabelHeight = trackLabelHeight
        this.trackLabelWidth = trackLabelWidth

        this.mask = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.mask.width = this.trackLabelWidth + 50;
        this.mask.height = this.trackLabelHeight * 3;
        this.mask.position.set(-8, 90)

        this.activeTexture = ScrollButton
        this.inactiveTexture = ScrollButtonInactive

        this.scrollUpButton = new PIXI.Sprite(this.inactiveTexture)
        this.scrollDownButton = new PIXI.Sprite(this.activeTexture)
        this.scrollUpButton.eventMode = 'static';
        this.scrollUpButton.interactive = true;
        this.scrollUpButton.on('click', this.handleUpClick)
        this.scrollDownButton.eventMode = 'static';
        this.scrollDownButton.interactive = true;
        this.scrollDownButton.on('click', this.handleDownClick)

        //these values are equal to the number of tracks
        //that are out of view of the track list window display.
        //---how many tracks BELOW the track list
        this.scrollDown = (Object.keys(this.soundsObject).length - 2) - 3
        //---how many tracks are ABOVE the tracks list - starts at 0
        this.scrollUp = 0
    }

    init = () => {
        this.allTracksContainer = new PIXI.Container() 
        this.allTracksContainerPosition = {x: 189.5, y: 348.5}
        this.allTracksContainer.position = this.allTracksContainerPosition
        this.allTracksContainer.label = 'all_tracks_container'

        this.onlyTracksContainer = new PIXI.Container()
        this.onlyTracksContainer.position = {x: 0, y: 0}
        this.onlyTracksContainer.label = 'only_tracks_container'

        //loop through soundsObject and make a new SpeakerTrack instance for each
        Object.values(this.soundsObject).forEach((sound, index) => {
            //skip the first two because they are room noise and rain noise
            if(index > 1){
                const posX = 0
                const posY = this.trackLabelHeight * (index + 1)
                const track = new SpeakerTrack(this.trackLabelWidth , this.trackLabelHeight, posX, posY, this.app, this.speaker, this.onlyTracksContainer, this.speakerContainer, this.speakerButtonsContainer, sound.audio, sound.title, index, this.playTrack, this.currentTrack, this.soundsObject)
                track.init()
            }
        })
        this.allTracksContainer.addChild(this.mask)
        this.allTracksContainer.mask = this.mask
        this.allTracksContainer.mask.label = 'all_tracks_container_mask'

        this.scrollDownButton.anchor.set(0.5, 0.5)
        this.scrollUpButton.anchor.set(0.5, 0.5)
        this.scrollUpButton.label = 'scroll_up'
        this.scrollUpButton.position.set(418.5, 102.5)
        this.scrollDownButton.label = 'scroll_down'
        this.scrollDownButton.position.set(418.5, 168)
        this.scrollDownButton.angle = 180

        //check whether or not to set initial scroll down button to inactive or active
        this.checkAndSetScrollButtonTextures()
        this.allTracksContainer.addChild(this.onlyTracksContainer, this.scrollUpButton, this.scrollDownButton)
    }

    handleUpClick = () => {
        if(this.scrollUp > 0){
            this.scrollDown += 1
            this.scrollUp -= 1
            this.onlyTracksContainer.position.y += this.trackLabelHeight
            this.checkAndSetScrollButtonTextures()
        }
        
        console.log("up click", this.scrollDown)
    }

    handleDownClick = () => {
        if(this.scrollDown > 0){
            this.scrollDown -= 1
            this.scrollUp += 1
            this.onlyTracksContainer.position.y -= this.trackLabelHeight
            this.checkAndSetScrollButtonTextures()
        }
        
        console.log('down click', this.scrollDown)

        // Object.values(this.soundsObject).forEach((sound, index) => {
        //     //skip the first two because they are room noise and rain noise
        //     if(index >= this.scrollIndex && index <= this.scrollIndex + 2){
        //         const posX = 0
        //         const posY = this.trackLabelHeight * (index + 1)
        //         const track = new SpeakerTrack(this.trackLabelWidth , this.trackLabelHeight, posX, posY, this.app, this.speaker, this.allTracksContainer, this.speakerContainer, this.speakerButtonsContainer, sound.audio, sound.title, index, this.playTrack, this.currentTrack, this.soundsObject)
        //         track.init()
        //     }
        // })
    }

    checkAndSetScrollButtonTextures = () => {
        //this function chekcs if there are tracks out of view
        //and sets the scroll buttons sprites' textures to either
        //inactive or active
        if(this.scrollUp > 0){
            this.scrollUpButton.texture = this.activeTexture
        }
        else{
            this.scrollUpButton.texture = this.inactiveTexture
        }

        if(this.scrollDown > 0){
            this.scrollDownButton.texture = this.activeTexture
        }
        else{
            this.scrollDownButton.texture = this.inactiveTexture
        }
    }
}

