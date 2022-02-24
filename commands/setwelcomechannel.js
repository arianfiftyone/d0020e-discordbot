const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const GuildSettings = require('../models/GuildSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setwelcomechannel')
        .setDescription('Set the welcome message to channel!')
        .addChannelOption(option => option
            .setName('welcome')
            .setDescription('The channel to set as the welcome channel')
            .setRequired(true)
        ),
    async execute(interaction) {

        //check for admin permissions
        if(!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
            interaction.reply('You dont have permissions to use this command!');
            return;
        }

        //get the channel
        GuildSettings.findOne({ guildId: interaction.guild.id }, (err, settings) => {
            if(err) {
                console.log(err);
                interaction.reply('An error occured while trying to set the welcome channel!');
                return;
            }

            //if guild doesnt exist, create new settings
            if(!settings) {
                settings = new GuildSettings({
                    guildId: interaction.guild.id,
                    welcomeChannelId: interaction.options.getChannel('welcome').id,
                });
            // if we already have the guild settings with a guild id, set welcome channel
            } else {
                settings.welcomeChannelId = interaction.options.getChannel('welcome').id;
            }

            settings.save(err => {
                if (err) {
                    console.log(err);
                    interaction.reply('An error occured while trying to set the welcome channel!');
                    return;
                }

                interaction.reply(`Welcome channel has been set to ${interaction.options.getChannel('welcome')}`);

            })
        })

    }
}
