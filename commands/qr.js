const { SlashCommandBuilder } = require("@discordjs/builders")


module.exports = {
    data: new SlashCommandBuilder()
        .setName('qr')
        .setDescription('Creates a QR-code')
        .addStringOption((option) => 
            option
            .setName('link')
            .setDescription('The link to convert to a QR-code')
            .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();
        interaction.editReply(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${interaction.options.getString('link')}`);
    }
}
