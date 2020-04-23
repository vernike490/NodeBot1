const Discord = require('discord.js');
const { inspect } = require("util");

module.exports.help = {
  name: 'eval',
  aliases: ['Alias1', 'Alias2', 'etc.']//Leave Blank for no Aliases
};


module.exports.run = async (client, message, args) => {


  if (message.author.id == 620229667294674955 || message.author.id == 620511716173938688) {
    try {
      let toEval = args.join(" ");
      let evaluated = inspect(eval(toEval, { depth: 0 }));

      if (!toEval) {
        return message.channel.send(`Error while evaluating: \`literally nothing\``);
      } else {
        let hrStart = process.hrtime();
        let hrDiff;
        hrDiff = process.hrtime(hrStart);
        return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
      }

    } catch (e) {
      return message.channel.send(`Error while evaluating: \`${e.message}\``);
    }

  } else {
    return message.reply("You cant execute me you arent owner!").then(msg => msg.delete(5000));
  }
};
