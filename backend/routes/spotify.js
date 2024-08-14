const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    
    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
            'client_id': process.env.SPOTIFY_CLIENT_ID,
            'client_secret': process.env.SPOTIFY_CLIENT_SECRET,
            'scope': 'user-read-recently-played'
        })
    }

    const response = await fetch("https://accounts.spotify.com/api/token", options)
    const json = await response.json()
    const token = json.access_token
    console.log('spotify access token retrieved: ', token)

    const userDataResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    const userData = await userDataResponse.json()
    console.log(userData)
})

module.exports = router