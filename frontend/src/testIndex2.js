import * as PIXI from 'pixi.js'
// import { roomSceneManifest } from './image_imports.js'
import Character from './img/png/character.png'


// const app = new PIXI.Application();

// await app.init({ background: '#1099bb', width: 800, height: 600 });
// document.body.appendChild(app.canvas);

// await PIXI.Assets.init({manifest: roomSceneManifest})
// const assets = await PIXI.Assets.loadBundle('png');

// // const texture = await PIXI.Assets.load(Character);




// const characterSprite = new PIXI.Sprite(assets.BackgroundImg);
// console.log(assets)

// app.stage.addChild(characterSprite);

// characterSprite.anchor.set(0.5)

// characterSprite.x = app.screen.width / 2
// characterSprite.y = app.screen.height / 2
// console.log(characterSprite.x, characterSprite.y)


// Create the application helper and add its render target to the page
const app = new PIXI.Application();
await app.init({ width: 640, height: 360 })
document.body.appendChild(app.canvas);

// Create the sprite and add it to the stage
await PIXI.Assets.load(Character);
let sprite = PIXI.Sprite.from(Character);
app.stage.addChild(sprite);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;
  sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
});