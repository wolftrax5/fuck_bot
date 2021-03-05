const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', ()=>{console.log('Ready Discord')})

client.on('message', gotMessage);

function gotMessage(msg){
    if(msg.content==='carlos'){
        msg.channel.send('JODETE')
    }
}