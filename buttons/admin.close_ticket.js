const {
	ChannelType,
	PermissionFlagsBits,
	PermissionsBitField,
	ActionRowBuilder,
	ButtonStyle
} = require('discord.js');const em = require('../utils/embedBuilder');
const util = require('../utils/misc');
const lib = require('../utils/lib');

module.exports =
{
	data: 'close_ticket',
    async execute(interaction)
    {
		await interaction.deferReply()
		await interaction.channel.permissionOverwrites.set([
			{
			   id: interaction.guild.id,
			   deny: [PermissionsBitField.Flags.ViewChannel],
			},
			{
			   id: lib.mod_role_id, // MOD
			   allow: [PermissionsBitField.Flags.ViewChannel],
			},
			{
			   id: lib.support_role_id, // Support
			   allow: [PermissionsBitField.Flags.ViewChannel],
			},
		]);
        await interaction.editReply("Done. Only managers and moderators can see the channel now. To close it, just use the `/close` command, or delete it manually.");
    }
}
