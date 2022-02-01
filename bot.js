//Initalization for Discord
const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
//clarifes what flags Ao will be using
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//Secrect token for Ao
const token = process.env['token']
//For Uptime Robot Website
const keepAlive = require('./server')
//To fetch APIs
const fetch = require('node-fetch')
//To request
const request = require("request");
const axios = require('axios')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//===========Functions===========
//Function to connect to an api to get a quote
function getQuote(){
  request('http://inspirobot.me/api?generate=true', function (error, response, body) {
    if(!error && response.statusCode == 200){
      console.log(body)
      return body.toString()
    }
    else{
      return 'http://inspirobot.me/website/images/inspirobot-dark-green.png'
    }
  })
}

//===========Command names===========
 client.on ('messageCreate', async (message) => {
    if (message.content.toLowerCase() === 'ao hello') {
        message.reply('*squirrel noises 👋*')
    }

    else if (message.content.toLowerCase() === 'ao inspire') {
      urlL = 'http://inspirobot.me/website/images/inspirobot-dark-green.png';
      /*request('http://inspirobot.me/api?generate=true', function (error, response, body) {
        if(!error && response.statusCode == 200){
          console.log(body)
          urlL = body;
        }
      })*/
      const embed = new Discord.MessageEmbed().setDescription("Look: "+urlL);
      message.channel.send({embeds:[embed]});
    }

});

//First command for Ao
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  
  if (interaction.commandName === 'ziz') {
    await interaction.reply('yo!');
  }
});

//starts the server
keepAlive()
client.login(token);