const { SlashCommandBuilder } = require('discord.js');
const sheetOption = require('../sheets/option');
const util = require('../utils/misc');
const em = require('../utils/embedBuilder');
const lib = require('../utils/lib');


module.exports =
{
	data: new SlashCommandBuilder()
		.setName('updatecr')
		.setDescription('Update the connected realms from the Option sheet.'),
	async execute(interaction)
    {
		await interaction.deferReply({ephemeral:true});
		sheetOption.loadConnectedRealms().then(function(result) {
			interaction.client.connectedRealms = result;
		});

        await util.wait(4500)
		embed = em.getEmbed(`Connected Realms Update`, `Done !`, 0x3399ff, "")
        await interaction.editReply({embeds: [embed]});
	},
};
