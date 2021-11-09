const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fetch = require('node-fetch');
const keepAlive = require("./server")
const Database = require("@replit/database")

 const db = new Database()
const token = process.env['token']

const sadWords = ["sad", "depressed", "unhappy", "angry"]

const starterEncouragements = [
  "Cheer up!",
  "Hang in there.",
  "You are a great person!",
  "Here, you can share my nut.",
  "I will give you a virtual squirrel hug."
]

db.get("encouragements").then(encouragements => {
  if (!encouragements || encouragements.length < 1) {
    db.set("encouragements", starterEncouragements)
  }
})

db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true)
  }
})

function updateEncouragements(encouragingMessage) {
  db.get("encouragements").then(encouragements => {
    encouragements.push([encouragingMessage])
    db.set("encouragements", encouragements)
  })
}

function deleteEncouragement(index) {
  db.get("encouragements").then(encouragements => {
    if (encouragements.length > index) {
      encouragements.splice(index, 1)
      db.set("encouragements", encouragements)
    }
  })  
}

function getQuote(){
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

function randomAnswer(userString){
  const bandAnswers = [
    userString + " has more bands than you!",
    "you have more bands than "+userString+"!",
    userString + " has the same amount of bands as you!"
  ]
  return bandAnswers[Math.floor(Math.random() * bandAnswers.length)]
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on ('messageCreate', (message) => {
    if (message.content === 'ao hello') {
        message.reply('*squirrel noises 👋*')
    };

    if (message.content === 'ao inspire') {
        getQuote().then(quote => message.channel.send(quote))
    };

    if (sadWords.some(word => message.content.includes(word))){
      db.get("encouragements").then(encouragements => {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        message.reply(encouragement)
      })
    }

    db.get("responding").then(responding =>{
    if (responding && sadWords.some(word => message.content.includes(word))) {
      db.get("encouragements").then(encouragements => {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        message.reply(encouragement)
      })
    }
  })

    if (message.content.startsWith("ao new")) {
    encouragingMessage = message.content.split("$new ")[1]
    updateEncouragements(encouragingMessage)
    message.channel.send("New encouraging message added.")
  }

  if (message.content.startsWith("ao del")) {
    index = parseInt(message.content.split("$del ")[1])
    deleteEncouragement(index)
    message.channel.send("Encouraging message deleted.")
  }

  if (message.content.startsWith("ao responding")) {
    value = message.content.split("ao responding ")[1]

    if (value.toLowerCase() == "true") {
      db.set("responding", true)
      message.channel.send("Responding is on.")
    } else {
       db.set("responding", false)
      message.channel.send("Responding is off.")     
    }
  }

    if (message.content.startsWith('ao band4band')){
      userString = message.content.split('ao band4band ')[1]
      message.reply(randomAnswer(userString))
    }

    // if (message.content.startsWith('ao @')){
    //   userString = message.content.split('ao @ ')[1]
    //   if (client.users.cache.find(user => user.username)){
    //     message.reply("Found user")
    //   }
    //   else{
    //      message.reply("User not found")
    //   }
    // }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  
  if (interaction.commandName === 'ao') {
    await interaction.reply('*squirrel noises 👋*');
  }

  if (interaction.commandName === "inspire"){
    await getQuote().then(quote => interaction.reply(quote))
  }

});

keepAlive()
client.login(token);
