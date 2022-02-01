# Ao bot

Ao bot is a small discord bot made for my friends and I in our servers. Files here are free to use for your own personal use. 

## Installation

If you have an account on Replit, feel free to fork the project on there: https://replit.com/@NadaA-hash/AoBot-JS?v=1
Another great thing about Replit is that it provides a database for free. Please note that the quote command relies on the database to store said quotes.

Before continuing anything else, please make sure that you have your own bot created at [Discord Developer Portal](https://discord.com/developers/applications)

To keep your Discord bot alive, connect it with server.js file. When you run the replit, you will see a browser 
pop up on top of the shell and that will indicate the http address [Uptime robot](https://uptimerobot.com/) needs to ping.

So three things needed:
* Replit
* Uptime Robot
* Discord Developer Portal

There are of course other resources besides Uptime Robot and Replit (ex: hosting it on your own local computer instead), but that is up to you to choose!

## Usage
To use any command, you must type the prefix "ao".
Here are the commands this bot can currently do:

* bands- Compares you with another user to determine who has the most bands(money). 

``` ao bands JohnSmith```
* hello- Replies to hello with Ao's special greeting
* help- Provides a list of all commands.
* inspire- Sends AI generated quote via embed message on Discord.
* joke- Sends a random joke.
* nut- Reacts with emojis related to nuts
* play- Ao will play rock paper scissors with you!
* profile- Provides user profile that is stored in the NUT database.

``` ao profile```
``` ao profile @Username```
* quote- Stores and tells quotes. Can either get it randomly or write the specific index number assoicated with the quote.
Also can: ao quote new .. ao quote del #; accepts 1 image

``` ao quote ```
``` ao quote 4 ```
``` ao quote new [Write quote here OR attach one image] ```
``` ao quote del [Index number] ```


## Known issues
* There are no cooldowns added to commands.
* Bands command may appear to give same option depsite being randomized via ```Javascript Math.floor(Math.random() * bandAnswers.length)```

## APIs Used
For inspiring quotes (free): https://github.com/kishlaya/inspirobot-bot/blob/master/README.md

For jokes (free but limited; requires account at rapidapi): https://rapidapi.com/KegenGuyll/api/dad-jokes/
