const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the bot's latency."),

    async execute(interaction) {
        const sent = await interaction.reply({ content: "Pinging...", fetchReply: true, ephemeral: true });
        const ping = sent.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply({
            content: `🏓 **Pong!**\nBot-Latency: **${ping}ms**`,
            ephemeral: true
        });
    }
};