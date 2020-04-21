const Discord = require("discord.js");

module.exports.help = {
  name: "ping",
  aliases: [] 
};

module.exports.run = async(client, message, args) => {
    const msg = await message.channel.send(`🏓 Pinging....`);
    const date = new Date().getTime() 
    const editMSG = "**:ping_pong: Pong!**\nAPI Latency: " + (date - message.createdTimestamp)
    msg.edit(editMSG);
};
