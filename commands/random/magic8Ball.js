const commando = require('discord.js-commando');

var recource = require('../../recources/commands/magic8ball.json');

class MagicEightBall extends commando.Command {
    constructor(client) {
      super(client, {
        name: '8ball',
        group: 'random',
        memberName: 'magic 8 ball',
        description: 'gives you a random reply'
      });
    }

    async run(message, args) {
      var subCategoryResult = Math.floor(Math.random() * 3 + 1);
      switch (subCategoryResult) {
        case 1: //positive
          var actualResult = Math.floor(Math.random() * 10 + 1);
          message.channel.sendMessage(eval("recource.postive.option" + actualResult));
          break;

        case 2: // non-committal
          var actualResult = Math.floor(Math.random() * 5 + 1);
          message.channel.sendMessage(eval("recource.non-committal.option" + actualResult));
          break;

        default: //negative
            var actualResult = Math.floor(Math.random() * 5 + 1);
            message.channel.sendMessage(eval("recource.negative.option" + actualResult));
            break;
          }
      }
    }

module.exports = MagicEightBall
