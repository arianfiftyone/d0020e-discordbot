const Discord = require('discord.js');
const GuildSettings = require('../models/GuildSettings')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        console.log(member.user)

        const guildSettings = await GuildSettings
            .findOne({guildId: member.guild.id
        });

        if(!guildSettings && !guildSettings.welcomeChannelId) {
            return;
        }

        const newMemberEmbed = new Discord.MessageEmbed()
            .setColor('#d81e5b')
            .setTitle('New member!')
            .setDescription(`${member.user} has joined the server, enjoy your stay!`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

            member.guild.channels.cache
                .get(guildSettings.welcomeChannelId)
                .send({
                    embeds: [newMemberEmbed
                    ]
            })

    }
}