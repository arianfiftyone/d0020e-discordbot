const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = require('node-fetch');
const cheerio = require('cheerio')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('tenta')
        .setDescription('Find information for tenta')
        .addStringOption((option) => 
            option
            .setName('kurskod')
            .setDescription('The course code for tenta')
            .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();
        let kursQuery = 'https://tenta.ltu.se/ajax/ajax_autocompleteResurser.jsp?typ=kurs&term=' + interaction.options.getString('kurskod');
        let tentaURL = "https://schema.ltu.se/setup/jsp/Schema.jsp?startDatum=idag&intervallTyp=m&intervallAntal=12&sprak=SV&sokMedAND=true&forklaringar=true&resurser=k.";
        let tentaWeek;
        let tentaInfo;
        await fetch(kursQuery)
            .then(res => res.json())
            .then(json => tentaURL += json[0].value)
        await fetch(tentaURL)
            .then(res => res.text())
            .then(text => {
                const body = text;
                const $ = cheerio.load(body);
                const tentaDayClass = $('.data-white td');
                const tentaWeekTag = $('b');
                tentaWeekTag.each((i, el) => {
                    if (i > 0) {
                      tentaWeek = $(el).text();
                    }
                    if (i == 1) {
                      return false;
                    }
                });
                tentaDayClass.each((i, el) => {
                    if (i > 1) {
                        tentaInfo = $(el).text();
                    }
                    if (i == 2) {
                        return false;
                    }
                });
                
            });
        let kurskod = interaction.options.getString('kurskod').toUpperCase();
        interaction.editReply(`Tenta ${kurskod}: ${tentaWeek}, ${tentaInfo}`);
    }
}