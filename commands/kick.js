module.exports = {
	name: 'kick',
	description: 'kick!',
	execute(msg, args) {
		if (!msg.mentions.users.size) {
            return msg.reply('you need to tag a user in order to kick them!');
        }
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = msg.mentions.users.first();

        msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
};