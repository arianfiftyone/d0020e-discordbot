require('dotenv').config();
const { Client, Intents, WebhookClient } = require('discord.js'); 
const cli = require('nodemon/lib/cli');

//create new client
const client = new Client({
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES 
    ]
});

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
)

const PREFIX = '$';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('messageCreate', (message) => {
    
    console.log(`[${message.author.tag}]: ${message.content}`);

    //stops the infinite response from bot, author is user-type
    if (message.author.bot) return;

    if (message.content.startsWith(PREFIX)) {
        
        /* parsing commands: 
            array destructuring on commandName
            args is an array
            ... is a spreader operator */
        const [commandName, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/); //regex for whitespace


        if (commandName === 'kick') {

            if (args.length === 0) return message.reply('An ID needs to be provided');

            //const member = message.guild.members.kick()
            const member = message.guild.members.cache.get(args[0]);
            
            if (member ) {
                member
                    .kick() //returns a promise
                    .then((member) => message.channel.send(`GTFO ${member}!`)) //handles promise
                    .catch((err) => message.channel.send('I dont have those permissions to kick that user')) //if they dont have permissions

        
            } else {
                message.channel.send('User was not found!')
            }
        } else if (commandName === 'announce') {
            const msg = args.join(' ');
            webhookClient.send(msg);
        }

    }



    // random stuff tested
    /* if (message.content === 'hello') {
        tags the user
        message.reply('hello there!');

        replies to channel infinitely
        message.channel.send('hello')

    }; */

});


//make sure this line is the last line
client.login(process.env.BOT_TOKEN); //login bot using token