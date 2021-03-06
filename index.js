const Discord = require('discord.js')
const { prefix } = require('./config.json');

require('dotenv').config()

const client = new Discord.Client();


client.on('ready', ()=>{console.log('Ready Discord')})

client.on('message', gotMessage);

function gotMessage(msg){
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'kick') {
        if (!msg.mentions.users.size) {
            return msg.reply('you need to tag a user in order to kick them!');
        }
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = msg.mentions.users.first();
    
        msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
}

client.login(process.env.BOT_TOKEN);