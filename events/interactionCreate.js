
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (err) {
            if (err) console.error(err);
    
            await interaction.reply({
                content: 'An error occured when executing that command',
                ephemeral: true //only visible to user who executed command
            });
        }

    }
}