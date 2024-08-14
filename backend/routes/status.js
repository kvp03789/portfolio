const express = require('express')
const router = express.Router()
const { Client, GatewayIntentBits, Events, EmbedBuilder, WebhookClient } = require('discord.js');



console.log('initializing bot...')
// const intents = new Intents();
// intents.add(Intents.ALL);
const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
]

const client = new Client({ intents });
client.login(process.env.BOT_TOKEN)

client.on('ready', async (readyClient) => {
    console.log(`status_bot logged in as ${readyClient.user.tag} yaaay :3`);
    const response = await fetch('https://discord.com/api/webhooks/1220860028437659789/VSBPENJMTkcqqG2Bk1XoBvR-ssc9xTVa1tXwE_yOVIkE7ZJ1CZof_YQ7H-B7hMW1Mine')
    const webhookJSON = await response.json()

    const guild = client.guilds.cache.get(`${process.env.GUILD_ID}`);
    const members = await guild.members.fetch()
    
    
    const webhookClient = new WebhookClient({ id: webhookJSON.id, token: webhookJSON.token });
    webhookClient.send({
        content: `!status <@${process.env.MY_USER_ID}>`,
        username: 'get_status'
    });
});

client.on('messageCreate', async (message) => {
    
        // if (message.author.bot) return;
    
        if (message.content.startsWith('$')) {
            console.log('a command was sent');
            await message.channel.send('Hello!');
        }
    
        if (message.content.startsWith('!status')) {
            try {
                let guild = client.guilds.cache.get(`${process.env.GUILD_ID}`);
                let member = guild.members.cache.get(`${process.env.MY_USER_ID}`);
                
                if (member && member.presence) {
                    let status = member.presence.status;
                    await message.channel.send(`${member.displayName} is ${status}`);
                    console.log('STATUS: ', status)
                    
                } else {
                    let status = 'offline'
                    await message.channel.send('Member not found.');
                    console.log('STATUS: ', status)
                }
            } catch (error) {
                console.error('Error fetching member status:', error);
                await message.channel.send('Error fetching member status.');
            }
        }
    });

router.get('/', async (req, res, next) => {
        console.log('request incoming...')
        let guild = client.guilds.cache.get(`${process.env.GUILD_ID}`);
        let member = guild.members.cache.get(`${process.env.MY_USER_ID}`);
                
        if (member && member.presence) {
            const isOnline = member.presence.status == 'online' ? true : false;
            res.json({isOnline});
            console.log(isOnline, 'askljdhfas')}
            
})

module.exports = router