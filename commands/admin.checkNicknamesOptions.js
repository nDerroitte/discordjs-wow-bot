const { SlashCommandBuilder } = require('discord.js');
const sheetOption = require('../sheets/option');
const util = require('../utils/misc');
const lib = require('../utils/lib');
const em = require('../utils/embedBuilder');


module.exports =
{
	data: new SlashCommandBuilder()
		.setName('checknicknamesoptions')
		.setDescription('Check the nicknames options from the Google Sheet.'),
	async execute(interaction)
    {
		await interaction.deferReply({ephemeral:false});
        embed = em.getEmbed(`Nicknames`, `List of nicknames. You can access the permissions sheet [here](${lib.option_sheet_url}).`, 0x3399ff, "")

        nicks_str = ""
		symbols_str = ""
		for (const [key, value] of Object.entries(interaction.client.nicknamesDict))
			nicks_str += `${key} <-> ${value} \n`
		for(s of interaction.client.ignoredSymbols)
			symbols_str += `${s} `

        embed = embed.addFields(
            { name: "Ignored Symbols", value: symbols_str, inline : false},
			{ name: "Nicknames", value: nicks_str, inline : false},
        )
          await interaction.editReply({embeds: [embed]});
	},
};
