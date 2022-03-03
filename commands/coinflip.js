const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip a coin')
    .addStringOption(option =>
      option.setName('choice')
        .setDescription('your choice of \'heads\' or \'tails\'')),
	async execute(interaction) {

    arg = interaction.options.getString('choice');

    if(arg) {arg = arg.toLowerCase();}

    coin = Math.floor(Math.random() * 2); //heads == 1, tails == 0
    if(coin == 1){
        headsOrTails = 'heads'
    } else {
        headsOrTails = 'tails'
    }

    if(!arg){
      textToUser = 'It\'s ' + headsOrTails.toUpperCase() + '!'

    } else if(arg !== 'heads' && arg  !== 'tails'){
      
      textToUser = 'Please pick [heads] or [tails] (ex: coinflip heads)'

    } else {
      textToUser = 'You picked: ' + arg + '\nThe result was: ' + headsOrTails + '\n'
      if(headsOrTails === arg){
        textToUser = textToUser + 'YOU WIN!'
      } else {
        textToUser = textToUser + 'YOU LOST!'
      }

    }

    await interaction.reply({
      content: textToUser
      //ephemeral: true
    });
	},
};
