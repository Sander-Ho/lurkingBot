const commando = require('discord.js-commando');
var config = require('./config.json');
const bot = new commando.Client({
  owner: config.owner,
  commandPrefix: config.prefix,
});﻿
bot.login(config.token);


bot.registry.registerGroup('random','Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "\\commands");

var recource = require('./recources/commands/magic8ball.json');
console.log(recource);
