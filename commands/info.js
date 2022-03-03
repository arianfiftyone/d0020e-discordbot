const { SlashCommandBuilder } = require('@discordjs/builders');

var info = {}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('stores info')
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription("Lists all the keys"))
        .addSubcommand(subcommand =>
            subcommand
                .setName('find')
                .setDescription("Uses a key to find information")
                .addStringOption(option => option.setName("key").setDescription("What are we looking for?").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription("Adds a key and description")
                .addStringOption(option => option.setName("key").setDescription("What shall be added to info?").setRequired(true))
                .addStringOption(option => option.setName("content").setDescription("What shall the key contain?").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription("Uses a key to remove something from info")
                .addStringOption(option => option.setName("key").setDescription("What shall be removed from info?").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('allinfo')
                .setDescription("Shows everything in info")),

    async execute(interaction) {
        var textToUser = "Information not available"
        if(interaction.options.getSubcommand() === 'list') {
            listInfo()
        }
        else if(interaction.options.getSubcommand() === 'find') {
            const key = interaction.options.getString("key")
            findInfo(key)
        }
        else if(interaction.options.getSubcommand() === 'add') {
            const key = interaction.options.getString("key")
            const content = interaction.options.getString("content")
            info[key] = content
            textToUser = key + " added to info"
        }
        else if(interaction.options.getSubcommand() === 'remove') {
            const key = interaction.options.getString("key")
            removeInfo(key)
        }
        else if(interaction.options.getSubcommand() === 'allinfo') {
            getAllInfo()
        }

        function listInfo() {
            if(Object.keys(info).length === 0) {
				textToUser = "There is nothing in info."
			}
			else {
				textToUser = "You can get information about the following things: " + Object.keys(info)
			}
        }

        function findInfo(key) {
            if(key in info) {
                textToUser = key + ": " + info[key]
            }
            else {
                textToUser = key + " does not exist in info." + "\n" + "You can add it using the add command."
            }
        }

        function removeInfo(key) {
            if(key in info) {
                delete info[key]
                textToUser = key + " removed from info."
            }
            else {
                textToUser = key + " is not in info."
            }
        }

        function getAllInfo(key) {
            if(Object.keys(info).length === 0) {
				textToUser = "There is nothing in info."
			}
			else {
				textToUser = ""
				for (key in info) {
					textToUser += key + ": " + info[key] + "\n"
				}
			}
        }
        await interaction.reply({
            content: textToUser,
            ephemeral: true,


        });
    }
}