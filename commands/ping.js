const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('PONG!'),
    async execute(interaction) {
        interaction.reply({
            content: 'PONG!',
            ephemeral: true
        });
    }
}