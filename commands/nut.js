const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nut')
    .setDescription('Reacts with emojis related to nuts'),
  async execute(msg){
    msg.react('🥜')
      .then(() => msg.react('🌰'))
      .catch(error => console.error('An emoji is not working', error));
  }
}