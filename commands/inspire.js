const { SlashCommandBuilder, quote } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


function getQuote() {
    return fetch('https://zenquotes.io/api/random')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data[0]["q"] + " ~" + data[0]["a"];
      });
  }


module.exports = {
    data: new SlashCommandBuilder()
        .setName('inspire')
        .setDescription('Uplifting quotes'),

    async execute(interaction) {
        await interaction.deferReply();
        // await getQuote().then(quote)
        let newQuoteEmbed;
        getQuote().then((quote) => {
            newQuoteEmbed = new MessageEmbed()
                .setColor("#FFFF")
                .setTitle('Your daily inspiration')
                .addField(
                    `${quote}`,
                    'Keep your head up: ' + `${interaction.user}`,
                    true
                )
            interaction.editReply({ embeds: [newQuoteEmbed] });
        });

    },
}


