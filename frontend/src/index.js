import './styles/style.css'
import DesktopScene from "./modules/scenes/DesktopScene"
import RoomScene from "./modules/scenes/RoomScene"
import StateManager from "./modules/base_classes/StateManager"
import { importAll } from "./utils.js"
import * as PIXI from 'pixi.js'
import { roomSceneManifest, loadAssets, pngImages } from './image_imports.js'
import * as TWEEN from "@tweenjs/tween.js"

const WIDTH = 800
const HEIGHT = 600

//FPS
const FPS = 60
const cycleDelay = Math.floor(1000 / FPS)
let oldCycleTime = 0
let cycleCount = 0
let fpsRate = 'calculating...'

let clickX = false
let clickY = false

let isOnline



// window.onload = async function() {
//     //fetching discord online status
//     const options = {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json"
//           },
//         mode: "cors", 
//     }
//     try{
//         const response = await fetch('http://localhost:3000/status', options) 
//         const json = await response.json()
//         console.log(json)
//         let isOnline = json.isOnline
//         const application = new Application()
//         await application.init(isOnline)
//     }
//     catch(e){
//         console.log(e)
//     }
// }

async function getWeather () {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
            },
        mode: "cors", 
    }
    let url = process.env.NODE_ENV == "development" ? 'http://localhost:3000/weather' : 'portfolio_backend.railway.internal/weather'
    const weather = await fetch(url)
    const json = await weather.json()
    console.log('weather json: ', json)
    return json
    // const APIKEY = await APIKEYRESPONSE.json() 
}

async function getSpotify(){
    let url = process.env.NODE_ENV == "development" ? 'http://localhost:3000/spotify' : 'portfolio_backend.railway.internal/spotify'
    await fetch(url)
}

window.onload = async () => {
    // const spotifyData = await getSpotify()
    const weatherJson = await getWeather()
    const application = new Application()
    await application.init(true, weatherJson)
}
    
    
    

    //hover event
    // canvas.addEventListener('mousemove', (e) => {
    //     const rect = canvas.getBoundingClientRect()
    //     mouseX = e.clientX - rect.left;
    //     mouseY = e.clientY - rect.top;
        
    // })

    // click event //
    // canvas.addEventListener('click', (e) => {
    //     const rect = canvas.getBoundingClientRect()
    //     clickX = e.clientX - rect.left;
    //     clickY = e.clientY - rect.top;
    //     const pcDeskObject = application.roomScene.pcDeskObject
    //     let pcDeskObjectClickedX = clickX > pcDeskObject.x_pos && clickX <= pcDeskObject.x_pos + pcDeskObject.frameWidth
    //     let pcDeskObjectClickedY = clickY > pcDeskObject.y_pos && clickY <= pcDeskObject.y_pos + pcDeskObject.frameHeight
    //     if(pcDeskObjectClickedX && pcDeskObjectClickedY){
    //         pcDeskObject.handleClick()
    //     clickX = false
    //     clickY = false
    // }}, false)

    // //overlay click event
    // overlayDiv.addEventListener('click', (e) => {
    //     overlayDiv.classList.add("hidden")
    //     console.log('hiding glass overlay...')
    // })
    

    // requestAnimationFrame(application.mainLoop)
    // app.ticker.add(application.mainLoop)
// };


export default class Application{
    constructor(){
        
        this.app = new PIXI.Application()
        this.ticker = PIXI.Ticker.shared
        //enable pixijs chrome dev tool
        globalThis.__PIXI_APP__ = this.app;

        
        
    }

    init = async (isOnline, weatherJson) => {
        try {
            await this.app.init({ width: 800, height: 600, preference:'webgl' });
            document.body.append(this.app.canvas)
            PIXI.Assets.init({manifest: roomSceneManifest})
            // PIXI.Assets.backgroundLoadBundle(['png', 'sprite_sheets']);
            // const assets = await PIXI.Assets.loadBundle('png');
            this.assets = await PIXI.Assets.loadBundle('png');
            this.sprite_sheets = await PIXI.Assets.loadBundle('sprite_sheets')
            this.icons = await PIXI.Assets.loadBundle('icons')
            this.weatherIcons = await PIXI.Assets.loadBundle('weather_icons')
            this.stateManager = new StateManager('room_scene')
            this.currentState = this.stateManager.currentState

            this.roomScene = new RoomScene(this.app, this.set_state, this.assets, this.sprite_sheets, isOnline, this.icons, weatherJson, this.weatherIcons)
            this.desktopScene = new DesktopScene(this.app, this.set_state, this.assets, this.sprite_sheets)

            this.statesObject = {
                room_scene: this.roomScene,
                desktop_scene: this.desktopScene
            }

            await this.statesObject[this.currentState].initializeAssets()
            
            this.ticker.add(delta => this.mainLoop(delta))
            
            // Access resources here
        } catch (error) {
            console.error("Error initializing assets:", error);
        }
    }

    mainLoop = (delta) => {
        TWEEN.update()
        //maintain canvas fullscreen
        // canvas.width = window.innerWidth
        // canvas.height = window.innerHeight

        // cycleCount++
        // if(cycleCount >= 60) cycleCount = 0
        // let cycleTime = startTime - oldCycleTime
        // oldCycleTime = startTime
        // if(cycleCount % 60 == 0) fpsRate = Math.floor(1000 / cycleTime)
        
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        // ctx.fillStyle = 'Black'
        // ctx.fillRect(0, 0, canvas.width, canvas.height)
        this.statesObject[this.currentState].run(delta)

        //render FPS to screen
        // ctx.fillStyle = 'White'
        // ctx.font = '16px Monospace'
        // ctx.fillText(`FPS rate: ${fpsRate}`, 0, 20)

        // requestAnimationFrame(this.mainLoop)
    }
}