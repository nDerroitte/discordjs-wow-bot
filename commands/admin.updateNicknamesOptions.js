const { SlashCommandBuilder } = require('discord.js');
const sheetOption = require('../sheets/option');
const util = require('../utils/misc');
const em = require('../utils/embedBuilder');
const lib = require('../utils/lib');


module.exports =
{
	data: new SlashCommandBuilder()
		.setName('updatenicknamesoptions')
		.setDescription('Update the permissions required to use the commands from the Option sheet.'),
	async execute(interaction)
    {
		await interaction.deferReply({ephemeral:true});
		sheetOption.loadNameOptions().then(function(result) {
			interaction.client.ignoredSymbols = result[0] ;
			interaction.client.nicknamesDict = result[1] ;
		});

        await util.wait(4500)
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
