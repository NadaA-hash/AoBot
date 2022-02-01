const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Database = require("@replit/database")
const db = new Database()

const starterQuotes = [
  "Pancakes are like mini cakes.",
  "Gimmie 5 mins",
  "What?"
]
//checks if quotes are already in database or not.
db.get("quotes").then(quotes => {
if (!quotes || quotes.length < 1){
    db.set("quotes", starterQuotes)
  }
})

function updateQuotes(userQuote){
  db.get("quotes").then(quotes => {
    quotes.push(userQuote)
    db.set("quotes", quotes)
  })
}

function deleteQuote(index){
  db.get("quotes").then(quotes => {
    if (quotes.length > index){
      quotes.splice(index, 1)
      db.set("quotes", quotes)
    }
  })
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Stores and tells quotes. Also can: ao quote new .. ao quote del #; accepts 1 image'),
  async execute(msg){

    if (msg.content.startsWith("ao quote new")){
      var userQuote = "Error";
      if (msg.attachments.size > 0){
        //stores only the url of the first image attached
        userQuote = msg.attachments.first().url
      }
      else{
        userQuote = msg.content.split("ao quote new ")[1]
      }
      updateQuotes(userQuote)
      msg.channel.send("New quote added.")
    }
    else if (msg.content.startsWith("ao quote list")){
      db.get("quotes").then(quotes => {
        const quoteList = quotes.length;
        console.log(quotes)
      })
    }
    else if (msg.content.startsWith("ao quote del")){
      userIndex = msg.content.split("ao quote del ")[1]
      deleteQuote((userIndex-1))
      msg.channel.send("Deleted quote.")
    }
    else{
      //checks to see if there is a number at end of string
      getQuote = msg.content.match(/\d+$/)
      db.get("quotes").then(quotes => {
        index = Math.floor(Math.random()*quotes.length)
        if (getQuote){
          index = msg.content.split("ao quote ")[1]
          index = index - 1
        }
        const quote = quotes[index]
        embedQuote = new MessageEmbed()
        if (quote.startsWith("https://cdn.discordapp.com/")){
          embedQuote = new MessageEmbed()
            .setImage(quote)
            .setColor('#9e5651')
            .setFooter({
              text: "🌰 Quote #"+(index+1)});
        }
        else{
          embedQuote = new MessageEmbed()
            .setDescription(quote)
            .setColor('#9e5651')
            .setFooter({
              text: "🌰 Quote #"+(index+1)});
        }
        msg.channel.send({embeds:[embedQuote]});
      })
    }
  }
}