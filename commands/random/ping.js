const commando = require('discord.js-commando');

class Test extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'test',
            group: 'random',
            memberName: 'test',
            description: 'reply\'s with status'
        });
    }

    async run(message, args) {
          message.channel.sendMessage('I\'m here don\'t worry'); //sends message in the channel of the message
    }
}

module.exports = Test
