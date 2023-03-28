const Discord = require('discord.js');
const colors = require('colors/safe');
const moment = require('moment');
const fs = require('fs');
const figlet = require('figlet-promised');
require('dotenv').config();
require('better-logging')(console, {
    format: ctx => `[${colors.gray(moment().format('HH:mm:ss'))}] [${colors.gray(moment().format('L'))}] ${ctx.type} >> ${ctx.msg}`,
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

async function runFiglet() {
    const result = await figlet('Zenith');
    console.log(colors.rainbow('\n' + result));
}
runFiglet();

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.AutoModerationConfiguration,
        Discord.GatewayIntentBits.AutoModerationExecution,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.GuildEmojisAndStickers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildModeration,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildScheduledEvents,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.MessageContent,
    ],
    partials: [
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.GuildScheduledEvent,
        Discord.Partials.Message,
        Discord.Partials.Reaction,
        Discord.Partials.ThreadMember,
    ]
});
client.slashCommands = new Discord.Collection();


['events', 'slash'].forEach(async (handlerName) => {
    try {
        await require(__dirname + '/handlers/' + handlerName)(client);
    } catch (error) {
        console.error(error.stack);
    }
});

client.login(process.env.DiscordToken);