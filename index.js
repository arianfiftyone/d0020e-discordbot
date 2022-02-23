require('dotenv').config();

const {Client, Intents, WebhookClient, Collection} = require('discord.js')
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10'); //v9?
const fetch = require('node-fetch');
const axios = require('axios')

//create new client
const client = new Client({
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES 
    ]
});

//create new webhook
const webhookClient = new WebhookClient({
    id: process.env.WEBHOOK_ID, 
    token: process.env.WEBHOOK_TOKEN 
});

//command handler
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = [];
client.commands = new Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}


client.once('ready', () => {
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
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

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
});


//make sure this line is the last line
client.login(process.env.BOT_TOKEN); //login bot using token