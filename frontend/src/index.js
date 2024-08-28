import './styles/style.css'
import DesktopScene from "./modules/scenes/DesktopScene"
import RoomScene from "./modules/scenes/RoomScene"
import StateManager from "./modules/base_classes/StateManager"
import { importAll } from "./utils.js"
import * as PIXI from 'pixi.js'
import { roomSceneManifest, loadAssets, pngImages } from './image_imports.js'
import * as TWEEN from "@tweenjs/tween.js"
import PixelLoveIcon from './img/icons/love.png'
import PixelWindowIcon from './img/icons/heart_window.png'
import PixelMusicIcon from './img/icons/music.png'
import getLastPlayedTrack from '../../backend/routes/lastFm.js'
import RoomSound from './sounds/4am nostalgia.mp3';
import './westieCursor.js'


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
    console.log('fetching weather data...')
    console.log('DEBUG: NODE_ENV is:', process.env.NODE_ENV)
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

async function awaitGetLastFm(){
    console.log('fetching lastfm data...')
    let url = process.env.NODE_ENV == "development" ? 'http://localhost:3000/lastfm' : 'portfolio_backend.railway.internal/lastfm'
    const response = await fetch(url)
    const json = await response.json()
    console.log('last fm data fetched successfully! ', json.lastPlayed)
    const returnedJson = json.lastPlayed
    return returnedJson
}

async function getTweet(){
    let url = process.env.NODE_ENV == "development" ? 'http://localhost:3000/twitter' : 'portfolio_backend.railway.internal/twitter'
    const mostRecentTweet = await fetch(url)
    const json = await mostRecentTweet.json()
    console.log('tweet json: ', json)
    return json
}

function createAudio(){

    // Create an audio element
    const audio = new Audio(RoomSound);
    
    // Autoplay the audio
    audio.autoplay = true;
    audio.loop = true; // Optional: Loop the audio
    
    // Append audio element to the body
    document.body.appendChild(audio);
    console.log('audio set up!', audio.src)
}

window.onload = async () => {
    
    const lastPlayedJson = await awaitGetLastFm()
    const weatherJson = await getWeather()
    // const tweet = await getTweet()

    const aboutWindow= new AboutWindow()
    const twitterWindow = new TwitterStatusWindow()
    const musicWindow = new LastPlayedWindow()
    const mainOutsideContainer = document.createElement('div')
    mainOutsideContainer.classList.add("main-outside-container")
    document.body.append(mainOutsideContainer)
    aboutWindow.init()
    twitterWindow.init()
    musicWindow.init(lastPlayedJson)
    createAudio()
    const application = new Application()
    await application.init(true, weatherJson, lastPlayedJson)

    
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

class AboutWindow{
    constructor(){
        this.icon = new Image()
        this.icon.src = PixelLoveIcon
        this.containerDiv = document.createElement('div')
        this.titleContainerDiv = document.createElement('div')
        this.title = document.createElement('h3')
        this.bodyContainerDiv = document.createElement('div')
        this.bodyParagraph = document.createElement('p')
    }

    init(){
        this.icon.classList.add("small-icon")
        this.titleContainerDiv.classList.add("about-title-container-div")
        this.containerDiv.classList.add("about-container", "section-container")
        this.title.classList.add("about-title", "section-title")
        this.bodyContainerDiv.classList.add("about-body-container-div")
        this.bodyParagraph.classList.add("about-body-paragraph")

        this.title.textContent = "Welcome to kvp0.dev!"
        this.bodyParagraph.textContent = "hi im kvp0 and welcome to my cozy web den ^-^ it's still very \
        much a work in progress so keep coming back and checking on things!\
        i'll have more stuff in my room as time goes on :3\
        in the meantime explore around"
        
        this.titleContainerDiv.append(this.icon, this.title)
        this.bodyContainerDiv.append(this.bodyParagraph)
        this.containerDiv.append(this.titleContainerDiv, this.bodyContainerDiv)
        document.querySelector(".main-outside-container").append(this.containerDiv)
    }
}

class TwitterStatusWindow{
    constructor(){
        this.icon = new Image()
        this.icon.src = PixelWindowIcon
        this.containerDiv = document.createElement('div')
        this.titleContainerDiv = document.createElement('div')
        this.title = document.createElement('h3')
        this.bodyContainerDiv = document.createElement('div')
        this.bodyParagraph = document.createElement('p')
    }

    init(){
        this.icon.classList.add("small-icon")
        this.titleContainerDiv.classList.add("status-title-container-div")
        this.containerDiv.classList.add("status-container", "section-container")
        this.title.classList.add("status-title", "section-title")
        this.bodyContainerDiv.classList.add("status-body-container-div")
        this.bodyParagraph.classList.add("status-body-paragraph")

        this.title.textContent = "current status"
        this.bodyParagraph.textContent = "ummm i'm just coding n stuff"
        
        this.titleContainerDiv.append(this.icon, this.title)
        this.bodyContainerDiv.append(this.bodyParagraph)
        this.containerDiv.append(this.titleContainerDiv, this.bodyContainerDiv)
        document.querySelector(".main-outside-container").append(this.containerDiv)
    }
}

class LastPlayedWindow{
    constructor(){
        this.icon = new Image()
        this.icon.src = PixelMusicIcon
        this.trackIcon = new Image()
        this.containerDiv = document.createElement('div')
        this.titleContainerDiv = document.createElement('div')
        this.title = document.createElement('h3')
        this.bodyContainerDiv = document.createElement('div')
        this.bodyParagraph = document.createElement('h5')
        this.bodyParagraphAgo = document.createElement('h5')
    }

    init(lastPlayed){
        this.icon.classList.add("small-icon")
        this.trackIcon.classList.add("small-icon", "track-icon")
        this.titleContainerDiv.classList.add("music-title-container-div")
        this.containerDiv.classList.add("music-container", "section-container")
        this.title.classList.add("music-title", "section-title")
        this.bodyContainerDiv.classList.add("music-body-container-div")
        this.bodyParagraph.classList.add("music-body-paragraph")
        this.bodyParagraphAgo.classList.add("music-body-paragraph")

        this.title.textContent = "last song"
        this.bodyParagraph.textContent = `${lastPlayed.artistName} - ${lastPlayed.songTitle}`
        this.bodyParagraphAgo.textContent = `${lastPlayed.playedAgo}`

        // document.querySelector(".track-icon").src = lastPlayed.imageUrl
        
        this.titleContainerDiv.append(this.icon, this.trackIcon, this.title)
        this.bodyContainerDiv.append(this.bodyParagraph, this.bodyParagraphAgo)
        this.containerDiv.append(this.titleContainerDiv, this.bodyContainerDiv)
        document.querySelector(".main-outside-container").append(this.containerDiv)
    }
}


export default class Application{
    constructor(){
        
        this.app = new PIXI.Application()
        this.ticker = PIXI.Ticker.shared
        //enable pixijs chrome dev tool
        globalThis.__PIXI_APP__ = this.app;

        
        
    }

    init = async (isOnline, weatherJson, lastPlayedJson) => {
        try {
            await this.app.init({ width: 800, height: 600, preference:'webgl' });
            document.body.append(this.app.canvas)
            PIXI.Assets.init({manifest: roomSceneManifest})
            // PIXI.Assets.backgroundLoadBundle(['png', 'sprite_sheets']);
            // const assets = await PIXI.Assets.loadBundle('png');
            this.assets = await PIXI.Assets.loadBundle('png');
            this.songsObject = await PIXI.Assets.loadBundle('sound');
            this.sprite_sheets = await PIXI.Assets.loadBundle('sprite_sheets')
            this.icons = await PIXI.Assets.loadBundle('icons')
            this.weatherIcons = await PIXI.Assets.loadBundle('weather_icons')
            this.stateManager = new StateManager('room_scene')
            this.currentState = this.stateManager.currentState

            this.roomScene = new RoomScene(this.app, this.set_state, this.assets, this.sprite_sheets, isOnline, this.icons, weatherJson, this.weatherIcons, lastPlayedJson, this.songsObject)
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