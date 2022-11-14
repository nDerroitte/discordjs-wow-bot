const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('Delete the current channel.'),
	async execute(interaction)
    {
		await interaction.reply('Bye everyone!');
        await interaction.channel.delete()
	},
};
