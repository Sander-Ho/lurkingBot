const Commando = require('discord.js-commando');

class SayCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'regular',
            memberName: 'say',
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
        return msg.say(text);
    }
};
module.exports = SayCommand;
