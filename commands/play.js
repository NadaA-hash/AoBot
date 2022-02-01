const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Message, MessageActionRow, MessageButton } = require('discord.js');

function getRandomItem() {
  const options = ["rock", "paper", "scissors"]
  index = Math.floor(Math.random() * 3);
  return options[index]
}

function determineWinner(aoPick, userPick){
  if(aoPick == "rock"){
    if (userPick == "scissors")
      return "I win!"
    else if(userPick == "paper")
      return "I lost!"
  }
  else if (aoPick == "paper"){
    if (userPick == "rock")
      return "I win!"
    else if(userPick == "scissors")
      return "I lost!"
  }
  else if (aoPick == "scissors"){
    if (userPick == "paper")
      return "I win!"
    else if(userPick == "rock")
      return "I lost!"
  }
  return "It's a draw!"
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Ao will play rock paper scissors with you!'),

    async execute(message){
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('rock')
          .setLabel('🗿')
          .setStyle('PRIMARY'),
        
        new MessageButton()
          .setCustomId('paper')
          .setLabel('📜')
          .setStyle('PRIMARY'),
        
        new MessageButton()
          .setCustomId('scissors')
          .setLabel('✂️')
          .setStyle('PRIMARY')
      );

      await message.reply({
        content: 'Rock, paper, scissors, shoe!',
        components: [row]
      })

      const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply({ content: "You can't use this button."});
      }

      const collector = message.channel.createMessageComponentCollector({
        filter,
        max:1,
      });

      collector.on('end',(ButtonInteraction) => {
        const id = ButtonInteraction.first().customId;
        //console.log(ButtonInteraction.first().customId);
        aoPick = getRandomItem()
        result = determineWinner(aoPick, id)
        ButtonInteraction.first().reply(`${message.author} picked ${id}. I picked ${aoPick}. ${result}`)
      })
  }
};