const commandList = require('./util/commands'); // List of commands
const { Routes, REST } = require('discord.js');
const { Logger } = require('./util/Logger');
require('dotenv').config();

const commands = [];
for (const key in commandList) {
    const command = commandList[key];
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        Logger.info('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID),
            { body: commands },
        );

        Logger.info('Successfully reloaded application (/) commands.');
    } catch (error) {
        Logger.error('Error reloading application (/) commands:', error);
    }
})();