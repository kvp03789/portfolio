import discord
import os
from dotenv import load_dotenv

load_dotenv()

intents = discord.Intents.all()
intents.messages = True
intents.presences = True
intents.members = True
intents.message_content = True
client = discord.Client(intents=intents)


@client.event
async def on_ready():
    print("status_bot logged in as {0.user} yaaay :3".format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$'):
        print('a command was sent')
        await message.channel.send('Hello!')

    # if message.content.startswith('!status'):
    #     user_id = message.mentions[0].id if message.mentions else message.author.id
    #     print(f"requesting the userid {user_id}...")
    #     try:
    #         user = await client.fetch_user(user_id)
    #         print(f'user fetched: {user}', dir(user))
    #         status = user.status if user else 'user not found'
    #         await message.channel.send(f"{user.name}#{user.discriminator} is {status}")
    #     except Exception as e:
    #         print('Error fetching user presence:', e)
    #         await message.channel.send('Unable to fetch user presence')
    if message.author == client.user:
        return

    if message.content.startswith('!status'):
        try:
            if message.mentions:
                member = message.guild.get_member(message.mentions[0].id)
            else:
                member = message.guild.get_member(message.author.id)

            if member:
                status = member.status
                await message.channel.send(f"{member.name} is {status}")
            else:
                await message.channel.send('Member not found.')
        except Exception as e:
            print('Error fetching member status:', e)
            await message.channel.send('Error fetching member status.')

client.run(os.getenv('BOT_TOKEN'))


