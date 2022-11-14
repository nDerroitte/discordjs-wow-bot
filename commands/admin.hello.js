const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Always nice to say hello'),
	async execute(interaction)
    {
        //await interaction.user.send("Pong, hm idk");
		await interaction.reply('Well, hello there! :smile:');
		//ephemeral = permet que seul le gars qui a utilisé la commande puisse voir le résultat
		//editReply
	},
};
