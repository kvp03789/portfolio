import * as PIXI from 'pixi.js'
// importing object classes
import LavaLamp from "../objects/LavaLamp"
import Character from "../objects/Character"
import PC_Desk from "../objects/PCDesk"
import Coffee_Cup from "../objects/CoffeeCup"
import OfflineSign from '../objects/OfflineSign'
import OnlineOfflineSign from '../objects/OnlineOfflineSign'
import Background from "../objects/Background"
import Posters from "../objects/Poster"
import WindowFrame from "../objects/WindowFrame"
import Cables from "../objects/Cables"
import TV_Stand from "../objects/TVStand"
import Bed from "../objects/Bed"
import BookShelf from "../objects/Bookshelf"
import { desk_spritesheet_json2, lava_lamp_spritesheet_json, character_spritesheet_json,
    coffee_spritesheet_json, online_spritesheet_json, character_offline_spritesheet_json, 
    selection_arrow_sprite_sheet_json, tv_stand_sprite_sheet_json,
    rain_sprite_sheet, speaker_sprite_sheet_json} from '../../json/desk_spritesheet'
import Plant from '../objects/Plant'
import DesktopBackground from '../objects/DesktopBackground'
import { CRTFilter, PixelateFilter } from 'pixi-filters'
import MyComputerIcon from '../icons/MyComputerIcon'
import AboutMeIcon from '../icons/AboutMeIcon'
import ProjectsIcon from '../icons/ProjectsIcon'
import PowerIcon from '../icons/PowerIcon'
import Ball from '../objects/Ball'
import OutsideWindow from '../objects/OutsideWindow'
import Speaker from '../objects/Speaker'
import PlayButton from '../speaker_buttons/PlayButton'
import PauseButton from '../speaker_buttons/PauseButton'
import CloseButton from '../speaker_buttons/CloseButton'
import TrackSlider from '../speaker_buttons/TrackSlider'
import VolumeSlider from '../speaker_buttons/VolumeSlider'
import NextButton from '../speaker_buttons/NextButton'
import PreviousButton from '../speaker_buttons/PreviousButton'
import SpeakerTrack from '../base_classes/SpeakerTrack'
import { Howler } from 'howler'
import NowPlaying from '../speaker_buttons/NowPlaying'
import TrackList from '../speaker_buttons/TrackList'

export default class RoomScene{
    constructor(app, set_state, assets, sprite_sheets, isOnline, icons, weatherJson, weatherIcons, lastPlayedJson, soundsObject){
        this.app = app
        this.set_state = set_state

        this.assets = assets
        this.soundsObject = soundsObject
        this.sprite_sheets = sprite_sheets
        this.icons = icons
        this.weatherIcons = weatherIcons

        this.clicking = false
        this.clickCooldown = 1000
        this.mouseDown = false

        this.mousX = 0
        this.mouseY = 0

        this.weatherJson = weatherJson
        // this.isOnline = onlineStatus
        this.isOnline = isOnline

        this.displayDesktop = false
        this.isDesktopDisplaying = false

        this.displaySpeakerMenu = false
        this.isSpeakerMenuDisplaying = false

        this.lastPlayedJson = lastPlayedJson

        //the current track being played from speaker
        this.currentTrackTitle = ''
        this.currentTrack = null
        this.currentTime = ''
        this.volumeLevel = 0.5
    }

    //functions that relate to audio player

    //function for changing song position when user drag tracking bar it
    updateTracking = (trackBarXPos) => {
        console.log('changing track position...')
        const rangeMin = 212
        const rangeDifference = 379
        //normalize? the range to be .00-.99
        const newRange = (trackBarXPos - rangeMin)/rangeDifference
        
        if(this.currentTrack){
            const trackDuration = this.currentTrack._duration
            const newTime = trackDuration * newRange
            this.currentTrack.seek(newTime)
        }
    }

    updateTime = () => {
        //time in seconds
        let timeInSeconds = Math.floor(this.currentTrack.seek())
        let secondsString = timeInSeconds < 10 ? '0' + timeInSeconds.toString() : timeInSeconds % 60 < 10 ? '0' + (timeInSeconds % 60).toString() : (timeInSeconds % 60).toString()
        let minutesString = `${Math.floor((timeInSeconds / 60)).toString()}`
        this.currentTime = `0${minutesString}:${secondsString}`
        //set now playing screen
        this.nowPlayingWindow.timeText.text = this.currentTime

        
        //pass in timeInSeconds and duration of current song
        this.trackSlider.updatePosition(timeInSeconds, this.currentTrack._duration)
        
    }

    playTrack = (audio, trackTitle) => {
        this.app.ticker.remove(this.updateTime);
        if(this.currentTrack){
            this.currentTrack.stop()
        }
        this.currentTrackTitle = trackTitle
        this.currentTrack = audio
        this.currentTrack.play()
        this.currentTrack.loop = true
        this.currentTrack.volume = this.volumeLevel
        //set now playing screen
        this.nowPlayingWindow.titleText.text = this.currentTrackTitle

        //TO DO: add function to ticker that will move tracking bar on song.onseek()

        this.app.ticker.add(this.updateTime)
        console.log(`now playing ${this.currentTrackTitle}`)

        //logic to animate now playing title text
        this.app.ticker.remove(this.nowPlayingWindow.animate)
        this.app.ticker.add(this.nowPlayingWindow.animate)

    }

    pauseTrack = (audio, trackTitle) => {
        if(this.currentTrack){
            this.currentTrack.pause()
        }
    }

    adjustVolume = (sliderPosX) => {
        const range = 139
        const level = (sliderPosX - 451)/range
        //change level to 2 decimal number and set this.volumeLevel
        this.volumeLevel = Math.floor(level * 100) / 100
        Howler.volume(this.volumeLevel)
        if(this.currentTrack){
            // this.currentTrack.volume(this.volumeLevel)
        }
        console.log('adjusting volume...', this.volumeLevel, this.currentTrack)
    }

    //functions to initialize various assets
    initializeAssets = async () => {
        this.roomEntitiesContainer = new PIXI.Container()
        await this.initializeDesktopAssets()
        await this.initializeSpeakerMenuAssets()
        
        this.roomEntitiesContainer.label = "room_entities"
        this.backgroundObject = new Background(this.assets.BackgroundImg, 0, 0, this.app, this.roomEntitiesContainer)
        this.postersObject = new Posters(this.assets.PosterImg, 0, 0, this.app, this.roomEntitiesContainer)

        await this.create_outside_window_object()
        this.windowObject = new WindowFrame(this.assets.WindowImg, 0, 0, this.app, this.roomEntitiesContainer)
        
        this.cablesObject = new Cables(this.assets.CablesImg, 0, 0, this.app, this.roomEntitiesContainer)
        // this.tvStandObject = new TV_Stand(this.assets.TVStandImg, 0, 0, this.app, this.roomEntitiesContainer)
        await this.create_tv_stand_object()
        await this.create_desk_animated_object()
        await this.create_lava_lamp_animated_object()

        this.bedObject = new Bed(this.assets.BedImg, 0, 0, this.app, this.roomEntitiesContainer)
        this.bookshelfObject = new BookShelf(this.assets.BookShelfImg, 0, 0, this.app, this.roomEntitiesContainer)
        this.plantObject1 = new Plant(this.assets.Plant1Img, 44, 0, this.app, this.roomEntitiesContainer)
        this.plantObject2 = new Plant(this.assets.Plant2Img, 0, 0, this.app, this.roomEntitiesContainer)

        if(this.isOnline){
            await this.create_character_animated_object()
            await this.create_online_sign_animated_object()
        }
        else{
            await this.create_character_offline_animated_object()
        }
        
        
        await this.create_speaker_object()
        await this.create_coffee_cup_animated_object()
        this.soccerBall = new Ball(this.assets.SoccerBall, 100, 0, this.app, this.roomEntitiesContainer)
        this.app.stage.addChild(this.roomEntitiesContainer)
        
        // this.coffeeCupObject = new Coffee_Cup(this.assets.CoffeeSpriteSheet, 250, 350)
    }

    initializeDesktopAssets = async () => {
        this.desktopContainer = new PIXI.Container({isRenderGroup: true})
        this.desktopContainer.label = 'desktop_container'

        this.monitorBackground = new PIXI.Sprite(this.assets.MonitorBackgroundImg)
        this.monitorBackground.anchor.set(.5, .5)
        this.monitorBackground.x = 400
        this.monitorBackground.y = 300
        this.monitorBackground.alpha = 0
        this.desktopContainer.addChild(this.monitorBackground)

        //icons setup
        this.iconsContainer = new PIXI.Container()
        this.iconsContainer.label = 'icons_container'
        this.windowsContainer = new PIXI.Container()
        this.windowsContainer.label = 'windows_container' 
        this.myComputerIcon = new MyComputerIcon(this.icons.MyComputerIcon, 200, 0, this.app, this.desktopContainer, this.iconsContainer, this.windowsContainer, this.icons)
        this.aboutMeIcon = new AboutMeIcon(this.icons.AboutMeIcon, 400, 0, this.app, this.desktopContainer, this.iconsContainer, this.windowsContainer, this.icons)
        this.projectsIcon = new ProjectsIcon(this.icons.ProjectsIcon, 200, 0, this.app, this.desktopContainer, this.iconsContainer, this.windowsContainer, this.icons)
        this.powerIcon = new PowerIcon(this.icons.PowerIcon, 670, 0, this.app, this.desktopContainer, this.iconsContainer, this.roomEntitiesContainer, this.setHideDesktop, this.windowsContainer, this.icons)
        this.desktopContainer.addChild(this.iconsContainer, this.windowsContainer)

        this.desktopContainer.filters = [new CRTFilter({animating: true})]
        this.desktopContainer.width = 0
        // this.desktopContainer.height = 0

    }

    initializeSpeakerMenuAssets = async () => {
        //speakerContainer is the container for ALL audio/speaker menu assets
        this.speakerContainer = new PIXI.Container({isRenderGroup: true})
        this.speakerContainer.label = 'speaker_container'

        this.speakerMenuBackground = new PIXI.Sprite(this.assets.SpeakerMenuBackground)
        this.speakerMenuBackground.anchor.set(.5, .5)
        this.speakerMenuBackground.x = 400
        this.speakerMenuBackground.y = 300
        this.speakerMenuBackground.alpha = 0

        //speaker buttons setup
        this.speakerButtonsContainer = new PIXI.Container()
        this.speakerButtonsContainer.label = 'speaker_buttons_container'

        this.speakerSliderContainer = new PIXI.Container()
        this.speakerSliderContainer.label = 'speaker_sliders_container'

        const buttonSpacingSize = 6
        const buttonWidth = 68
        const buttonOffset = 150
        this.speakerPreviousButton = new PreviousButton(this.assets.SpeakerMenuPrevious, buttonOffset + (buttonSpacingSize + buttonWidth), 23, this.app, this.speakerContainer, this.speakerButtonsContainer)        
        this.speakerPlayButton = new PlayButton(this.assets.SpeakerMenuPlay, (buttonOffset + 2 * (buttonSpacingSize + buttonWidth)), 23, this.app, this.speakerContainer, this.speakerButtonsContainer)
        this.speakerPauseButton = new PauseButton(this.assets.SpeakerMenuPause, buttonOffset + 3 * (buttonSpacingSize + buttonWidth), 23, this.app, this.speakerContainer, this.speakerButtonsContainer)
        this.speakerNextButton = new NextButton(this.assets.SpeakerMenuNext, buttonOffset + 4 * (buttonSpacingSize + buttonWidth), 23, this.app, this.speakerContainer, this.speakerButtonsContainer)

        this.trackSlider = new TrackSlider(this.assets.SpeakerMenuTracking, 212, 0, this.app, this.speakerContainer, this.speakerSliderContainer, this.updateTracking)
        this.volumeSlider = new VolumeSlider(this.assets.SpeakerMenuVolume, 520.5, 0, this.app, this.speakerContainer, this.speakerSliderContainer, this.adjustVolume)
        //close button has 2 extra args, this is for removing blur filter 
        //from rest of room when closing
        //and hiding the speaker menu
        this.speakerCloseButton = new CloseButton(this.assets.SpeakerMenuClose, 563, 0, this.app, this.speakerContainer, this.speakerButtonsContainer, this.roomEntitiesContainer, this.setHideSpeakerMenu)
        this.speakerCloseButton.label = 'speaker_power_button'

        //setup for tracks/track list        
        const trackLabelWidth = 400
        const trackLabelHeight = 30
        const containerPosition = {x: 189.5, y: 348.5}
        this.trackListSection = new TrackList(containerPosition.x, containerPosition.y, this.app, trackLabelHeight, trackLabelWidth, this.soundsObject, this.speaker, this.speakerContainer, this.speakerButtonsContainer, this.playTrack, this.currentTrack, this.assets.ScrollButton, this.assets.ScrollButtonInactive)
        this.trackListSection.init()
        // this.allTracksContainer = new PIXI.Container()
        // this.allTracksContainer.label = 'all_tracks_container'
        // this.allTracksContainer.position.set(containerPosition.x, containerPosition.y)
        // //loop through soundsObject and make a new SpeakerTrack instance for each
        // Object.values(this.soundsObject).forEach((sound, index) => {
        //     //skip the first two because they are room noise and rain noise
        //     if(index > 1){
        //         const posX = 0
        //         const posY = trackLabelHeight * (index + 1)
        //         const track = new SpeakerTrack(trackLabelWidth , trackLabelHeight, posX, posY, this.app, this.speaker, this.allTracksContainer, this.speakerContainer, this.speakerButtonsContainer, sound.audio, sound.title, index, this.playTrack, this.currentTrack, this.soundsObject)
        //         track.init()
        //     }
        // })
        
        //setup for now playing screen
        const width = 216
        const height = 100
        this.nowPlayingWindow = new NowPlaying(width , height, 210, 102.5, this.app, this.allTracksContainer, this.speakerContainer, this.speakerButtonsContainer, this.currentTrack, this.soundsObject)
        this.nowPlayingWindow.init()

        //add all group containers to speakerContainer
        this.speakerContainer.addChild(this.speakerMenuBackground, this.speakerButtonsContainer, this.speakerSliderContainer, this.trackListSection.allTracksContainer, this.nowPlayingWindow.container)
        this.speakerContainer.filters = [new CRTFilter({animating: true})]
    }

    setDisplaySpeakerMenu = () => {
        this.app.stage.addChild(this.speakerContainer)
        this.isSpeakerMenuDisplaying = true
    }

    setHideSpeakerMenu = () => {
        this.app.stage.removeChild(this.speakerContainer)
        this.isSpeakerMenuDisplaying = false
    }

    setDisplayDesktop = () => {
        this.app.stage.addChild(this.desktopContainer)
        this.isDesktopDisplaying = true
    }

    setHideDesktop = () => {
        this.app.stage.removeChild(this.desktopContainer)
        this.isDesktopDisplaying = false
    }

    create_outside_window_object = async () => {
        const arrowSpriteSheet = new PIXI.Spritesheet(
        PIXI.Texture.from(selection_arrow_sprite_sheet_json.meta.image),
        selection_arrow_sprite_sheet_json
        );
        await arrowSpriteSheet.parse();

        const spritesheet = new PIXI.Spritesheet(
        PIXI.Texture.from(rain_sprite_sheet.meta.image),
        rain_sprite_sheet
        );
        await spritesheet.parse();

        this.outsideWindow = new OutsideWindow(spritesheet, 190, 200, this.app, arrowSpriteSheet, this.roomEntitiesContainer, this.desktopContainer)
    }

    create_desk_animated_object = async () => {
        const arrowSpriteSheet = new PIXI.Spritesheet(
        PIXI.Texture.from(selection_arrow_sprite_sheet_json.meta.image),
        selection_arrow_sprite_sheet_json
        );
        await arrowSpriteSheet.parse();

        const spritesheet = new PIXI.Spritesheet(
        PIXI.Texture.from(desk_spritesheet_json2.meta.image),
        desk_spritesheet_json2
        );
        await spritesheet.parse();
        this.pcDeskObject = new PC_Desk(spritesheet, 470, 300, this.app, arrowSpriteSheet, this.roomEntitiesContainer, this.setDisplayDesktop, this.desktopContainer)
    }

    create_lava_lamp_animated_object = async () => {
        const arrowSpriteSheet = new PIXI.Spritesheet(
        PIXI.Texture.from(selection_arrow_sprite_sheet_json.meta.image),
        selection_arrow_sprite_sheet_json
        );
        await arrowSpriteSheet.parse();

        const spritesheet = new PIXI.Spritesheet(
        PIXI.Texture.from(lava_lamp_spritesheet_json.meta.image),
        lava_lamp_spritesheet_json
        );
        await spritesheet.parse();
        this.lavaLampObject = new LavaLamp(spritesheet, 595, 325, this.app, arrowSpriteSheet, this.roomEntitiesContainer, this.desktopContainer, this.assets)
        
    }

    create_character_animated_object = async () => {
        const arrowSpriteSheet = new PIXI.Spritesheet(
        PIXI.Texture.from(selection_arrow_sprite_sheet_json.meta.image),
        selection_arrow_sprite_sheet_json
        );
        await arrowSpriteSheet.parse();

        const spritesheet = new PIXI.Spritesheet(
        PIXI.Texture.from(character_spritesheet_json.meta.image),
        character_spritesheet_json
        );
        await spritesheet.parse();
        this.characterObject = new Character(spritesheet, 152, 380, this.app, arrowSpriteSheet, this.roomEntitiesContainer, this.desktopContainer)
    }

    create_coffee_cup_animated_object = async () => {
        const arrowSpriteSheet = new PIXI.Spritesheet(
        PIXI.Texture.from(selection_arrow_sprite_sheet_json.meta.image),
        selection_arrow_sprite_sheet_json
        );
        await arrowSpriteSheet.parse();

        const spritesheet = new PIXI.Spritesheet(
        PIXI.Texture.from(coffee_spritesheet_json.meta.image),
        coffee_spritesheet_json
        );
        await spritesheet.parse();
        this.coffeeObject = new Coffee_Cup(spritesheet, 134, 420, this.app, arrowSpriteSheet, this.roomEntitiesContainer, this.desktopContainer)
        this.coffeeObject.sprite.animationSpeed = 0.1
    }

    create_online_sign_animated_object = async () => {
        const arrowSpriteSheet = new PIXI.Spritesheet(
        PIXI.Texture.from(selection_arrow_sprite_sheet_json.meta.image),
        selection_arrow_sprite_sheet_json
        );
        await arrowSpriteSheet.parse();

        const spritesheet = new PIXI.Spritesheet(
        PIXI.Texture.from(online_spritesheet_json.meta.image),
        online_spritesheet_json
        );
        await spritesheet.parse();
        this.onlineSignObject = new OnlineOfflineSign(spritesheet, 57.5, 202, this.app, arrowSpriteSheet, this.roomEntitiesContainer, this.desktopContainer)
        this.onlineSignObject.sprite.scale.set(0.8, 0.8)
    }

    create_character_offline_animated_object = async () => {
        const arrowSpriteSheet = new PIXI.Spritesheet(
        PIXI.Texture.from(selection_arrow_sprite_sheet_json.meta.image),
        selection_arrow_sprite_sheet_json
        );
        await arrowSpriteSheet.parse();

        const spritesheet = new PIXI.Spritesheet(
        PIXI.Texture.from(character_offline_spritesheet_json.meta.image),
        character_offline_spritesheet_json
        );
        await spritesheet.parse();
        this.characterObject = new Character(spritesheet, 152, 380, this.app, arrowSpriteSheet, this.roomEntitiesContainer, this.desktopContainer)
        this.characterObject.sprite.animationSpeed = 0.1;
    }

    create_tv_stand_object = async () => {
        const arrowSpriteSheet = new PIXI.Spritesheet(
        PIXI.Texture.from(selection_arrow_sprite_sheet_json.meta.image),
        selection_arrow_sprite_sheet_json
        );
        await arrowSpriteSheet.parse();

        const spritesheet = new PIXI.Spritesheet(
        PIXI.Texture.from(tv_stand_sprite_sheet_json.meta.image),
        tv_stand_sprite_sheet_json
        );
        await spritesheet.parse();
        

        this.tvStandObject = new TV_Stand(spritesheet, 246, 296.5, this.app, arrowSpriteSheet, this.roomEntitiesContainer, this.desktopContainer, this.assets.TVStandImg, this.assets, this.weatherJson, this.weatherIcons, this.lastPlayedJson)
    }

    create_speaker_object = async () => {
        const arrowSpriteSheet = new PIXI.Spritesheet(
            PIXI.Texture.from(selection_arrow_sprite_sheet_json.meta.image),
            selection_arrow_sprite_sheet_json
            );
            await arrowSpriteSheet.parse();
    
            const spritesheet = new PIXI.Spritesheet(
            PIXI.Texture.from(speaker_sprite_sheet_json.meta.image),
            speaker_sprite_sheet_json
            );
            await spritesheet.parse();
            
            this.speakerObject = new Speaker(spritesheet, 352, 395, this.app, arrowSpriteSheet, this.roomEntitiesContainer, this.speakerContainer, this.assets, this.setDisplaySpeakerMenu, this.setHideSpeakerMenu, this.soundsObject)
            this.speakerObject.init()
    }

    run = (delta) =>{

        // this.backgroundObject.display()
        // this.postersObject.display()
        // this.cablesObject.display()
        // this.windowObject.display()
        // this.tvStandObject.display()
        // this.bookshelfObject.display()
    
        // this.lavaLampObject.run(cycleCount, this.mouseX, this.mouseY)
    
        // this.bedObject.display()
        // this.coffeeCupObject.animate(cycleCount)
    
        // this.characterObject.run(cycleCount, this.mouseX, this.mouseY)
        // this.pcDeskObject.run(cycleCount, this.mouseX, this.mouseY)
        
        // ctx.fillStyle = 'White'
        // ctx.fillRect(canvas.width / 2 - HALF_WIDTH, canvas.height / 2 - HALF_HEIGHT, WIDTH, HEIGHT)
        
    }

}