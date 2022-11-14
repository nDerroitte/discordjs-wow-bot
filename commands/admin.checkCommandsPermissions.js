const { SlashCommandBuilder } = require('discord.js');
const sheetOption = require('../sheets/option');
const util = require('../utils/misc');
const lib = require('../utils/lib');
const em = require('../utils/embedBuilder');


module.exports =
{
	data: new SlashCommandBuilder()
		.setName('checkcommandspermissions')
		.setDescription('Check the permissions required to use the commands from the Option sheet.'),
	async execute(interaction)
    {
		await interaction.deferReply({ephemeral:false});
        embed = em.getEmbed(`Commands Permissions`, `List of permissions. You can access the permissions sheet [here](${lib.option_sheet_url}).`, 0x3399ff, "")

        apply_roles_str = ""
        validate_role_str = ""
        validate_all_role_str = ""
        for(r of interaction.client.permissionsDict["apply"])
            apply_roles_str += `<@&${r}> `
        for(r of interaction.client.permissionsDict["validate_boost"])
            validate_role_str += `<@&${r}> `
        for(r of interaction.client.permissionsDict["validate_all_boost"])
            validate_all_role_str += `<@&${r}> `

        embed = embed.addFields(
            { name: "Validate applies", value: apply_roles_str, inline : false},
            { name: "Validate own boosts", value: validate_role_str, inline : false},
            { name: "Validate all boosts", value: validate_all_role_str, inline : false},
			{ name: "Update these permissions", value: "You can update these permissions by modifying the value in the sheet linked above and then using the `/commandspermissionsupdate` command.", inline : false},
        )
          await interaction.editReply({embeds: [embed]});
	},
};
