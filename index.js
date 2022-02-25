require('dotenv').config();

const {Client, Intents, WebhookClient, Collection} = require('discord.js')
const fs = require('fs');
const Database = require('./config/Database')
const db = new Database();
db.connect();


//create new client
const client = new Client({
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
});

//create new webhook
const webhookClient = new WebhookClient({
    id: process.env.WEBHOOK_ID, 
    token: process.env.WEBHOOK_TOKEN 
});

//command handler
const commandFiles = fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

const commands = [];
client.commands = new Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

//event handler
const eventFiles = fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, commands));
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}
//make sure this line is the last line
client.login(process.env.BOT_TOKEN);