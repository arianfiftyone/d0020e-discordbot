const { MessageEmbed} = require("discord.js")


let pollYes = 0;
let pollNo = 0;

async function pollHandler(component, interaction) {
    if (component.customId === "yes") {
        pollYes++;
        ephemeralReply(interaction);
    }
    else if(component.customId === "no") {
        pollNo++;
        ephemeralReply(interaction);
    }
    else if(component.customId === "results") {
    const questionEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Results")
        .setDescription('The results for the poll:')
        .addFields(
            {
                name: 'Votes on YES:',
                value: String(pollYes),
                inline: true
            },
            {
                name: 'Votes on NO:',
                value: String(pollNo),
                inline: true
            },
        );
    interaction.reply({embeds: [questionEmbed] });
    }
}

function ephemeralReply(interaction) {
    interaction.reply({
        content: "Thank you for voting!",
        ephemeral: true, 
    });
}


module.exports = pollHandler;