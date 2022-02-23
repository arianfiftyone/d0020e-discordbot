const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        console.log(member.user)

        const newMemberEmbed = new Discord.MessageEmbed()
            .setColor('#d81e5b')
            .setTitle('New member!')
            .setDescription(`${member.user} has joined the server, enjoy your stay!`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

            member.guild.channels.cache.find('945591460240187422').send({
                embeds: [newMemberEmbed
                ]
            })

    }
}