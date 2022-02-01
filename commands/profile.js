const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  cooldown: '10s',
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Provides user profile that is stored in the NUT database.'),
  async execute(msg){
    const { guild, channel } = msg

    const user = msg.mentions.users.first() || msg.member.user
    const member = guild.members.cache.get(user.id)

    const embed = new MessageEmbed()
        .setAuthor({
          name: `${user.username}'s profile`,
          iconURL: user.displayAvatarURL(),
        })
        .setColor('#9e5651')
        .addFields(
          {
            name: 'User tag:',
            value: user.tag,
          },
          {
            name: 'Nickname',
            value: member.nickname || 'None',
          },
          {
            name: 'Joined server',
            value: new Date(member.joinedTimestamp).toLocaleDateString(),
          },
          {
            name: 'Joined Discord',
            value: new Date(user.createdTimestamp).toLocaleDateString(),
          },
        )
        msg.channel.send({embeds:[embed]});
  }
}