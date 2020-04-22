   const Discord = require('discord.js')
   const colours = require("../colours.json");

module.exports.help = {
name: 'serverinfo',
aliases: [' ']//Leave Blank for no Aliases
}


module.exports.run = async (client,message,args) =>{ 
    
    
    let sEmbed = new Discord.MessageEmbed()
    .setColor(colours.red_dark)
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Server Name:**", `${message.guild.name}`, true)
    .addField("**Server Owner:**", `${message.guild.owner}`, true)
    .addField("**Member Count:**", `${message.guild.memberCount}`, true)
    .addField("**Role Count:**", `${message.guild.roles.cache.size}`, true)
    .setFooter(`JSTest`, client.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});
}