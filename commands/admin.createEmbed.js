const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const em = require('../utils/embedBuilder');
const util = require('../utils/misc');
const lib = require('../utils/lib');

module.exports =
{
	data: new SlashCommandBuilder()
		.setName('createembed')
		.setDescription('Create bot message for specific channel.')
		.addStringOption(option =>
			option
			.setName('type')
			.setDescription('Which embed message are you trying to create')
			.setRequired(true)
			.addChoices(
				{ name: 'Apply info', value: 'apply' },
				{ name: 'Help and Support - Booster', value: 'booster_tickets' },
				{ name: 'Help and Support - Client', value: 'client_tickets' },
				{ name: 'Booking Ticket', value: 'booking_tickets' },
				{ name: 'Apply ticket', value: 'apply_tickets' },
				{ name: 'Update ticket', value: 'update_tickets' },
				{ name: 'Update', value: 'update' },
			)
		)
		.addChannelOption(option =>
			option.setName('channel')
			.setDescription('The channel where to send the bot message.')
			.setRequired(true)
		),
	async execute(interaction)
    {
		await interaction.deferReply({ephemeral:true});
		const type = (interaction.options.getString('type') ?? 'error').toLowerCase();
		const channel = interaction.options.getChannel('channel');

		if(type == "booster_tickets")
		{
			embed = em.getEmbed(`Help and support`, "Looking for informations or having questions / suggestions ?\nFeel free to create a ticket here.", 0x3399ff, "")
			const button = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('booster_ticket')
					.setLabel('Help & Support')
					.setEmoji('686925355637801023')
					.setStyle(ButtonStyle.Primary),
			);
			await channel.send({embeds : [embed], components : [button]})
			await interaction.editReply({content: "Done", ephemeral:true});
		}
		else if(type == "client_tickets")
		{
			embed = em.getEmbed(`Help and support`, "Looking for informations or having questions / suggestions ?\nFeel free to create a ticket here.", 0x3399ff, "")
			const button = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('client_ticket')
					.setLabel('Help & Support')
					.setEmoji('686925355637801023')
					.setStyle(ButtonStyle.Primary),
			);
			await channel.send({embeds : [embed], components : [button]})
			await interaction.editReply({content: "Done", ephemeral:true});
		}
		else if(type == "booking_tickets")
		{
			embed = em.getEmbed(`Booking`, "Hello ! Looking for a boost ? Just open a ticket, one of our advertiser will make sure to connect you with our mercenaries as soon as possilbe !\n", 0x3399ff, "")
			embed = embed.addFields(
				{ name: "🇫🇷", value: `Hello ! Pour réserver un boost, ouvre un ticket ici en dessous.`, inline : false},
				{ name: "🇩🇪", value: `Hi. Suchst du nach Söldnern zur Unterstützung oder du hast eine Frage? Reagiere hier`, inline : false}
			);
			const buttons = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('booking_ticket_en')
					.setLabel('🇬🇧 Ticket')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('booking_ticket_fr')
					.setLabel('🇫🇷 Ticket')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('booking_ticket_gb')
					.setLabel('🇩🇪 Ticket')
					.setStyle(ButtonStyle.Success)

			);
			await channel.send({embeds : [embed], components : [buttons]});
			await interaction.editReply({content: "Done", ephemeral:true});
		}
		else if(type == "update_tickets")
		{
			embed = em.getEmbed(`Request other roles`, "In order to request Mythic + related roles, head over to <#1040749098359345342>.\For any other role request, free to create a ticket here!", 0x3399ff, "")
			const button = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('update_ticket')
					.setLabel('Role ticket')
					.setEmoji('686925355637801023')
					.setStyle(ButtonStyle.Primary),
			);
			await channel.send({embeds : [embed], components : [button]})
			await interaction.editReply({content: "Done", ephemeral:true});
		}
		else if(type == "apply_tickets")
		{
			embed = em.getEmbed(`Apply tickets`, "In order to request Mythic + related roles, head over to <#1039678137103044628>.\nOtherwise, free to create a ticket here!", 0x3399ff, "")
			const button = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId('apply_ticket')
					.setLabel('Apply ticket')
					.setEmoji('686925355637801023')
					.setStyle(ButtonStyle.Primary),
			);
			await channel.send({embeds : [embed], components : [button]})
			await interaction.editReply({content: "Done", ephemeral:true});
		}
		else if(type == "apply")
		{
			embed = em.getEmbed(`How to apply`, "Just use the `/apply` command in this channel", 0x3399ff, "")
			embed = embed.addFields(
				{ name: "Requirements", value: `<@&1039702602566336512> : 2300 Mythic Score\n <@&1039702022653476904>: 2800 Mythic Score`, inline : false},
				{ name: "Apply on several character", value: "Once accepted on your main, you will be able to add alts to your profile in the update channel.", inline : false},
			)
			await channel.send({embeds : [embed]})
			await interaction.editReply({content: "Done", ephemeral:true});
		}
		else if(type == "update")
		{
			embed = em.getEmbed(`How to update your roles`, "Just use the `/update` command in this channel", 0x3399ff, "")
			embed = embed.addFields(
				{ name: "Updating your main", value: "To update your main (the character linked to your discord name), use the `/update` command without paramaters.", inline : true},
				{ name: "Updating your alt", value: "To update your alts, use the `/update` with the name and the realm of the alt.", inline : true},
				{ name: "Requirements", value: `<@&1039702602566336512> : 2300 Mythic Score\n <@&1039702022653476904>: 2800 Mythic Score`, inline : false},
				{ name: "Apply on several character", value: "Once accepted on your main, you will be able to add alts to your profile in the update channel.", inline : false},
			)
			await channel.send({embeds : [embed]})
			await interaction.editReply({content: "Done", ephemeral:true});
		}
	},
};
