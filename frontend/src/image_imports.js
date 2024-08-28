import * as PIXI from 'pixi.js'
//png images
import BackgroundImg from './img/png/background.png'
import SoccerBall from './img/png/ball_dark.png'
import BedImg from './img/png/bed.png'
import BookShelfImg from './img/png/book_shelf.png'
import BoxFanImg from './img/png/box_fan.png'
import CablesImg from './img/png/cables.png'
import CharacterImg from './img/png/character.png'
import LavaLampOff from './img/png/lava_lamp_off.png'
import MonitorBackgroundImg from './img/png/monitor_background.png'
import NightstandLavaLampImg from './img/png/nightstand_lava_lamp.png'
import PCDeskImg from './img/png/pc_desk.png'
import Plant1Img from './img/png/plant_1.png'
import Plant2Img from './img/png/plant_2.png'
import PosterImg from './img/png/posters.png'
import TVStandImg from './img/png/tv_stand.png'
import WindowImg from './img/png/window.png'
import TestBG from './img/png/test_bg.png'
import TextMask from './img/png/text_mask.png'
import SpotifyPixel from './img/png/spotify_pixel.png'
import Speaker from './img/png/speaker.png'
import SpeakerMenuBackground from './img/png/speaker_menu_background.png'
import SpeakerMenuTracking from './img/png/speaker_menu_tracking.png'
import SpeakerMenuVolume from './img/png/speaker_menu_volume.png'
import SpeakerMenuClose from './img/png/speaker_menu_close.png'
import SpeakerMenuPlay from './img/png/speaker_menu_play.png'
import SpeakerMenuPause from './img/png/speaker_menu_pause.png'
import SpeakerMenuStop from './img/png/speaker_menu_stop.png'
import SpeakerMenuNext from './img/png/speaker_menu_next.png'
import SpeakerMenuPrevious from './img/png/speaker_menu_previous.png'
import TVBackground from './img/png/tv_background.png'
import TVGlare from './img/png/tv_glare.png'
import TVBackgroundLandscape from './img/png/tv_background_landscape.png'

//icons
import MyComputerIcon from './img/png/icons/my_computer_icon.png'
import AboutMeIcon from './img/png/icons/about_me_icon.png'
import ProjectsIcon from './img/png/icons/projects_icon.png'
import PowerIcon from './img/png/icons/power_icon.png'
import XButton from './img/png/icons/x_button.png'
import XButtonRed from './img/png/icons/x_button_red.png'

//sprite sheets
import CharacterSpriteSheet from './img/sprite_sheets/character_sprite_sheet.png'
import CharacterOfflineSpriteSheet from './img/sprite_sheets/character_offline_sprite_sheet.png'
import CoffeeSpriteSheet from './img/sprite_sheets/coffee_sprite_sheet.png'
import DeskSpriteSheet from './img/sprite_sheets/desk_sprite_sheet.png'
import DeskSpriteSheet2 from './img/sprite_sheets/desk_sprite_sheet2.png'
import LavaLampSpriteSheet from './img/sprite_sheets/lava_lamp_sprite_sheet.png'
import OnlineSpriteSheet from './img/sprite_sheets/online_sprite_sheet.png'
import SelectionArrowSpriteSheet from './img/sprite_sheets/selection_arrow_sprite_sheet.png'
import TVStandSpriteSheet from './img/sprite_sheets/tv_stand_sprite_sheet.png'
import PixelRainSpriteSheet from './img/sprite_sheets/rain_sprite_sheet.png'
import SpeakerSpriteSheet from './img/sprite_sheets/speaker_sprite_sheet.png'

//weather icons
import DayClear from './img/png/weather_icons/day/clear.png'
import DayCloudy from './img/png/weather_icons/day/cloudy.png'
import DayFullCloudy from './img/png/weather_icons/day/full_cloudy.png'
import DayRain from './img/png/weather_icons/day/rain.png'
import NightClear from './img/png/weather_icons/night/clear.png'
import NightCloudy from './img/png/weather_icons/night/cloudy.png'
import NightRain from './img/png/weather_icons/night/rain.png'
import NightStorm from './img/png/weather_icons/night/storm.png'
import NightMist from './img/png/weather_icons/night/mist.png'
//sound
import FourAmNostalgia from './sounds/4am nostalgia.mp3'
import ElevenAmLight from './sounds/11am.mp3'
import FourPmRain from './sounds/4pm rain.mp3'
import RoomNoise from './sounds/room_noise.mp3'
import Rain from './sounds/rain.mp3'

export const roomSceneManifest =  {
   "bundles":[
      {
         "name":"png",
         "assets":[
            {
               "alias":"BackgroundImg",
               "src":BackgroundImg
            },
            {
               "alias":"SoccerBall",
               "src":SoccerBall  
            },
            {
               "alias":"BedImg",
               "src":BedImg
            },
            {
               "alias":"BookShelfImg",
               "src":BookShelfImg
            },
            {
               "alias":"BoxFanImg",
               "src":BoxFanImg
            },
            {
               "alias":"CablesImg",
               "src":CablesImg
            },
            {
               "alias":"CharacterImg",
               "src":CharacterImg
            }, 
            {
               "alias":"LavaLampOff",
               "src":LavaLampOff
            }, 
            {
               "alias": "MonitorBackgroundImg",
               "src": MonitorBackgroundImg
            },
            {
               "alias": "NightstandLavaLampImg",
               "src": NightstandLavaLampImg
            },
            {
               "alias": "PCDeskImg",
               "src": PCDeskImg
            },
            {
               "alias": "Plant1Img",
               "src": Plant1Img
            },
            {
               "alias": "Plant2Img",
               "src": Plant2Img
            },
            {
               "alias": "PosterImg",
               "src": PosterImg
            },
            {
               "alias": "TVStandImg",
               "src": TVStandImg
            },
            {
               "alias": "WindowImg",
               "src": WindowImg
            },
            {
               "alias": "TestBG",
               "src": TestBG
            },
            {
               "alias": "TextMask",
               "src": TextMask
            },
            {
               "alias": "SpotifyPixel",
               "src": SpotifyPixel
            },
            {
               "alias": "TVBackground",
               "src": TVBackground
            },
            {
               "alias": "TVGlare",
               "src": TVGlare
            },
            {
               "alias": "TVBackgroundLandscape",
               "src": TVBackgroundLandscape
            },
            {
               "alias": "Speaker",
               "src": Speaker
            },
            {
               "alias": "SpeakerMenuBackground",
               "src": SpeakerMenuBackground
            },
            {
               "alias": "SpeakerMenuTracking",
               "src": SpeakerMenuTracking
            },
            {
               "alias": "SpeakerMenuVolume",
               "src": SpeakerMenuVolume
            },
            {
               "alias": "SpeakerMenuClose",
               "src": SpeakerMenuClose
            },
            {
               "alias": "SpeakerMenuPlay",
               "src": SpeakerMenuPlay
            },
            {
               "alias": "SpeakerMenuPause",
               "src": SpeakerMenuPause
            },
            {
               "alias": "SpeakerMenuStop",
               "src": SpeakerMenuStop
            },
            {
               "alias": "SpeakerMenuNext",
               "src": SpeakerMenuNext
            },
            {
               "alias": "SpeakerMenuPrevious",
               "src": SpeakerMenuPrevious
            },
         ]
      },
      {
         "name":"sprite_sheets",
         "assets":[
            {
               "alias":"LavaLampSpriteSheet",
               "src":LavaLampSpriteSheet
            },
            {
               "alias":"DeskSpriteSheet2",
               "src":DeskSpriteSheet2
            },
            {
               "alias":"CharacterSpriteSheet",
               "src":CharacterSpriteSheet
            },
            {
               "alias":"DeskSpriteSheet2",
               "src":DeskSpriteSheet2
            },
            {
               "alias":"CoffeeSpriteSheet",
               "src":CoffeeSpriteSheet
            },
            {
               "alias":"SelectionArrowSpriteSheet",
               "src":SelectionArrowSpriteSheet
            },
            {
               "alias":"OnlineSpriteSheet",
               "src":OnlineSpriteSheet
            },
            {
               "alias":"CharacterOfflineSpriteSheet",
               "src":CharacterOfflineSpriteSheet
            },
            {
               "alias":"TVStandSpriteSheet",
               "src":TVStandSpriteSheet
            },
            {
               "alias": "PixelRainSpriteSheet",
               "src": PixelRainSpriteSheet
            },
            {
               "alias": "SpeakerSpriteSheet",
               "src": SpeakerSpriteSheet
            },
         ]
      },
      {
         "name":"icons",
         "assets":[
            {
               "alias":"MyComputerIcon",
               "src":MyComputerIcon
            },
            {
               "alias":"AboutMeIcon",
               "src": AboutMeIcon
            },
            {
               "alias":"ProjectsIcon",
               "src": ProjectsIcon
            },
            {
               "alias":"PowerIcon",
               "src": PowerIcon
            },
            {
               "alias":"XButton",
               "src": XButton
            },
            {
               "alias":"XButtonRed",
               "src": XButtonRed
            }
         ]
      },
      {
         "name":"weather_icons",
         "assets":[
            {
               "alias":"DayClear",
               "src":DayClear
            },
            {
               "alias":"DayCloudy",
               "src":DayCloudy
            },
            {
               "alias":"DayFullCloudy",
               "src":DayFullCloudy
            },
            {
               "alias":"DayRain",
               "src":DayRain
            },
            {
               "alias":"NightClear",
               "src":NightClear
            },
            {
               "alias":"NightCloudy",
               "src":NightCloudy
            },
            {
               "alias":"NightRain",
               "src":NightRain
            },
            {
               "alias":"NightStorm",
               "src":NightStorm
            },
            {
               "alias":"NightMist",
               "src":NightMist
            },
         ]
      },
      {
         "name": "sound",
         "assets": [
            {
               "alias":"FourAmNostalgia",
               "src":FourAmNostalgia
            },
            {
               "alias":"ElevenAmLight",
               "src":ElevenAmLight
            },
            {
               "alias":"FourPmRain",
               "src":FourPmRain
            },
            {
               "alias":"RoomNoise",
               "src":RoomNoise
            },
            {
               "alias":"Rain",
               "src":Rain
            },
         ]
      }
   ]
}



export const pngImages = {
    BackgroundImg: BackgroundImg, 
    BedImg: BedImg, 
    BookShelfImg: BookShelfImg, 
    BoxFanImg: BoxFanImg, 
    CablesImg: CablesImg, 
    CharacterImg: CharacterImg, 
    NightstandLavaLampImg: NightstandLavaLampImg, 
    PCDeskImg: PCDeskImg, 
    Plant1Img: Plant1Img, 
    Plant2Img: Plant2Img, 
    PosterImg: PosterImg,
    SpeakerMenuBackground: SpeakerMenuBackground,
    TVStandImg: TVStandImg, 
    WindowImg: WindowImg
}

export const spriteSheets = {
    CharacterSpriteSheet: CharacterSpriteSheet,
    CoffeeSpriteSheet: CoffeeSpriteSheet, 
    DeskSpriteSheet: DeskSpriteSheet, 
    DeskSpriteSheet2: DeskSpriteSheet2,
    LavaLampSpriteSheet: LavaLampSpriteSheet, 
    SelectionArrowSpriteSheet: SelectionArrowSpriteSheet,
    SpeakerSpriteSheet: SpeakerSpriteSheet
}


export function loadAssets(){
   console.log('loading assets....')
   PIXI.Assets.addBundle('png', {
      BackgroundImg: './img/png/background.png',
    });
} 