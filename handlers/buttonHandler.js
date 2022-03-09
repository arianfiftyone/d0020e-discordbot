const {
    MessageEmbed
} = require('discord.js')

let pollYes = 0;
let pollNo = 0;

let mpollDict = {
    'correct': 0,
    'alt1': 0,
    'alt2': 0,
    'alt3': 0
}

async function pollHandler(component, interaction) {
    if (component.customId === 'yes') { 
        pollYes++;
        ephemeralReply(interaction);
    } else if (component.customId === 'no') {
        pollNo++;
        ephemeralReply(interaction);
    } else if (component.customId === 'pollresults') {
        const questionEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Results')
            .setDescription(`The results for the poll: ${interaction.message.content}`)
            .addFields({
                name: 'Votes on YES:',
                value: String(pollYes),
                inline: true
            }, {
                name: 'Votes on NO:',
                value: String(pollNo),
                inline: true
            }, );

        pollYes = 0;
        pollNo = 0;
        interaction.reply({
            embeds: [questionEmbed]
        });
    }
}

async function mpollHandler(component, interaction) {
    if (component.customId === 'mpollresults') {
        const questionEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Results')

        interaction.message.components[0].components.forEach(element => {
            if (element.customId === 'correct') {
                correctAnswer = element.label;
                questionEmbed.setDescription(`The correct answer for the ${interaction.message.content} is: ${correctAnswer} `)
            }
            if (element.customId !== 'mpollresults') {
                questionEmbed.addFields({
                    name: 'Votes on: ' + String(element.label),
                    value: String(mpollDict[element.customId]),
                    inline: true,
                })
            }

        });

        mpollDict = {
            'correct': 0,
            'alt1': 0,
            'alt2': 0,
            'alt3': 0
        };

        interaction.reply({
            embeds: [questionEmbed]
        });
    } else {
        mpollDict[component.customId]++;
        ephemeralReply(interaction);
    }

}

function ephemeralReply(interaction) {
    interaction.reply({
        content: 'Vote registered, thank you for participating!',
        ephemeral: true,
    });
}


module.exports = {
    pollHandler,
    mpollHandler
};