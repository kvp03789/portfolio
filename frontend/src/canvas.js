import '../styles/style.css'

const canvas = document.querySelector('canvas')
const WIDTH = 800
const HALF_WIDTH = WIDTH / 2
const HEIGHT = 600
const HALF_HEIGHT = HEIGHT / 2
const ctx = canvas.getContext('2d')

const containerDiv = document.querySelector(".container")
const overlayDiv = document.querySelector(".glass-overlay")
//FPS
const FPS = 60
const cycleDelay = Math.floor(1000 / FPS)
let oldCycleTime = 0
let cycleCount = 0
let fpsRate = 'calculating...'

let clickX = false
let clickY = false
let mouseX = 0
let mouseY = 0



window.onload = async function() {
    //fetching discord online status
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         "Content-Type": "application/json",
    //       },
    //     mode: "cors", 
    // }
    // const response = await fetch('http://localhost:3000/status', options) 
    // const json = await response.json()
    // console.log(json)

    // const roomSceneObject = new RoomScene()
    const mainScene = new MetaScene()

    //hover event
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect()
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
    })

    // click event //
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect()
        clickX = e.clientX - rect.left;
        clickY = e.clientY - rect.top;
        const pcDeskObject = mainScene.roomScene.pcDeskObject
        let pcDeskObjectClickedX = clickX > pcDeskObject.x_pos && clickX <= pcDeskObject.x_pos + pcDeskObject.frameWidth
        let pcDeskObjectClickedY = clickY > pcDeskObject.y_pos && clickY <= pcDeskObject.y_pos + pcDeskObject.frameHeight
        if(pcDeskObjectClickedX && pcDeskObjectClickedY){
            pcDeskObject.handleClick()
        clickX = false
        clickY = false
    }}, false)

    //overlay click event
    overlayDiv.addEventListener('click', (e) => {
        overlayDiv.classList.add("hidden")
        console.log(e.target)
    })
    

    requestAnimationFrame(mainScene.mainLoop)
};

class SelectionArrow{
    constructor(x_pos, y_pos){
        this.image = new Image()
        this.src = '../img/sprite_sheets/selection_arrow_sprite_sheet.png'
        this.init()
        this.numberOfFrames = 12
        this.frameWidth = this.image.naturalWidth / this.numberOfFrames
        this.frameHeight = this.image.naturalHeight
        this.currentFrame = 0
        this.x_pos = x_pos
        this.y_pos = y_pos - 70
    }

    init(){
        this.image.src = this.src
    }

    animate(cycleCount){
        //draw current frame
        ctx.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x_pos, this.y_pos, this.frameWidth, this.frameHeight)

        //logic for animating the image
        if (this.currentFrame >= this.numberOfFrames - 1){
            this.currentFrame = 0
        } else{
            if(cycleCount % 3 == 0){
                this.currentFrame++
            }
        }
    }
}


class StaticRoomObject{
    constructor(src, x_pos, y_pos){
        this.image = new Image()
        this.src = src
        this.x_pos = x_pos
        this.y_pos = y_pos

        this.init()
    }

    init(){
        this.image.src = this.src
    }

    display(){
        ctx.drawImage(this.image, this.x_pos, this.y_pos)
    }
}

class Background extends StaticRoomObject {
    constructor(src, x_pos, y_pos){
        super(src, x_pos, y_pos)

        this.init()
    }  

}

class Posters extends StaticRoomObject{
    constructor(src, x_pos, y_pos){
        super(src, x_pos, y_pos)
    } 
}

class WindowFrame extends StaticRoomObject{
    constructor(src, x_pos, y_pos){
        super(src, x_pos, y_pos)
    }   
}

class TV_Stand extends StaticRoomObject{
    constructor(src, x_pos, y_pos){
        super(src, x_pos, y_pos)
    }   
}

class Cables extends StaticRoomObject{
    constructor(src, x_pos, y_pos){
        super(src, x_pos, y_pos)
    }   
}


class Bed extends StaticRoomObject{
    constructor(src, x_pos, y_pos){
        super(src, x_pos, y_pos)
    }   
}

class BookShelf extends StaticRoomObject{
    constructor(src, x_pos, y_pos){
        super(src, x_pos, y_pos)
    }   
}


class AnimatedRoomObject{
    constructor(src,  x_pos, y_pos){
        this.image = new Image()
        this.src = src
        this.x_pos = x_pos
        this.y_pos = y_pos
    }

    init(){
        this.image.src = this.src
        this.numberOfFrames = this.image.naturalWidth / this.frameWidth
    }
}

class LavaLamp extends AnimatedRoomObject {
    constructor(src, x_pos, y_pos){
        super(src,  x_pos, y_pos)
        this.frameWidth = 125,
        this.frameHeight = 128,
        this.numberOfFrames = 0,
        this.currentFrame = 0
        this.x_pos = x_pos
        this.y_pos = y_pos

        this.init()
    }
    
    animate(cycleCount){ 
        //highlight on mouse over
        if (this.mouseOver == true){
            this.selectionArrow.animate(cycleCount)
            this.shadowBlur > 70 ? this.shadowBlur = 10 : this.shadowBlur++
            ctx.shadowBlur = this.shadowBlur / 2; 
            ctx.shadowColor = "white"; 
            ctx.shadowOffsetX = 0; 
            ctx.shadowOffsetY = 0; 
            ctx.fillRect(this.x_pos, this.y_pos, this.frameWidth, this.frameHeight);
            ctx.shadowBlur = 0;  
        }
        ctx.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x_pos, this.y_pos, this.frameWidth, this.frameHeight)
        if (this.currentFrame >= this.numberOfFrames - 1){
            this.currentFrame = 0
        } else{
            if(cycleCount % 6 == 0){
                this.currentFrame++
            }
        }
    }

    run(cycleCount, mouseX, mouseY){
        this.handleMouseOver()
        this.animate(cycleCount)
    }

    handleClick(){
        console.log("desk clicked!!!")
        overlayDiv.classList.remove("hidden")
    }
}

class Character extends AnimatedRoomObject{
    constructor(src, x_pos, y_pos){
        super(src, x_pos, y_pos)
        this.frameWidth = 187
        this.frameHeight = 157
        this.numberOfFrames = 0
        this.currentFrame = 0
        this.glowImage = this.image.clone
        console.log(this.imageData)
        
        //for mouseover
        this.mouseOver = false
        this.shadowBlur = 10
        this.selectionArrow = new SelectionArrow((this.x_pos + this.frameWidth / 2) - 25, this.y_pos)


        this.init()
    }

    handleMouseOver = () => {
        let mouseIsCollidingX = mouseX > this.x_pos && mouseX <= this.x_pos + this.frameWidth
        let mouseIsCollidingY = mouseY > this.y_pos && mouseY <= this.y_pos + this.frameHeight
        
        if(mouseIsCollidingX && mouseIsCollidingY){
            this.mouseOver = true
            document.documentElement.style.cursor = 'pointer'
        }   
        else {
            this.mouseOver = false
            document.documentElement.style.cursor = 'default'
        } 
    }

    animate(cycleCount){
        //highlight on mouse over
        if (this.mouseOver == true){
            this.selectionArrow.animate(cycleCount)
            this.shadowBlur > 70 ? this.shadowBlur = 10 : this.shadowBlur++
            ctx.shadowBlur = this.shadowBlur / 2; 
            ctx.shadowColor = "white"; 
            ctx.shadowOffsetX = 0; 
            ctx.shadowOffsetY = 0; 
            ctx.fillRect(this.x_pos, this.y_pos, this.frameWidth, this.frameHeight);
            ctx.shadowBlur = 0;  
        }
        //draw image at current frame
        ctx.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x_pos, this.y_pos, this.frameWidth, this.frameHeight)
        if (this.currentFrame >= this.numberOfFrames - 1){
            this.currentFrame = 0
        } else{
            if(cycleCount % 6 == 0){
                this.currentFrame++
            }
        }
    }

    run = (cycleCount) => {
        this.animate(cycleCount)
        this.handleMouseOver()
    }
}


class PC_Desk extends AnimatedRoomObject {
    constructor(src, x_pos, y_pos, numberOfFrames){
        super(src, x_pos, y_pos, numberOfFrames)
        this.frameWidth = 163
        this.frameHeight = 125
        this.numberOfFrames = 0
        this.currentFrame = 0

        this.clicked = false
        
        //for mouseover
        this.mouseOver = false
        this.shadowBlur = 10
        this.selectionArrow = new SelectionArrow((this.x_pos + this.frameWidth / 2) - 25, this.y_pos)

        this.init()
    }

    animate(cycleCount){
        //highlight on mouse over
        if (this.mouseOver == true){
            this.selectionArrow.animate(cycleCount)
            this.shadowBlur > 70 ? this.shadowBlur = 10 : this.shadowBlur++
            ctx.shadowBlur = this.shadowBlur / 2; 
            ctx.shadowColor = "white"; 
            ctx.shadowOffsetX = 0; 
            ctx.shadowOffsetY = 0; 
            ctx.fillRect(this.x_pos, this.y_pos, this.frameWidth, this.frameHeight);
            ctx.shadowBlur = 0;  
        }
        
        //draw current frame
        ctx.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x_pos, this.y_pos, this.frameWidth, this.frameHeight)

        //logic for animating the image
        if (this.currentFrame >= this.numberOfFrames - 1){
            this.currentFrame = 0
        } else{
            if(cycleCount % 6 == 0){
                this.currentFrame++
            }
        }  
    }

    handleMouseOver(){
        let mouseIsCollidingX = mouseX > this.x_pos && mouseX <= this.x_pos + this.frameWidth
        let mouseIsCollidingY = mouseY > this.y_pos && mouseY <= this.y_pos + this.frameHeight
        
        if(mouseIsCollidingX && mouseIsCollidingY){
            this.mouseOver = true
            document.documentElement.style.cursor = 'pointer'
        }   
        else {
            this.mouseOver = false
            document.documentElement.style.cursor = 'default'
        } 
    }

    handleClick(){
        console.log("desk clicked!!!")
        overlayDiv.classList.remove("hidden")
    }

    run = (cycleCount) => {
        this.animate(cycleCount)
        this.handleMouseOver()
    }
}

class Coffee_Cup extends AnimatedRoomObject {
    constructor(src, x_pos, y_pos){
        super(src, x_pos, y_pos)
        this.frameWidth = 44,
        this.frameHeight = 61,
        this.numberOfFrames = 0,
        this.currentFrame = 0
        this.x_pos = x_pos
        this.y_pos = y_pos

        this.init()
    }

    animate(cycleCount){
        ctx.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x_pos, this.y_pos, this.frameWidth, this.frameHeight)
        if (this.currentFrame >= this.numberOfFrames - 1){
            this.currentFrame = 0
        } else{
            if(cycleCount % 10 == 0){
                this.currentFrame++
            }
        }
    }
}

class RoomScene{
    constructor(set_state){
        this.set_state = set_state

        this.clicking = false
        this.clickCooldown = 1000
        this.mouseDown = false
        
        this.lavaLampObject = new LavaLamp('../img/sprite_sheets/lava_lamp_sprite_sheet.png', 520, 265)
        this.characterObject = new Character('../img/sprite_sheets/character_sprite_sheet.png', 70, 300)
        this.pcDeskObject = new PC_Desk2('../img/sprite_sheets/desk_sprite_sheet2.png', 420, 220, 25)
        this.coffeeCupObject = new Coffee_Cup('../img/sprite_sheets/coffee_sprite_sheet.png', 250, 350)

        this.backgroundObject = new Background('../img/png/background.png', 0, 0)
        this.postersObject = new Posters('../img/png/posters.png', 0, 0)
        this.windowObject = new WindowFrame('../img/png/window.png', 0, 0)
        this.cablesObject = new Cables('../img/png/cables.png', 0, 0)
        this.tvStandObject = new TV_Stand('../img/png/tv_stand.png', 0, 0)
        this.bedObject = new Bed('../img/png/bed.png', 0, 0)
        this.bookshelfObject = new BookShelf('../img/png/book_shelf.png', 0, 0)
        console.log(this.pcDeskObject.image.numberOfFrames)
        
        /// click event ///
        canvas.addEventListener('mousedown', () => {
            this.mouseDown = true   
        })
        canvas.addEventListener('mouseup', () => {
            this.mouseDown = false
        })
    }

    run = (startTime) =>{
        // console.log(clickX, clickY)

        //maintain canvas fullscreen
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        //click cooldown timer
        
    
        cycleCount++
        if(cycleCount >= 60) cycleCount = 0
        let cycleTime = startTime - oldCycleTime
        oldCycleTime = startTime
        if(cycleCount % 60 == 0) fpsRate = Math.floor(1000 / cycleTime)
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        ctx.fillStyle = 'Black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    
        this.backgroundObject.display()
        this.postersObject.display()
        this.cablesObject.display()
        this.windowObject.display()
        this.tvStandObject.display()
        this.bookshelfObject.display()
    
        this.lavaLampObject.animate(cycleCount)
    
        this.bedObject.display()
        this.coffeeCupObject.animate(cycleCount)
    
        this.characterObject.run(cycleCount)
        this.pcDeskObject.run(cycleCount)
        
        // ctx.fillStyle = 'White'
        // ctx.fillRect(canvas.width / 2 - HALF_WIDTH, canvas.height / 2 - HALF_HEIGHT, WIDTH, HEIGHT)
        
        //render FPS to screen
        ctx.fillStyle = 'White'
        ctx.font = '16px Monospace'
        ctx.fillText(`FPS rate: ${fpsRate}`, 0, 20)
    }

}

class DesktopScene{
    constructor(){

    }
}

class MetaScene{
    constructor(){
        this.stateManager = new StateManager('room_scene')
        this.currentState = this.stateManager.currentState

        this.roomScene = new RoomScene(this.set_state)
        this.desktopScene = new DesktopScene()

        this.statesObject = {
            room_scene: this.roomScene,
            desktop_scene: this.desktopScene
        }
    }

    mainLoop = () => {
        // this.roomScene.run()
        this.statesObject[this.currentState].run()

        requestAnimationFrame(this.mainLoop)
    }
}

class StateManager{
    constructor(currentState){
        this.currentState = currentState
        this.previousState = currentState
    }
    set_state = (new_state) => {
        this.previousState = this.currentState
        this.currentState = new_state
        console.log(this.currentState)
        }

    get_state = () => {return this.currentState}
        
}








