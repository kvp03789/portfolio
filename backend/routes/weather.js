const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    console.log('getting weather key...')
    let key = process.env.OPEN_WEATHER_KEY
    let lat = 33.831291
    let lon = -87.278702

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPEN_WEATHER_KEY}`)
    const json = await response.json()
    console.log(json)
    let temp = json.main.temp
    let desc = json.weather[0].description
    let iconURL = `https://openweathermap.org/img/wn/${json.weather.icon}@2x.png`
    let code = json.weather[0].icon
    res.json({ temp, desc, iconURL, code })
})

module.exports = router