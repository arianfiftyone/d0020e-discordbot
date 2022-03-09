# A chatbot for Discord

The use of this app is a subject to [Discords Terms of Use](https://discord.com/developers/docs/legal).

This is a schoolproject in the course 'D0020E - Projekt i Datateknik' using the [Discord Chatbot NPM Package](https://discord.js.org/#/)

![Chatbot for Discord]()

## Prerequisites
1. [A free Discord account](https://discord.com/developers)
3. [Node.js](https://nodejs.org/en/)
4. [A free Openweathermap account](https://openweathermap.org)


To run the completed Chatbot code locally, continue reading below.

### Local/Development Setup

To run the completed Chatbot locally, follow these steps,

1. In terminal:

   `$ git clone https://github.com/arianfiftyone/d0020e-discordbot`

   `$ cd d0020e-discordbot`

   `$ npm install discord.js @discordjs/builders @discordjs/rest discord-api-types dotenv cheerio mongoose node-fetch nodemon --save`

   `$ touch .env`
   
2. Add this code to your .env file

   `BOT_TOKEN=Required` Your Discord **Bot Token ID**, found in your Discord app's **Bot credentials** tab. <br />
   `GUILD_ID=Required` Your Discord **Channel ID**, found in your Discord app's **OAuth2 credentials** tab. <br />
   `WEBHOOK_ID=Required` The **Webhook ID**, found in your Discord application **Integration** tab. <br />
   `WEBHOOK_TOKEN=Required` The **Webhook Token**, found in your Discord application **Integration** tab. <br />
   `MONGO_URI=Requried` The **MONGO URI**, found in your MongoDB cloud application > Database > Connect > **Connect your application** tab. <br />
   `OPENWEATHER_ACCESSKEY=Required` Your Openweather **Access Key**, found on Openweather.org > Account > API keys. <br />
   
3. In terminal:

   `$ npm run start` or `$ nodemon` ([for live reload / file change detection](https://www.npmjs.com/package/nodemon))
  
4. After running step three your terminal should output:

  `
  Connecting to database... <br />
  Connected to database
  BotApplicationName#BotID is online!
  Succesfully registered commands locally.
  `
  
5. On your Discord Developer Dashboard, click on OAuth2 > URL Generator:

  In the **SCOPES**,section make your **bot** and **application.commands** are checked.
  In the **BOT PERMISSIONS** section, choose **Administrator**. This will give your bot administrative permission, use this wisely. 

  After that, your app is ready to be installed!
  
  In the **GENERATED URL** copy the URL and paste it in a browser. Choose onto which server the bot should enter and proceed.
   
6. Now that your Chatbot is installed on your Discord account, go to a Discord Server and type:

   `/`
   
   and you should see a list of all available commands for the bot.


