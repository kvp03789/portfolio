import * as PIXI from 'pixi.js'
import { CRTFilter } from 'pixi-filters'

export default class NowPlaying {
    constructor(width , height, x_pos, y_pos, app, allTracksContainer, speakerContainer, speakerButtonsContainer, currentTrack, soundsObject){
        this.x_pos = x_pos
        this.y_pos = y_pos

        this.container = new PIXI.Container()
        this.background = new PIXI.Graphics()
            .rect(0, 0, width , height)
            .fill('black')
        this.nowPlayingTextStyle = new PIXI.TextStyle({fontFamily: 'PixelEmulator', fontSize: 20, fill: '03a132'})
        this.nowPlayingText = new PIXI.Text(({text: `Now Playing:`, style: this.nowPlayingTextStyle}))

        this.titleTextStyle = new PIXI.TextStyle({fontFamily: 'PixelEmulator', fontSize: 15, fill: '03a132', letterSpacing: 2.85})
        this.titleText = new PIXI.Text(({text: ``, style: this.titleTextStyle}))

        this.timeTextStyle = new PIXI.TextStyle({fontFamily: 'PixelEmulator', fontSize: 15, fill: '03a132'})
        this.timeText = new PIXI.Text(({text: `--:--`, style: this.timeTextStyle}))

        this.filter = [new CRTFilter({animating: true})]
        
        this.app = app
        
        this.speakerButtonsContainer = speakerButtonsContainer
        this.allTracksContainer = allTracksContainer
        this.speakerContainer = speakerContainer

        this.soundsObject = soundsObject
        this.currentTrack = currentTrack

        this.mask = new PIXI.Sprite(PIXI.Texture.WHITE);
        
        this.mask.width = 220;
        this.mask.height = 60;
        this.mask.position.set(-6, 32)

        this.titleTextX = 100
        
    }  

    init = () => {
        this.mask.label = 'now_playing_mask'
        this.nowPlayingText.position.set(0,0)
        this.titleText.position.set(this.titleTextX,50)
        this.titleText.anchor.set(1, .5)
        this.timeText.position.set(50,70)
        this.container.label = 'now_playing_container'
        this.container.position.set(this.x_pos, this.y_pos)
        this.container.addChild(this.background, this.nowPlayingText, this.titleText, this.timeText, this.mask)
        this.container.filters = this.filter
        this.titleText.mask = this.mask
    }

    animate = () => {
        this.titleText.position.x += .5

        if(this.titleText.position.x >=  (this.titleTextX + this.mask.width + 100)){
            this.titleText.position.x = this.titleTextX
            
        }
    }
    
}