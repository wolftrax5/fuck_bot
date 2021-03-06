
const replies = [ 'Fuck you', 'Bullshit', 'Bastard', 'Asshole', 'Son of a bitch', 'Dickhead', 'Motherfucker', '🖕']

module.exports = {
	name: 'fucku',
	description: 'Tell to that special person something special',
	execute(msg, args) {
        if (!msg.mentions.users.size) {
            return msg.reply('FUCK ALL OF YOU !!!');
        }
        const fuckList = msg.mentions.users.map(user => {
            const index = Math.floor(Math.random() * replies.length)
			return `HEY @${user.username} ${replies[index].toUpperCase()}`;
		});

		msg.channel.send(fuckList);
    }
};