import { Assets, Application, Sprite} from 'pixi.js'
import { roomSceneManifest } from './image_imports.js'

    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', width: 800, height: 600 });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);
    await Assets.init({manifest: roomSceneManifest})
    const assets = await Assets.loadBundle('png');
    
    const texture = await Assets.load('CharacterImg');
    
    const characterSprite = new Sprite(texture);

    // Center the sprite's anchor point
    characterSprite.anchor.set(0.5);

    // Move the sprite to the center of the screen
    characterSprite.x = app.screen.width / 2;
    characterSprite.y = app.screen.height / 2;
    console.log(characterSprite)

    app.stage.addChild(characterSprite);






