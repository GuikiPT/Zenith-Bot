const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
    ]
});

client.on(Discord.Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
});

client.login(process.env.DiscordToken);