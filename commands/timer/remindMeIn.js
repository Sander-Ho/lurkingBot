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
        words.shift(); // removing me
        var commandType = words[0]; // getting at/in and removing it from the array
        words.shift();
        if (commandType == "in") { // remind me in command
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
                        return msg.say(timeType + " is not a time type. try \n remind me in 20 h/min/sec  your message here");
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
                    clearInterval(interval);
                }, miliseconds);

            } else return msg.say(timeAmmount + " is not a valid number. try \n remind me in 20 h/min/sec  your message here");
        } else if (commandType == "at") { // remind me at command
            var current_hour = date.getHours();
            var current_minute = date.getMinutes();
            var requestedTime = words[0];
            var messageString = "";
            var timeUnits = requestedTime.substring(0).split(':');
            var counter = 0;
            var milisecondsUntillRequestedTime = 0;
            words.shift();
            words.forEach(function(word) {
                messageString += " " + word;
            });
            if (timeUnits.length <= 3) {
                if(!isNaN(timeUnits[0]) && !isNaN(timeUnits[1])){
                    var timeDifferenceHours = timeUnits[0] - current_hour;
                    if(timeDifferenceHours < 0)
                        timeDifferenceHours += 24;
                    var timeDifferenceMin = timeUnits[1] - current_minute;
                    if(timeDifferenceMin < 0){
                        if(timeDifferenceHours = 0)
                            timeDifferenceHours = 25;
                        timeDifferenceHours -= 1 ;
                        timeDifferenceMin += 60;
                    }
                    milisecondsUntillRequestedTime = timeDifferenceMin * 60000 + timeDifferenceHours * 3600000;
                    msg.say("will remind you at " + requestedTime + " of" + messageString);
                    var interval = setInterval(function() {
                        msg.reply("it is " + requestedTime + " " + messageString);
                        clearInterval(interval);
                    }, milisecondsUntillRequestedTime);
                }else {
                    return msg.say(requestedTime + " is not a valid time. try \n remind me at 15:20 your message here");
                }
                /*timeUnits.forEach(function(timeUnit) {
                    if (isNaN(timeUnit)) {
                        return msg.say(timeUnit + " is not a timeUnit. try \n remind me at 15:20 your message here");
                    } else {
                        counter =  1 + counter;
                        switch (counter) {
                            case 1:
                                var math = timeUnit - current_hour;
                                if (math < 0)
                                    math += 24;
                                milisecondsUntillRequestedTime += math * 3600000;
                                break;
                            case 2:
                                var math = timeUnit - current_minute;
                                if (math < 0) {
                                    math += 60;
                                    if (timeUnits[1] = current_hour) {
                                        milisecondsUntillRequestedTime += math * 60000 + 3600000*24;
                                    } else {

                                        milisecondsUntillRequestedTime += math * 60000 - 3600000;
                                    }
                                } else {
                                    milisecondsUntillRequestedTime += math * 60000;
                                }
                                msg.say("will remind you at " + requestedTime + " of" + messageString);
                                var interval = setInterval(function() {
                                    msg.reply("it is " + requestedTime + " " + messageString);
                                    clearInterval(interval);
                                }, milisecondsUntillRequestedTime);
                                break;
                        }
                    }
                });*/

            } else {
                console.log(timeUnits + timeUnits.length);
                return msg.say(requestedTime + " is not a valid time. try \n remind me at 15:20 your message here");
            }


        } else {
            return msg.say(commandType + " is wrong command type try. \n remind me in/at (20 h/min/sec)/(15:20) your message here");
        }
    }
};
module.exports = RemindMe;
