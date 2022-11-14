const { ButtonBuilder } = require('discord.js');
const em = require('../utils/embedBuilder');
const util = require('../utils/misc');
const lib = require('../utils/lib');

module.exports =
{
	data: 'deny_apply',
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
            embed = em.embedFromJson(interaction.message.embeds[0].toJSON())
            embed = embed.setDescription("Request denied.")
            embed = embed.addFields(
                { name: "Status", value: `Denied`, inline : true},
            );
            embed = embed.setColor(0xff0000);
            await interaction.message.edit({
                embeds : [embed],
                components : []
            });
			await util.wait(2000)
			await interaction.deleteReply()
			await interaction.message.delete()
        }
        else
        {
            await interaction.editReply({content : "You don't have the permissions to deny an application."});
            await util.wait(2000)
            await interaction.deleteReply()
            return;
        }
    }

}
