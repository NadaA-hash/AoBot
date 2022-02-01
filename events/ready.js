module.exports = {
  name:"ready",
  once:true,
  execute(client){
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("ao help", {
      type: "PLAYING",
      name: "Discord",
    });
  }
}