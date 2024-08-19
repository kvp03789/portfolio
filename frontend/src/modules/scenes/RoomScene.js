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
    rain_sprite_sheet} from '../../json/desk_spritesheet'
import Plant from '../objects/Plant'
import DesktopBackground from '../objects/DesktopBackground'
import { CRTFilter, PixelateFilter } from 'pixi-filters'
import MyComputerIcon from '../icons/MyComputerIcon'
import AboutMeIcon from '../icons/AboutMeIcon'
import ProjectsIcon from '../icons/ProjectsIcon'
import PowerIcon from '../icons/PowerIcon'
import Ball from '../objects/Ball'
import OutsideWindow from '../objects/OutsideWindow'

export default class RoomScene{
    constructor(app, set_state, assets, sprite_sheets, onlineStatus, icons, weatherJson, weatherIcons, lastPlayedJson){
        this.app = app
        this.set_state = set_state

        this.assets = assets
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
        this.isOnline = true

        this.displayDesktop = false
        this.isDesktopDisplaying = false

        this.lastPlayedJson = lastPlayedJson
    }


    initializeAssets = async () => {
        this.roomEntitiesContainer = new PIXI.Container()
        await this.initializeDesktopAssets()
        
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
        
        this.soccerBall = new Ball(this.assets.SoccerBall, 100, 0, this.app, this.roomEntitiesContainer)
        
        await this.create_coffee_cup_animated_object()
        
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