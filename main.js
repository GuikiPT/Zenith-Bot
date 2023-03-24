const Discord = require('discord.js');
const colors = require('colors/safe');
const moment = require('moment');
const fs = require('fs');
const figlet = require('figlet-promised');
require('dotenv').config();
require('better-logging')(console, {
    format: ctx => `[${moment().format('HH:mm:ss')}] [${moment().format('L')}] ${ctx.type} >> ${ctx.msg}`,
    saveToFile: `${__dirname}/logs/${moment().format('YYYY')}/${moment().format('M')}/${moment().format('D')}.log`,
    color: {
        base: colors.grey,
        type: {
            debug: colors.green,
            info: colors.white,
            log: colors.grey,
            error: colors.red,
            warn: colors.yellow,
        }
    },
});

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
    ]
});

client.on(Discord.Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
});

client.login(process.env.DiscordToken);