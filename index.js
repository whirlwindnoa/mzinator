"use strict";
const fs = require('fs');
const Database = require('./misc/db.js');

if(!fs.existsSync('.env')) {
    fs.copyFileSync('.env.template', '.env');

    process.exit();
}

require('dotenv').config();
global.env = Object.assign({}, process.env);
global.db = new Database('mzinator');

const { Collection, Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once(Events.ClientReady, c => {
	console.log(`ready... logged in as ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(env.PREFIX) || message.author.bot) {
        return;
    }

    const args = message.content.slice(env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
        console.log(message, args);
    } catch (error) {
        message.reply('An error has occured while executing this command.');
        
        console.error(error);
    }
});

client.login(env.DISCORD_TOKEN);