

// function sendCommands(message, arg) {

//   var textToUser = 'This function is still in development.'

//   if(!arg){
//     filename = './commandsInfo/all.txt'
//       fs.readFile(filename, 'utf8', function(err, data) {

//         if(err){
//           textToUser="Could not find info for " + arg
//           message.reply(textToUser)

//         } else {
//           textToUser = 'Available commands: \n' + data
//           message.reply(textToUser)
//         }
//       });
//     return;
//   }

//   try{
//       if(arg.search('/') !== -1){
//         console.log('WARNING, ATTEMPT OF UNAUTHORIZED FILE ACCESS ATTEMPTED\n')
//         throw err
//       }
      
//       filename = './commandsInfo/' + arg + '.txt'
//       fs.readFile(filename, 'utf8', function(err, data) {

//         if(err){
//           textToUser="Could not find info for " + arg
//           message.reply(textToUser)
//           //makeRequest(chatbotToken, event, textToUser)

//         } else {
//           textToUser = data
//           if(arg === 'all'){
//             textToUser = 'Available commands: \n' + textToUser
//           }
//           message.reply(textToUser)
//           //makeRequest(chatbotToken, event, textToUser)
//         }
        
//       });
      
//   } catch(error) {
//       textToUser="Could not find info for " + arg
//       message.reply(textToUser)
//   }
// }

// module.exports = sendCommands

var fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('get extra info about all commands!')
    .addStringOption(option =>
      option.setName('command')
        .setDescription('detailed info about a specified command')),
	async execute(interaction) {

    arg = interaction.options.getString('command');

    var textToUser = 'Something went wrong'

    if(!arg){
      filename = './commandsInfo/all.txt'
        fs.readFile(filename, 'utf8', function(err, data) {

          if(err){
            textToUser="Could not find info for " + arg
            interaction.reply(textToUser)

          } else {
            textToUser = 'Available commands: \n' + data
            interaction.reply(textToUser)
          }
        });
        
      return;
    }

    try{
        if(arg.search('/') !== -1){
          console.log('WARNING, ATTEMPT OF UNAUTHORIZED FILE ACCESS ATTEMPTED\n')
          throw err
        }
        
        filename = './commandsInfo/' + arg + '.txt'
        fs.readFile(filename, 'utf8', function(err, data) {

          if(err){
            textToUser="Could not find info for " + arg
            interaction.reply(textToUser)
            //makeRequest(chatbotToken, event, textToUser)

          } else {
            textToUser = data
            if(arg === 'all'){
              textToUser = 'Available commands: \n' + textToUser
            }
            interaction.reply(textToUser)
            //makeRequest(chatbotToken, event, textToUser)
          }
          
        });
        
    } catch(error) {
        textToUser="Could not find info for " + arg
        interaction.reply(textToUser)
    }
	},
};