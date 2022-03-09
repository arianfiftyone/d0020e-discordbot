const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play a game of rock, paper, scissor!')
        .addStringOption((option) =>
            option
            .setName('selection')
            .setDescription('Please make your choice')
            .setRequired(true)
        ),
    async execute(interaction) {
        arg = interaction.options.getString('selection');

        if (arg) {
            arg = arg.toLowerCase();
        }

        hand = Math.floor(Math.random() * 3) //rock == 0, paper == 1, scissor ==2

        if (hand == 0) {
            rps = 'rock'
        } else if (hand == 1) {
            rps = 'paper'
        } else {
            rps = 'scissor'
        }

        if (arg == 'rock' && rps == 'paper') {
            textToUser = 'Bot chose ' + rps + ', you lost.'
        } else if (arg == 'rock' && rps == 'scissor') {
            textToUser = 'Bot chose ' + rps + ', you won!'
        } else if (arg == 'paper' && rps == 'rock') {
            textToUser = 'Bot chose ' + rps + ', you won!'
        } else if (arg == 'paper' && rps == 'scissor') {
            textToUser = 'Bot chose ' + rps + ', you lost.'
        } else if (arg == 'scissor' && rps == 'rock') {
            textToUser = 'Bot chose ' + rps + ', you lost.'
        } else if (arg == 'scissor' && rps == 'paper') {
            textToUser = 'Bot chose ' + rps + ', you won!'
        } else if (arg == rps) {
            textToUser = 'You tied, both chose ' + rps + '. Play again?'
        } else {
            textToUser = 'Please choose rock, paper, or scissor'
        }

        await interaction.reply({
            content: textToUser
        });
    }

}