const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies to hello with Aos special greeting'),
  async execute(interaction){
    await interaction.reply('*squirrel noises 👋*');
  }
}