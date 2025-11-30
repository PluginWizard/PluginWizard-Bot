const discord = require('discord.js');
const { Logger } = require('./util/Logger');
require('dotenv').config();
const commands = require('./util/commands'); // List of commands

const TOKEN = process.env.DISCORD_TOKEN;

const client = new discord.Client({
    intents: []
})

client.commands = new discord.Collection();
for (const key in commands) {
    const command = commands[key];
    client.commands.set(command.data.name, command);
}

// Register command interaction handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        Logger.error('Error executing command:', error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.once('ready', () => {
    Logger.info(`Logged in as ${client.user.tag}!`);

    // Set rich presence status
    client.user.setActivity({
        name: "Playing PluginWizard"
    });
});

client.login(TOKEN).catch(err => {
    Logger.error('Failed to login:', err);
})