module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 3,
	execute(msg, args) {
		msg.channel.send('Pong.');
	},
};