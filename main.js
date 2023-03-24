const Discord = require('discord.js');
const colors = require('colors/safe');
const moment = require('moment');
const fs = require('fs');
const figlet = require('figlet-promised');
require('dotenv').config();
require('better-logging')

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
    ]
});

client.on(Discord.Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
});

client.login(process.env.DiscordToken);