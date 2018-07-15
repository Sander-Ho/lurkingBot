const Commando = require('discord.js-commando');
const CryptoJS = require('crypto-js');

class EncodeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'pass',
            group: 'regular',
            memberName: 'pass encode/decode',
            description: 'encodes text for you based on the pass you give.',
            examples: ['pass encode password > text you want encode', 'pass decode password > text you want decode'],
            args: [{
                key: 'text',
                prompt: 'Give me the option, pass and text like: \n pass encode/decode password > text',
                type: 'string'
            }]
        });
    }
    async run(msg, {text}) {
        msg.delete();
        var option = text.split(" ", 1);
        var text = text.substr(text.indexOf(" ") + 1);
        var arg = text.split(" > ");
        if (option == "encode") {
            return msg.say(CryptoJS.AES.encrypt(arg[1], arg[0]).toString());
        } else if (option == "decode") {
            return msg.say(CryptoJS.AES.decrypt(arg[1], arg[0]).toString(CryptoJS.enc.Utf8));
        } else {
            //return msg.say(CryptoJS.AES.decrypt(CryptoJS.AES.encrypt('It works!!!', 'pass').toString(), 'pass').toString(CryptoJS.enc.Utf8));
            return msg.say("wrong use of command\nGive me the pass and text like: \n pass encode/decode password > text");
        }
    }
}
module.exports = EncodeCommand;