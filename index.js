'use strict';

require('dotenv').config()

const Discord = require('discord.js')
const fs = require('fs');

const prefix = process.env.PREFIX
const dispatchWord = process.env.DISPATCH_WORD

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

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
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`HEY DUMM ASS wait ${timeLeft.toFixed(1)} more second(s) the \`${command.name}\` command. NOT SPAM`);
			}
		}
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Much pressino, error trying to execute that command! fucker!');
	}
});


client.login(process.env.BOT_TOKEN);