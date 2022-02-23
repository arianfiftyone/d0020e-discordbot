const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10'); //v9?
require('dotenv').config();

module.exports = {
    name: 'ready',
    once: true,
    execute(client, commands) {

        console.log(`Logged in as ${client.user.tag}!`);

        const CLIENT_ID = client.user.id; //gets current bots client ID.

        const rest = new REST({
            version: '10'
        }).setToken(process.env.BOT_TOKEN);

        (async () => {
            try {
                if (process.env.ENV === 'production') {
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID), {
                        body: commands
                    });
                    console.log('Succesfully registered commands globally.');
                } else {
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                        body: commands
                    });
                    console.log('Succesfully registered commands locally.')
                }
            } catch (err) {
                if (err) console.error(err);
            }
        })();

    }
}