const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageButton, MessageEmbed, MessageComponentInteraction, Message} = require("discord.js")

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

        //buttons
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('yes') //resembles zoombot 'value'
                .setEmoji('✔')
                .setLabel('YES')
                .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('no')
                .setEmoji('❌')
                .setLabel('NO')
                .setStyle('DANGER'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('results')
                .setEmoji('🔨')
                .setLabel('Results')
                .setStyle('PRIMARY')
        )
        
        const questionEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${interaction.options.getString('question')}`)
            .setDescription('Click on "YES/NO" to register your vote')
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

        
        await interaction.reply({content: `${interaction.options.getString('question')}`, embeds: [questionEmbed], components: [row] })
    
    
    }
        
}