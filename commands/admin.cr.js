const { SlashCommandBuilder } = require('discord.js');
const sheetOption = require('../sheets/option');
const util = require('../utils/misc');
const lib = require('../utils/lib');
const em = require('../utils/embedBuilder');


module.exports =
{
	data: new SlashCommandBuilder()
		.setName('cr')
		.setDescription('Check connected realms.')
		.addStringOption(option =>
			option
			.setName('realm')
			.setDescription('Realm to check.')
			.setRequired(true)
			//.setAutocomplete(true)
		),
	async execute(interaction)
    {
		await interaction.deferReply({ephemeral:false});
		const realm = (interaction.options.getString('realm') ?? 'error').toLowerCase();
        var embed = em.getEmbed(`Connected realm : ${realm}`, "", 0x3399ff, "")
		const connected_realms = util.getConnectedRealms(interaction.client, realm)
		embed = embed.addFields({ name: "Realms", value: connected_realms, inline : true})
        await interaction.editReply({embeds: [embed]});
	},
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = interaction.client.connectedRealmsFlat;
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
};
