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
	data: 'apply_ticket',
    async execute(interaction)
    {
        await interaction.deferReply({ephemeral : true});
        let new_channel = await interaction.guild.channels.create({
            name: `apply-ticket-${lib.apply_counter++}`,
            type: ChannelType.GuildText,
            parent: lib.apply_cat_id,
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
        embed = em.getEmbed(`Hello ${interaction.member.displayName}`, "Please let us know what role(s) you want to apply to, and why we should trust you with it/them.", 0x3399ff, "")
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Close ticket')
                .setEmoji('686925355637801023')
                .setStyle(ButtonStyle.Success),
        );
        await new_channel.send({embeds : [embed], components : [button]})
		await new_channel.send(`Hi ${interaction.member.toString()}. Please make sure to detail your expertise related to the role you applied for!`)
        await interaction.editReply(`Your ticket is ready at <#${new_channel.id}>.`);
    }
}
