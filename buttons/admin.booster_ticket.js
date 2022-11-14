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
	data: 'booster_ticket',
    async execute(interaction)
    {
        await interaction.deferReply({ephemeral : true});
        let new_channel = await interaction.guild.channels.create({
            name: `booster-ticket-${lib.booking_counter++}`,
            type: ChannelType.GuildText,
            parent: lib.booster_area_cat_id,
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
                   id: interaction.user.id,
                   allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ]
        });
        embed = em.getEmbed(`Hello ${interaction.member.displayName}`, "How can we help you ?\nPlease leave your question(s) or request(s) here. We will reach back to you as soon as possible.", 0x3399ff, "")
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Close ticket')
                .setEmoji('686925355637801023')
                .setStyle(ButtonStyle.Success),
        );
        await new_channel.send({embeds : [embed], components : [button]})
		await new_channel.send(`Hi ${interaction.member.toString()}. How can we help you? Someone from our <@&${lib.support_role_id}> team will reply shortly.`)
        await interaction.editReply(`Your ticket is ready at <#${new_channel.id}>.`);
    }
}
