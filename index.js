//require the node modules we need
const Discord = require("discord.js");
//discord is essential
const { config } = require("dotenv");
//we need dotenv for some reason
const prefix = "_";
// our prefix
const client = new Discord.Client({
    disableEveryone: true
        // The bot cannot use @everyone
});
//commands
client.commands = new Discord.Collection();
//aliases
client.aliases = new Discord.Collection();
//when our bot is logged in run
client.on("ready", async ready => {
    console.log("Online!");
    //set our presence
    client.user.setPresence({
        activity: { name: "First Time Coding In JS" },
        status: "dnd"
    });
    const fs = require("fs");
    const path = require("path");
    /* 
      COMMAND LOADER
      This loads our commands into those two collections that we made.
      This also allows us to keep our file light and easy.
      If there ends up being an error while loading the command the 
      loader will throw an error
    */
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
    //call the function
    find('./commands/');
});


client.on("message", message => { //when someone sends a message in a <guild>channel that we are in

    //skip dms
    if (!message.guild) return;

    //skip stupid bots
    if (message.author.bot) return;

    //if its not a command don't run it
    if (!message.content.startsWith(prefix)) return;

    //remove the prefix from args and separate each separate argument by spaces 
    //const args = ['Hello', 'World!'] 
    //console.log(args[0]) 
    // output = Hello
    let args = message.content.slice(prefix.length).trim().split(/ +/g);

    // remove the command from the args but keep it as a separate value
    // old: ['say', 'Hello', 'World!']
    // new: ['Hello', 'World!']
    let cmdName = args.shift().toLowerCase();

    //get the command from our collections!
    const cmd = client.commands.get(cmdName) || client.aliases.get(cmdName);

    //if command returns null tell them 
    if (!cmd) return message.channel.send(`"${cmdName}" does not exist!`)

    //If were here, the command exists!


    try { //try to run it
        cmd.run(client, message, args);
    } catch (e) { //catch the error while running it
        console.log(e);
    }
});
const token = "NzAxOTc0MDcwNzUyNzA2NjAx.Xp983Q.2vtHJ_-G6RA4aIWND2e71MZePSs";
client.login(token);