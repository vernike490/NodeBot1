const Discord = require("discord.js");

module.exports = {
  help: {
    name: "say",
    aliases: ["announce"]
  },
  run: async (client, message, args) => {
    const joinedArgs = args.join(" ")
    if (!message.attachments){
      if (!joinedArgs.length){
        return message.reply("*rolls eyes*")
      }
      return message.channel.send(`${joinedArgs}`)
    } else {
      const attachment = message.attachments.url
      if (joinedArgs.length) {
        return message.channel.send(`${joinedArgs}`, attachment)
      }
    } 
  }
}
