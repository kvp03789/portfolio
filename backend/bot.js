// const { Client, Intents } = require('discord.js');
// const dotenv = require('dotenv');

// dotenv.config();

// const intents = new Intents();
// intents.add(Intents.ALL);

// const client = new Client({ intents });

// client.on('ready', () => {
//     console.log(`status_bot logged in as ${client.user.tag} yaaay :3`);
// });

// client.on('message', async (message) => {
//     if (message.author.bot) return;

//     if (message.content.startsWith('$')) {
//         console.log('a command was sent');
//         await message.channel.send('Hello!');
//     }

//     if (message.content.startsWith('!status')) {
//         try {
//             const member = message.mentions.members.first() || message.member;
//             if (member) {
//                 const status = member.presence.status;
//                 await message.channel.send(`${member.displayName} is ${status}`);
//             } else {
//                 await message.channel.send('Member not found.');
//             }
//         } catch (error) {
//             console.error('Error fetching member status:', error);
//             await message.channel.send('Error fetching member status.');
//         }
//     }
// });

// client.login(process.env.BOT_TOKEN);
