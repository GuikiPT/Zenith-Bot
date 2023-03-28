const Discord = require('discord.js');
const colors = require('colors/safe');
const moment = require('moment');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Shows information about a user.')
        .addUserOption(option => option.setName('user').setDescription('The user to get information about')),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user') || interaction.user;
            const member = await interaction.guild.members.cache.get(user.id)
            const fetchedUser = await interaction.client.users.fetch(user.id, { force: true });
            const userFlags = user.flags.toArray();

            const userInfoEmbed = new Discord.EmbedBuilder()
                .setColor('Random')
                .setAuthor({ name: `${fetchedUser.username}#${fetchedUser.discriminator}`, iconURL: fetchedUser.displayAvatarURL({ size: 512, format: 'png', dynamic: true }) })
                .setThumbnail(member.displayAvatarURL({ size: 2048, format: 'png', dynamic: true }) || fetchedUser.displayAvatarURL({ size: 2048, format: 'png', dynamic: true }))
                .setTitle(`>> \`${member.nickname || fetchedUser.username}\`'s Information`)
                .addFields(
                    { name: '**ID**', value: '```\n' + user.id + '\n```', inline: true },
                    { name: '**Username**', value: '```\n' + user.username + '\n```', inline: true },
                    { name: '**Discriminator**', value: '```\n#' + user.discriminator + '\n```', inline: true },
                    { name: '**Created At**', value: '```\n' + moment(user.createdAt).format('LTS L') + '\n```', inline: true },
                    { name: '**Joined At**', value: '```\n' + moment(member.joinedAt).format('LTS L') + '\n```', inline: true },
                    { name: '**Roles Count**', value: '```\n' + member.roles.cache.size + ' couting with @everyone\n```', inline: true },
                    { name: '**Bot**', value: '```\n' + `${user.bot ? "Yes" : "No"}` + '\n```', inline: true },
                    { name: '**Badges**', value: '```\n' + fetchedUser.flags.toArray().join(', ').replace(/([a-z0-9])([A-Z0-9])/g, '$1 $2').replace(/^[A-Z0-9]/g, '$&') + '\n```', inline: true },
                )
            if (fetchedUser.banner) {
                userInfoEmbed.setImage(fetchedUser.bannerURL({ size: 4096, format: 'png', dinamic: true }));
            }

            return interaction.reply({ embeds: [userInfoEmbed] });
        }
        catch (error) {
            console.error(colors.red(error.stack));
        }
    },
};
                    // { name: '**Status**', value: `${user.presence.status}`, inline: true },
