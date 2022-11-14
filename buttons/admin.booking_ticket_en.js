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
	data: 'booking_ticket_en',
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
        embed = em.getEmbed(`Hello ${interaction.member.displayName}`, "How can we help you ?\nPlease leave your request in this channel, one advertiser will contact you shortly.", 0x3399ff, "")
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Close ticket')
                .setEmoji('686925355637801023')
                .setStyle(ButtonStyle.Success),
        );
        await new_channel.send({embeds : [embed], components : [button]})
		await new_channel.send(`Hello ${interaction.member.toString()}, one of our <@&${lib.eng_adv_role_id}> advertiser will be there shortly.`)
        await interaction.editReply(`Your ticket is ready at <#${new_channel.id}>.`);
    }
}
