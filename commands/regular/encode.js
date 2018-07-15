const Commando = require('discord.js-commando');

class EncodeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'encode',
			group: 'regular',
			memberName: 'encode',
			description: 'sends the same message but shifts every letter one further in the alphabet.',
			examples: ['encode this'],
			args: [
			{
				key: 'text',
				prompt: 'What text would you like the bot to encode?',
				type: 'string'
			}
			]
		});
	}
	async run(msg, { text }) {
		msg.delete();
		text = text.replace(/[a-zA-Z]/g, function(temp) {
			if (temp === 'z') return 'a';
			else if (temp === 'Z') return 'A';
			else return String.fromCharCode(temp.charCodeAt(0) + 1);
		});
		return msg.say(text);
	}
}
module.exports = EncodeCommand;
