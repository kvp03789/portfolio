import { CRTFilter } from "pixi-filters"
import { TextStyle, Text, Graphics, Sprite, Texture, Container } from "pixi.js"

export default class SpotifyScene{
    constructor(tv_stand_sprite, x, y, color, pngAssets, tv_container, lastPlayedJson){
        
        this.lastPlayedJson = lastPlayedJson
        this.tv_stand_sprite = tv_stand_sprite
        this.x = x
        this.y = y
        this.color = color
        this.pngAssets = pngAssets
        this.tv_container = tv_container
        
        this.background = new Sprite(this.pngAssets.TVBackground)
        this.background.x = 181
        this.background.y = 215
        this.background.label = 'background'

        this.glareForeground = new Sprite(this.pngAssets.TVGlare)
        this.glareForeground.x = 181
        this.glareForeground.y = 215
        this.glareForeground.label = 'foreground_glare'

        this.style = new TextStyle({
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 'bold',
            fill: this.color,
            // dropShadow: {
            //     color: '#000000',
            //     blur: 4,
            //     angle: Math.PI / 6,
            //     distance: 6,
            // },
            letterSpacing: .5,
            wordWrap: true,
            wordWrapWidth: 440,
        });
    
        this.text = new Text({
            text: `${this.lastPlayedJson.artistName} - ${this.lastPlayedJson.songTitle}  ${this.lastPlayedJson.playedAgo}`,
            style: this.style,
        });
        this.textX_start = -50
        this.text.x = 50;
        this.text.y = 220;

        this.lastSongTextStyle = new TextStyle({
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 'bold',
            fill: 'white',
            // dropShadow: {
            //     color: '#000000',
            //     blur: 4,
            //     angle: Math.PI / 6,
            //     distance: 6,
            // },
            letterSpacing: .5,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        this.secondText = new Text({
            text: `${this.lastPlayedJson.artistName} - ${this.lastPlayedJson.songTitle}  ${this.lastPlayedJson.playedAgo}`,
            style: this.style,
        });
        this.secondTextX_start = this.text.x - (this.text.width + 50)
        this.secondText.x = this.secondTextX_start
        this.secondText.y = 220;

        this.mask = new Sprite(Texture.WHITE);
        
        this.mask.width = 140;
        this.mask.height = 60;
        this.mask.position.set(184, 220)
           
        this.lastSongText = new Text({text: 'last played', style: this.lastSongTextStyle})
        this.lastSongText.position.set(235, 255)

        this.spotifyLogo = Sprite.from(this.pngAssets.SpotifyPixel)
        this.spotifyLogo.position.set(200, 250)
        this.spotifyLogo.scale.set(.5, .5)
        this.spotifyLogo.label = 'spotify_logo'

        this.container = new Container()
        this.text.mask = this.mask;
        this.secondText.mask = this.mask

        this.mask.label = 'mask'   

        this.container.filters = [new CRTFilter()]
        this.container.addChild(this.background, this.spotifyLogo, this.mask, this.lastSongText, this.text, this.secondText, this.glareForeground )
        // this.container.addChild(this.text, this.spotifyLogo, this.background)

    }

    animate = () => {
        this.text.x += .5
        this.secondText.x += .5

        if(this.text.x >=  (this.text.width * 2) + 150){
            this.text.x = this.textX_start
            this.secondText.x = this.secondTextX_start
        }
        // if(this.secondText.x >= this.secondTextX_start + this.secondText.width){
        //     this.secondText.x = this.secondTextX_start
        // }
    }

    load = async () => {
        console.log('loading')
    }
}