const { SlashCommandBuilder } = require("@discordjs/builders");
const  { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

//embed wont error if value is over 1024 characters
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);


module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Type any word')
        .addStringOption((option) => 
            option
            .setName('term')
            .setDescription('Gives an explanation on slang')
            .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();
		const term = interaction.options.getString('term');
		const query = new URLSearchParams({ term });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.json());

        const [answer] = list;

        const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
            );
        
        interaction.editReply({ embeds: [embed] });
    }
}
