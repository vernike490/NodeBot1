
const Discord = require("discord.js");

const { config } = require("dotenv");

const prefix = "_";

const client = new Discord.Client({
  disableEveryone: true
  // The bot cannot use @everyone
});

client.commands = new Discord.Collection();

client.aliases = new Discord.Collection();

client.on("ready", async ready => {
  console.log("Online!");

  client.user.setPresence({
    activity: { name: "Growing bigger everyday! If you thought something dirty dont even talk." },
    status: "dnd"
  });
  const fs = require("fs");
  const path = require("path");

  function find(dir, callback) {
    fs.readdir(dir, function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        var filepath = path.join(dir, file);
        fs.stat(filepath, function(err, stats) {
          if (stats.isDirectory()) {
            find(filepath, callback);
          } else if (stats.isFile() && file.endsWith(".js")) {
            let props = require(`./${filepath}`);
            console.log(`Loaded Command ${props.help.name} ✔`);
            client.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
              client.aliases.set(alias, props.help.name);
            });
          }
        });
      });
    });
  }

  find('./commands/');
});


client.on("message", message => {


  if (!message.guild) return;


  if (message.author.bot) return;


  if (!message.content.startsWith(prefix)) return;


  let args = message.content.slice(prefix.length).trim().split(/ +/g);


  let cmdName = args.shift().toLowerCase();


  const cmd = client.commands.get(cmdName) || client.aliases.get(cmdName);


  if (!cmd) return message.channel.send(`"${cmdName}" does not exist!`)




  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.log(e);
  }
});
const token = "NzAxOTc0MDcwNzUyNzA2NjAx.Xp983Q.2vtHJ_-G6RA4aIWND2e71MZePSs";
client.login(token);