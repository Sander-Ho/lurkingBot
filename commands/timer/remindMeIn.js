const Commando = require('discord.js-commando');
var date = new Date();

class RemindMe extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'remind',
            group: 'timer',
            memberName: 'remind me in',
            description: 'sends you a message after the time you gave him.',
            examples: ['remind me in/at (20 h/min/sec)/(15:20)  your message here'],
            args: [{
                key: 'content',
                prompt: 'give when and what to remind you off example:  ?',
                type: 'string'
            }]
        });
    }

    async run(msg, {
        content
    }) {
        var words = content.substring(0).split(' ');
        var commandType = words[2];
        words.shift(); // removing strings out of the array
        words.shift();
        if (commandType = "in") { // remind me in command
            var timeAmmount = words[0]; // getting ammount of time out of array
            if (!isNaN(timeAmmount)) { //checking if its a number
                words.shift();
                var timeType = words[0];
                switch (timeType) {
                    case 'h':
                        if (timeAmmount <= 24) { // making sure time isn't too long
                            var miliseconds = timeAmmount * 3600000; // multiplying so we have the ammount of time in Miliseconds
                        } else {
                            return msg.say(timeAmmount + " h is too long choose a number under 24h");
                        }
                        break;
                    case 'min':
                        if (timeAmmount <= 1000) { // making sure time isn't too long
                            var miliseconds = timeAmmount * 60000; // mmultiplying so we have the ammount of time in Miliseconds
                        } else {
                            return msg.say(timeAmmount + " min is too long choose a number under 1000h");
                        }
                        break;
                    case 'sec':
                        if (timeAmmount <= 3600) { // making sure time isn't too long
                            var miliseconds = timeAmmount * 1000; // mmultiplying so we have the ammount of time in Miliseconds
                        } else {
                            return msg.say(timeAmmount + " sec is too long choose a number under 3600sec");
                        }
                        break;
                    default:
                        return msg.say(timeType + " is not a time type. try \n remind me in/at (20 h/min/sec)/(15:20)  your message here");
                        break;
                }
                var messageString = "";
                words.shift();
                words.forEach(makeMessageString)
                function makeMessageString(word) {
                    messageString += " " + word;
                }
                msg.say('will remind you of' + messageString + " in " + timeAmmount + " " + timeType);
                var interval = setInterval(function() {
                        msg.reply(messageString);
                }, miliseconds);
            } else return msg.say(timeAmmount + " is not a valid number. try \n remind me in/at (20 h/min/sec)/(15:20)  your message here");
        } else if (commandType = "at") { // remind me at command
            var current_hour = date.getHours();
            var current_minute = date.getMinutes();
            var current_minute = date.getSeconds();
            msg.reply("this is work in progress");
        } else {
            return msg.say(commandType + " is wrong command type try. \n remind me in/at (20 h/min/sec)/(15:200) your message here");
        }
    }
};
module.exports = RemindMe;
