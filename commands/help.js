const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Provides a list of all commands'),
  async execute(msg){
    const commandFiles = fs.readdirSync(`./commands/`).filter(files => files.endsWith('.js'));

    const commands = []
    const descriptions = []

    for (const file of commandFiles){
      const curr = require('./'+file)
      commands.push(curr.data.name)
      descriptions.push(curr.data.description)
    }
    
    var arrayLength = commands.length;
    reply = "";
    for (var i = 0; i < arrayLength; i++) {
      console.log(commands[i]+"- "+descriptions[i]);
      reply += "**"+commands[i]+"**- "+descriptions[i]+"\n"
    }

    const embed = new MessageEmbed()
    .setColor('#9e5651')
    .addField('**Prefix**', '*ao <insert command name here>*')
    .setTitle('Command list')
    .setDescription(reply)

    msg.channel.send({embeds:[embed]});
  }
}