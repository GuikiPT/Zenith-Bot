const Discord = require('discord.js');

module.exports = {
    name: Discord.Events.InteractionCreate,
    once: true,

    async execute(client, interaction) {
        console.info(`Ready as ` + client.user.tag);
        try {
            if (!interaction.isChatInputCommand()) return;

            const command = client.slashCommands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        } catch (error) {
            console.error(error.stack);
        }
    },
};