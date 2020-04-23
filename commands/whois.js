const Discord = require('discord.js')
const colours = require("../colours.json");

module.exports.help = {
  name: "whois",
  aliases: ['wi', 'userinfo', 'memberinfo'],
  description: "Show info about yourself or another user",
  usage: 'whoIs [@User(Optional)]',
  example: 'whoIs @Member'
}
module.exports.run = async (client, message, args) => {
  let user = message.mentions.members.first() || message.member;
  const joined = user.joinedAt.toLocaleDateString()
  const created = user.user.createdAt.toLocaleDateString()
  const roles = user.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || 'none';
  let embed = new Discord.MessageEmbed()
    .addField('Member Information:', `**-Nickname: **${user.displayName}\n**-Joined At: **${joined}\n**- Roles: ** ${roles}`, true)
    .addField('User information:', `**- ID: ** ${user.id}\n**- Username** : ${user.user.username}\n**- Tag: ** ${user.user.tag}\n**- Created at: ** ${created}`, true)
    .setThumbnail(user.user.displayAvatarURL())
    .setColor(user.displayHexColor)
    .setTimestamp()
  let activ = user.user.presence.activities || {}
  console.log(activ)
  if (!activ[0] && !activ[0]["state"]) {
    message.channel.send(embed);
    return;
  }
  if (activ[0] && !activ[0]["state"]) embed.addField('Game Activity', `${activ[0]["type"]} ${activ[0]["name"]}`);
  if (activ[0] && activ[0]["state"]) embed.addField('Custom Status', `${activ[0]["state"]}`)
  message.channel.send(embed)
}
