const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send("Bot is running!")
})

//The server will listen to port 3000
function keepAlive(){
  server.listen(3000, () => {
    console.log("Server is ready.")
  })
}

//Export this to run from bot.js file
module.exports  = keepAlive