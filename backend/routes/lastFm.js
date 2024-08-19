// const express = require('express')
// const router = express.Router()
// // require('dotenv').config()

// router.get('/', async (req, res, next) => {
//     console.log('fetching last fm data....')
//     // const lastPlayed = await getLastPlayedTrack()
//     // console.log('lastPlayed data: ', lastPlayed)
//     // res.json({ lastPlayed })
// })

// async function getLastPlayedTrack() {
//     const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=kvp0&api_key=${process.env.LAST_FM_API_KEY}&format=json&limit=1`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
        
//         if (data.recenttracks.track && data.recenttracks.track.length > 0) {
//             const track = data.recenttracks.track[0];
//             const artistName = track.artist['#text'];
//             const songTitle = track.name;
//             const playedAt = track.date ? track.date['#text'] : 'Now Playing';
//             const playedAgo = track.date ? getTimeAgo(new Date(track.date.uts * 1000)) : 'Currently Playing';

//             return { artistName, songTitle, playedAt, playedAgo };
//         } else {
//             return { artistName: '', songTitle: '', playedAt: '', playedAgo: 'No recent tracks found' };
//         }
//     } catch (error) {
//         console.error('Error fetching track data:', error);
//         return null;
//     }
// }

// function getTimeAgo(date) {
//     const seconds = Math.floor((new Date() - date) / 1000);
//     let interval = Math.floor(seconds / 31536000);

//     if (interval > 1) return interval + " years ago";
//     interval = Math.floor(seconds / 2592000);
//     if (interval > 1) return interval + " months ago";
//     interval = Math.floor(seconds / 86400);
//     if (interval > 1) return interval + " days ago";
//     interval = Math.floor(seconds / 3600);
//     if (interval > 1) return interval + " hours ago";
//     interval = Math.floor(seconds / 60);
//     if (interval > 1) return interval + " minutes ago";
//     return Math.floor(seconds) + " seconds ago";
// }

// // // Example usage
// // getLastPlayedTrack().then(track => {
// //     if (track) {
// //         console.log(`Artist: ${track.artistName}`);
// //         console.log(`Song: ${track.songTitle}`);
// //         console.log(`Played At: ${track.playedAt}`);
// //         console.log(`Played Ago: ${track.playedAgo}`);
// //     }
// // });

// module.exports = router