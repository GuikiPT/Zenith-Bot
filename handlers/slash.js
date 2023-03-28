const fs = require('fs');

module.exports = async function (client) {
    try {
        const commandFolders = fs.readdirSync(__dirname + '/../commands/slash');

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(__dirname + `/../commands/slash/${folder}`).filter(file => file.endsWith('.js'));
            console.log(`Starting to load ${commandFiles.length} commands in ${folder}`);

            var numbercommandsLoaded = 0;

            for (const file of commandFiles) {
                const command = require(__dirname + `/../commands/slash/${folder}/${file}`);
                if ('data' in command && 'execute' in command) {
                    client.slashCommands.set(command.data.name, command);
                    numbercommandsLoaded++;
                } else {
                    console.log(`[WARNING] The command at /commands/slash/${folder}/${file} is missing a required "data" or "execute" property.`);
                }
            }
            console.log(`Loaded ${numbercommandsLoaded} commands`);
        }
    } catch (error) {
        console.error(error.stack);
    }
}