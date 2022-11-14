const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('dotenv').config();
const sheetOption = require('./sheets/option');



const discordToken = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

// ------------------------------------------- SET UP COMMANDS  -------------------------------------------

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.startsWith("admin")).filter(file => file.endsWith('.js'));

// Ajoute les commandes au pathfiles
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// ------------------------------------------- SET UP BUTTONS  -------------------------------------------

// Button Handler
client.buttons = new Collection();
const buttonPath = path.join(__dirname, 'buttons');
const buttonFolders = fs.readdirSync(buttonPath).filter(file => file.startsWith("admin")).filter(file => file.endsWith('.js'));

for (const file of buttonFolders) {
	const filePath = path.join(buttonPath, file);
	const button = require(filePath);
    client.buttons.set(button.data, button);
}

// --------------------------------------------- SET UP OPTIONS  ----------------------------------------

sheetOption.loadPermission().then(function(result) {
	client.permissionsDict = result;
});
sheetOption.loadNameOptions().then(function(result) {
	client.ignoredSymbols = result[0];
	client.nicknamesDict = result[1];
});
sheetOption.loadConnectedRealms().then(function(result) {
	client.connectedRealms = result;
	client.connectedRealmsFlat = result.flat();
});

// ------------------------------------------- SET UP EVENTS  -------------------------------------------
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.startsWith("admin")).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// ------------------------------------------- LOGIN  -------------------------------------------


// Log in to Discord with your client's token
client.login(discordToken);
