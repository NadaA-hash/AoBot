const { MessageEmbed } = require('discord.js');
const request = require("request");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Sends a random joke.'),

  async execute(interaction){
    joke = 'API not responding'
    //SUBSCRIBE TO DAD JOKES API AT RAPID TO GET YOUR OWN KEY
    const options = {
      method: 'GET',
      url: 'https://dad-jokes.p.rapidapi.com/random/joke',
      headers: {
        'x-rapidapi-host': 'dad-jokes.p.rapidapi.com',
        'x-rapidapi-key': PRIVATE_KEY,
        useQueryString: true
      }
    };

    request(options, function (error, response, body) {
      if(!error && response.statusCode == 200){
        //console.log(body);
        bodysep = body.split(':"')
        setup = bodysep[2].split('","pu')
        punchline = bodysep[3].split('","type') 
        //console.log(bodysep)
        //console.log(setup[0])
        //console.log(punchline[0])

        const embed = new MessageEmbed()
        .addField(setup[0], "*"+punchline[0]+"*")
        .setColor('#9e5651')
        .setFooter({
          text: "By DadJokes.io"});

        interaction.reply({embeds:[embed]});
      }
    })
  }
}
