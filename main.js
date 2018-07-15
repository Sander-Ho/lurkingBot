require('dotenv').config();
const {
	CommandoClient
} = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
	owner: process.env.OWNER,
	commandPrefix: process.env.PREFIX,
	disableEveryone: true
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
		['random', 'random commands'],
		['regular', 'simple commands'],
		['timer', 'timing commands'],
		['admin', 'commands for admins']
		])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	console.log('Logged in!');
	client.user.setActivity(process.env.PREFIX + ' is the prefix');
});
//console.log("logging in with " + process.env.TOKEN + " as token");
client.login(process.env.TOKEN);
