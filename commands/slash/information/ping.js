const Discord = require('discord.js');

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('ping')
		.setDescription('Reply with bot latency!'),
	async execute(interaction) {
        const LoadingMessage = await interaction.reply({ content: 'Pinging...', ephemeral: false, fetchReply: true });
        const BotLatency = LoadingMessage.createdTimestamp - interaction.createdTimestamp;
        
        const PingEmbed = new Discord.EmbedBuilder()
            .setTitle('🏓 | Pong!')
            .setColor('Random')
            .setThumbnail(interaction.client.user.displayAvatarURL({ size: 2048, format: 'png', dynamic: true }))
            .addFields(
                { name: 'Bot Latency', value: '```ini\n [' + BotLatency + 'ms ]```', inline: true },
                { name: 'API Latency', value: '```ini\n [' + client.ws.ping + 'ms ]```', inline: true }
            )
            .setTimestamp()
        return interaction.editReply({ content: '', embeds: [PingEmbed] });
    },
};