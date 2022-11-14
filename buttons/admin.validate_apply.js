const { ButtonBuilder } = require('discord.js');
const em = require('../utils/embedBuilder');
const util = require('../utils/misc');
const lib = require('../utils/lib');

module.exports =
{
	data: 'validate_apply',
    async execute(interaction){
        await interaction.deferReply({ephemeral : false});
        allowed = false
        const permissions = interaction.client.permissionsDict["apply"]
        const member_roles = interaction.member.roles.cache.map(role => role);
        for(role of member_roles)
        {
            if(permissions.includes(role.id))
            {
                allowed = true
                break;
            }
        }
        if(allowed)
        {
			existing_embed = interaction.message.embeds[0]
			roles_to_add = []
			for(field of existing_embed.fields)
				if(field["name"].includes("Role that would be added"))
					roles_to_add = field["value"].slice().split(" ")
			user_id = interaction.message.interaction.user.id.toString()
			let applier = await interaction.guild.members.fetch(user_id)
			await applier.roles.remove("628784859745353729")
			for(role of roles_to_add)
			{
				role_id = role.replace("<@&", "").replace(">", "")
				real_role = util.getRoleBySTRID(interaction.guild, role_id)
				await applier.roles.add(real_role)
			}
			try {
				await applier.setNickname(existing_embed.title)
				embed = em.embedFromJson(existing_embed.toJSON())
	            embed = embed.addFields(
	                { name: "Status", value: `Validated`, inline : true},
	            );
	            await interaction.message.edit({
	                embeds : [embed],
	                components : []
	            });
				//
				embed = em.getEmbed(`Welcome to Gino's`, "Your application was accepted.", 0x3399ff, "")
				embed = embed.addFields(
					{ name: "How to join a M+ boost?", value: "A new channel will be created, and you'll be tag according to your roles. Make sure to reply with your role and spec!", inline : false},
					{ name: "How to update my M+ roles?", value: "Head over to the <#1040749098359345342> channel.", inline : false},
					{ name: "How do I get paid?", value: "You will be paid on the client's realm. If you need to transfer your gold to another realm, head over to <#773218672679976990>.", inline : false},
				)
				await applier.send({embeds : [embed]})
				//
				await util.wait(2000)
	            await interaction.deleteReply()
				await interaction.message.delete()

			} catch (e) {
				await interaction.editReply({content : "I don't have the permissions to modify Moderator or higher."});
	            await util.wait(2000)
	            await interaction.deleteReply()
				await interaction.message.delete()
				// embed = em.embedFromJson(existing_embed.toJSON())
	            // embed = embed.addFields(
	            //     { name: "Status", value: `Not enough permissions`, inline : true},
	            // );
				// embed = embed.setColor(0xff0000);
				// embed = embed.setDescription("Request failed.")
	            // await interaction.message.edit({
	            //     embeds : [embed],
	            //     components : []
	            // });
			}
        }
        else
        {
            await interaction.editReply({content : "You don't have the permissions to validate an application."});
            await util.wait(2000)
            await interaction.deleteReply()
            return;
        }
    }

}
