const GuildSettings = require('../models/GuildSettings')

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        console.log(member.user)

        const guildSettings = await GuildSettings
            .findOne({guildId: member.guild.id
        });

        if(!guildSettings && !guildSettings.welcomeChannelId) {
            return;
        }
        

        member.guild.channels.cache
            .get(guildSettings.welcomeChannelId)
            .send(`${member.user} has left the server!`)

    }
}