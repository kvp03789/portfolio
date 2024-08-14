import { Text, TextStyle, Container, Sprite, Texture } from "pixi.js";
import moment from "moment";
import { CRTFilter } from "pixi-filters";

export default class Screensaver{
    constructor(pngAssets, weatherJSON, weatherIcons){
        this.pngAssets = pngAssets
        this.weatherJSON = weatherJSON
        this.weatherIcons = weatherIcons

        this.currentTime = moment().format('LTS')
        

        this.container = new Container()

        this.background = new Sprite(this.pngAssets.TVBackgroundLandscape)
        this.background.x = 181
        this.background.y = 215
        this.background.label = 'background'

        this.glareForeground = new Sprite(this.pngAssets.TVGlare)
        this.glareForeground.x = 181
        this.glareForeground.y = 215
        this.glareForeground.label = 'foreground_glare'

        this.mask = new Sprite(Texture.WHITE);
        this.mask.label = 'mask'  
        this.mask.width = 140;
        this.mask.height = 60;
        this.mask.position.set(184, 220)

        this.style = new TextStyle({
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 'bold',
            fill: 'white',
            letterSpacing: .5,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        this.weatherStyle = new TextStyle({
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 'bold',
            fill: '#ebe6da',
            letterSpacing: .5,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        this.timeText = new Text({
            text: this.currentTime,
            style: this.style,
        });

        this.timeText.x = 240;
        this.timeText.y = 220;
        this.timeText.mask = this.mask

        this.weatherText = new Text({text: this.weatherJSON.desc, style: this.weatherStyle})
        this.weatherText.label = 'weather_text'
        this.weatherText.position.set(220, 245)

        this.tempText = new Text({text: `${Math.floor(this.weatherJSON.temp)}°`, style: this.weatherStyle})
        this.tempText.label = 'temp_text'
        this.tempText.position.set(230, 260)

        // this.load()
        console.log('A;SLDFA;LSJDHF;ALSDJKF;LAKSDJFL;ASKJ', this.currentWeatherIcon)
        this.container.filters = [new CRTFilter()]
        this.container.addChild(this.background, this.mask, this.timeText, this.weatherText, this.tempText, this.glareForeground )
        
    }

    animate = () => {
        this.timeText.text = moment().format('LTS')
    }

    load = () => {
        if(this.weatherJSON.code[2] == 'd'){  //check - is it day?
            console.log('day time image', this.weatherIcons, this.weatherJSON.desc)
            //day time images
            switch (this.weatherJSON.desc) {  
                case 'clear sky':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.DayClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'broken clouds':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.DayClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'few clouds':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.DayClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'scattered clouds':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.DayClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'shower rain':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.DayClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;
                
                case 'rain':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.DayClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'thunderstorm':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.DayClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'snow':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.DayClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'mist':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.DayClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;
                default:
                    console.log(`Sorry, we are out of.`);
            }
        }
        else{
            //night time images
            console.log('night time image', this.weatherIcons)
            switch (this.weatherJSON.desc) {  
                case 'clear sky':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'broken clouds':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'overcast clouds':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightCloudy);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break

                case 'few clouds':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightCloudy);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'scattered clouds':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightCloudy);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'shower rain':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightRain);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;
                
                case 'rain':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightRain);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'thunderstorm':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightStorm);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'snow':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightClear);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;

                case 'mist':
                    this.currentWeatherIcon = new Sprite(this.weatherIcons.NightMist);
                    this.currentWeatherIcon.label = 'current_weather_icon'
                    this.currentWeatherIcon.position.set(182, 246)
                    break;
                default:
                    console.log(`Sorry, we are out of .`);
            }
        } 
        this.currentWeatherIcon.scale.set(.15, .15)
        this.container.addChild(this.currentWeatherIcon)
    }

    
}