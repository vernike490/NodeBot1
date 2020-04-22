const Discord = require('discord.js')

module.exports.help = {
  name: 'reload',
  aliases: [' ']//Leave Blank for no Aliases
}


module.exports.run = async (client, message, args) => {

  if (message.author.id != "620229667294674955") return message.channel.send("What the fuck do you think you are doing?")

  if (!args[0]) return message.channel.send("*rolls eyes* I cant reload nothing!")

  let commandName = args[0].toLowerCase()

  try {
    delete require.cache[require.resolve(`./${commandName}.js`)]
    client.commands.delete(commandName)
    const pull = require(`./${commandName}.js`)
    client.commands.set(commandName, pull)
  } catch (e) {
    return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
  }

  message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)

}

