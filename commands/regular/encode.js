const Commando = require('discord.js-commando');

class EncodeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'encode',
			group: 'regular',
			memberName: 'encode',
			description: 'Replies with the text you provide.',
			examples: ['say Hi there!'],
			args: [
			{
				key: 'text',
				prompt: 'What text would you like the bot to say?',
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
};
module.exports = EncodeCommand;
