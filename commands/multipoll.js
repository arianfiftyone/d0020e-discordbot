const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")

//discord only allows 5 buttons
module.exports = {
    data: new SlashCommandBuilder()
        .setName('multipoll')
        .setDescription('Create an multipoll')
        .addStringOption((option) => 
            option
            .setName('question')
            .setDescription('Enter your multiple choice question')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('correct')
            .setDescription('Correct answer')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('alt1')
            .setDescription('Alternative 1')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('alt2')
            .setDescription('Alternative 2')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('alt3')
            .setDescription('Alternative 3')
        ),

    async execute(interaction) {

        let randomOptions = interaction.options._hoistedOptions
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

        //add four alts buttons
        const row = new MessageActionRow()
        randomOptions.forEach(element => {
            if (element.name !== "question") {
                row.addComponents(
                    new MessageButton()
                        .setCustomId(String(element.name))
                        .setLabel(String(element.value))
                        .setStyle('PRIMARY')
                );
            }
        });


        //add result button manually
        row.addComponents(
            new MessageButton()
                .setCustomId('mpollresults')
                .setLabel('Results')
                .setEmoji('🔨')
                .setStyle('SUCCESS')
        )

        const questionEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${interaction.options.getString('question')}`)
            .setDescription('Which of these alternatives is the correct one?')

        await interaction.reply({content: `${interaction.options.getString('question')}`, embeds: [questionEmbed], components: [row] })
    
    
    }
        
}