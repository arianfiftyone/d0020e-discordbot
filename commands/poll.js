const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll to vote "Yes/No" on')
        .addStringOption((option) => 
            option
            .setName('question')
            .setDescription('Enter your question to vote on')
            .setRequired(true)
        ),

    
    async execute(interaction) { 

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('yes') //resembles zoombot 'value'
                .setEmoji('✔')
                // .setLabel('YES')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('no')
                .setEmoji('')
                // .setLabel('NO')
                .setStyle('DANGER'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('results')
                .setEmoji('')
                // .setLabel('Results')
                .setStyle('PRIMARY')
        )

        const questionEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${interaction.options.getString('question')}`)
            .setDescription('To register your vote, click on YES/NO')
            .addFields(
                {
                    name: 'Votes on YES:',
                    value: String('0'),
                    inline: true
                },
                {
                    name: 'Votes on NO:',
                    value: String('0'),
                    inline: true
                },
            );
        

        await interaction.reply({content: `${interaction.options.getString('question')}`, embeds: [questionEmbed], components: [row] });    
    }
        
}