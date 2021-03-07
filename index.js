'use strict';

require('dotenv').config()

const Discord = require('discord.js')
const fs = require('fs');

const prefix = process.env.PREFIX
const dispatchWord = process.env.DISPATCH_WORD

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Bot Ready! 🖕');
});

client.on('message', message => {
    let re = new RegExp(dispatchWord, 'gi');
    if(message.content.match(re) && !message.author.bot) {
        message.channel.send(`JODETE ${dispatchWord}`);
    }
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(process.env.BOT_TOKEN);