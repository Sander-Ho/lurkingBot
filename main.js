var config = require('./config.json');

const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    owner: config.owner,
    commandPrefix: config.prefix,
    disableEveryone: true
});﻿

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['random', 'random commands'],
        ['regular', 'simple commands'],
        ['admin', 'commands for admins']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'))
    ;


client.on('ready', () => {
    console.log('Logged in!');
    client.user.setActivity('§ is the prefix');
});

client.login(config.token);
