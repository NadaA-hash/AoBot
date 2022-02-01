const token = process.env['token']

module.exports = {
  name:"messageCreate",
  on: true,
  async execute(msg, client){
    const prefix = 'ao';

    if(!msg.content.toLowerCase().startsWith(prefix)) return;
    var command = msg.content.substring(3);
    command = (command.split(" ")[0])
    if(!client.commands.has(command)) return;

    try{
      await client.commands.get(command).execute(msg, client);
    } 
    catch(error){
      console.error(error);
      await msg.reply({content: "Error encountered. Check index.js.",ephemeral:true})
    }
  },
};