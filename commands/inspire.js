const { MessageEmbed } = require('discord.js');
const request = require("request");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('inspire')
    .setDescription('Sends AI generated quote.'),
  async execute(interaction){
    urlR = 'http://inspirobot.me/website/images/inspirobot-dark-green.png'
    
    request('http://inspirobot.me/api?generate=true', function (error, response, body) {
      if(!error && response.statusCode == 200){
        console.log(body)
        urlR = body

        const embed = new MessageEmbed()
        .setDescription('*Ao hands you a nutet of wisdom :chestnut:*')
        .setImage(urlR)
        .setColor('#9e5651')
        .setFooter({
          text: "Brought to you by the Nada foundaiton. Donate today!"});

        interaction.reply({embeds:[embed]});
      }
    })
  }
}