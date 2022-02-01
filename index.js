//Initalization for Discord
const { Client, Collection, Intents } = require('discord.js');
//clarifes what flags Ao will be using
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//For database in replit
const Database = require("@replit/database")
//For command handler
const fs = require('fs');
client.commands = new Collection();
//Secrect tokens for Ao
const token = process.env['token']
const CLIENT_ID = process.env['client_id']
const GUILD_ID = process.env['guild_id']
//For Uptime Robot Website
const keepAlive = require('./server')

const commandFiles = fs.readdirSync(`./commands/`).filter(files => files.endsWith('.js'));
for (const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync(`./events/`).filter(files => files.endsWith('.js'));
for (const file of eventFiles){
  const event = require(`./events/${file}`);
  if(event.once){
    client.once(event.name, (...args) => event.execute(...args, client));
  }
  else{
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

//starts the server
keepAlive()
client.login(token);