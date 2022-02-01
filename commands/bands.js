const { SlashCommandBuilder } = require('@discordjs/builders');

function randomAnswer(userString){
      const bandAnswers = [
        userString + " has more bands than you!",
        "you have more bands than "+userString+"!",
        userString + " has the same amount of bands as you!"
      ]
      return bandAnswers[Math.floor(Math.random() * bandAnswers.length)]
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bands')
    .setDescription('Compares you with another user to determine who has the most bands(money).'),
  async execute(msg){
    userString = msg.content.split('ao bands ')[1]
    
    msg.reply(randomAnswer(userString))
  }
}