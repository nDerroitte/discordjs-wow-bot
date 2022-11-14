const {
	ButtonBuilder,
	ChannelType,
	PermissionFlagsBits,
	PermissionsBitField,
	ActionRowBuilder,
	ButtonStyle
} = require('discord.js');
const em = require('../utils/embedBuilder');
const util = require('../utils/misc');
const lib = require('../utils/lib');

module.exports =
{
	data: 'booking_ticket_gb',
    async execute(interaction)
    {
        await interaction.deferReply({ephemeral : true});
        let new_channel = await interaction.guild.channels.create({
            name: `booking-ticket-${lib.help_client_counter++}`,
            type: ChannelType.GuildText,
            parent: lib.client_cat_id,
            permissionOverwrites: [
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
				{
                   id: lib.trusted_adv_role_id, // TRUSTED ADV
                   allow: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                   id: interaction.user.id,
                   allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ]
        });
        embed = em.getEmbed(`Hey ${interaction.member.displayName}`, "Wie können wir dir weiterhelfen?", 0x3399ff, "")
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Ticket schließen')
                .setEmoji('686925355637801023')
                .setStyle(ButtonStyle.Success),
        );
        await new_channel.send({embeds : [embed], components : [button]})
		await new_channel.send(`Hey ${interaction.member.toString()}, ein <@&${lib.gb_adv_role_id}> ADV wird sich schnellstmöglich darum kümmern!`)
        await interaction.editReply(`Your ticket is ready at <#${new_channel.id}>.`);
    }
}
