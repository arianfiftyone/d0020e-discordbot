require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
}); //create new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


//make sure this line is the last line
client.login(process.env.TOKEN); //login bot using token