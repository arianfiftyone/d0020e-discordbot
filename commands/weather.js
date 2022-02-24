const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Weather description from a desired location')
        .addStringOption((option) => 
            option
            .setName('location')
            .setDescription('The location')
            .setRequired(true)
        ),

    async execute(interaction) {
        let weatherData;
        await interaction.deferReply();
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${interaction.options.getString('location')}&appid=${process.env.OPENWEATHER_ACCESSKEY}`)
            .then(res => res.json())
            .then(json => weatherData = json);
        const newMemberEmbed = new MessageEmbed()
            .setColor("#FFFF")
            .setTitle(`Weather in ${interaction.options.getString('location')}`)
            .setDescription(`${interaction.user}`)
            .addFields(
                {
                    name: 'Temperature:',
                    value: String(Math.round(weatherData.list[0].main.temp-275.15)),
                    inline: true
                },
                {
                    name: 'Wind speed:',
                    value: String(weatherData.list[0].wind.speed) + ' m/s',
                    inline: true
                },
                {
                    name: 'Weather description:',
                    value: String(weatherData.list[0].weather[0].description),
                    inline: true
                },
            );
            
        interaction.editReply({ embeds: [newMemberEmbed] });
    }
}