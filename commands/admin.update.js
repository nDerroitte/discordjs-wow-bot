const fetch = require("node-fetch");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const em = require('../utils/embedBuilder');
const util = require('../utils/misc');
const lib = require('../utils/lib');

module.exports =
{
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription('Update your M+ roles. Without parameter, it will update your roles based on your discord name.')
        .addStringOption(option =>
			option
			.setName('name')
			.setDescription('Optional : the name of the alt you want to update.')
			.setRequired(false)
		)
		.addStringOption(option =>
			option
			.setName('realm')
			.setDescription('Optional : the realm of the alt you want to update.')
			.setRequired(false)
		)
		.setDMPermission(false),
	async execute(interaction)
    {
		await interaction.deferReply({ephemeral: false});
		const region = "eu"
        var realm = util.capitalizeFirstLetter(interaction.options.getString('realm') ?? 'error');
        var name = util.capitalizeFirstLetter(interaction.options.getString('name') ?? 'error');
        //const fields = "mythic_plus_scores_by_season%3Acurrent"
		const fields = "mythic_plus_scores_by_season%3Aseason-sl-4"
		if((name != "Error" && realm == "Error") || (name == "Error" && realm != "Error"))
		{
			desc = "Please provide both the *name* and *realm* of the alt you want to update."
					+"\nTo update the character linked to your discord name, you can use `/update` without paramaters."
			embed = em.getEmbed(`Incorrect usage`, desc, 0xff0000, interaction.member.displayAvatarURL({ dynamic:true }))
			await interaction.editReply({embeds: [embed]});
			return ;
		}
		else if (name == "Error" && realm == "Error")
		{
			const display_name = util.getRealName(interaction.client, interaction.member.displayName)
			name  = display_name.split("-")[0]
			realm = display_name.split("-")[1]
		}
		url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=${fields}`
        // fetch data
        fetch(url).then(
            function(response)
            {
                return response.json();
            }
        ).then(
            async function(data) {
                wow_class = data["class"]
                rio = data["mythic_plus_scores_by_season"][0]['scores']['all']
                rio_heal = data["mythic_plus_scores_by_season"][0]['scores']['healer']
                rio_tank = data["mythic_plus_scores_by_season"][0]['scores']['tank']
                rio_dps = data["mythic_plus_scores_by_season"][0]['scores']['dps']
                if (rio < lib.rio_prestige)
                {
                    embed = em.getEmbed(`${name}-${realm}`, "", 0xff0000, data["thumbnail_url"])
                    embed = embed.addFields(
                        { name: "Overall Score", value: `${rio}`, inline : true},
                        { name: "Class", value: `${wow_class}`, inline : true},
                        { name: '\u200B', value: '\u200B' },
                        { name: "Not enough Mythic Score", value: `The minimal Mythic Score needed is ${lib.rio_prestige}.`},
                    )
                      await interaction.editReply({embeds: [embed]});
					  return;
                }
                else
                {
                    var role_array = []
                    role_array.push(util.getRoleByName(interaction.guild, wow_class))
                    role_array.push(util.getRoleByName(interaction.guild, "M+ Prestige"))
                    if (rio > lib.rio_allstar)
                        role_array.push(util.getRoleByName(interaction.guild, "M+ All Star"))
					if (rio_tank > lib.rio_allstar)
                        role_array.push(util.getRoleByName(interaction.guild, "Tank All Star"))
					if (rio_heal > lib.rio_allstar)
                        role_array.push(util.getRoleByName(interaction.guild, "Healer All Star"))
					if (rio_dps > lib.rio_allstar)
                        role_array.push(util.getRoleByName(interaction.guild, "Dps All Star"))
					if (rio_tank > lib.rio_prestige)
                        role_array.push(util.getRoleByName(interaction.guild, "Tank Prestige"))
					if (rio_heal > lib.rio_prestige)
                        role_array.push(util.getRoleByName(interaction.guild, "Healer Prestige"))
					if (rio_dps > lib.rio_prestige)
                        role_array.push(util.getRoleByName(interaction.guild, "Dps Prestige"))
                    if (["Rogue", "Monk", "Demon Hunter","Druid"].includes(wow_class))
                        role_array.push(util.getRoleByName(interaction.guild, "Leather"))
                    if (["Paladin", "Warrior", "Death Knight"].includes(wow_class))
                        role_array.push(util.getRoleByName(interaction.guild, "Plate"))
                    if (["Hunter", "Shaman", "Evoquer"].includes(wow_class))
                        role_array.push(util.getRoleByName(interaction.guild, "Mail"))
                    if (["Priest", "Mage", "Warlock"].includes(wow_class))
                        role_array.push(util.getRoleByName(interaction.guild, "Cloth"))

					const member_roles_id = interaction.member.roles.cache.map(role => role.id);
					for(var i = role_array.length - 1; i >= 0; i--)
					{
						if(member_roles_id.includes(role_array[i].id))
						{
							index = role_array.indexOf(role_array[i])
							role_array.splice(index, 1)
						}
						else
						{
							await interaction.member.roles.add(role_array[i])
						}
					}
					if(role_array.length > 0)
					{
						let mention_str = ""
						for (role of role_array)
	                        mention_str += `<@&${role.id}> `
	                    embed = em.getEmbed(`${name}-${realm}`, "Successfully added new roles.", 0x33cc33, data["thumbnail_url"])
	                    embed = embed.addFields(
	                        { name: "Overall Score", value: `${rio}`, inline : true},
	                        { name: "Class", value: `${wow_class}`, inline : true},
	                        { name: '\u200b', value: '\u200b', inline : true },
	                        { name: "<:tank:635165450661003274> Score", value: `${rio_tank}`, inline : true},
	                        { name: "<:heal:635165434282508289> Score", value: `${rio_heal}`, inline : true},
	                        { name: "<:dps:635165411381477378> Score", value: `${rio_dps}`, inline : true},
	                        { name: "Role(s) added:", value: mention_str, inline : true},
	                    )
					}
					else
					{
						embed = em.getEmbed(`${name}-${realm}`, "No new roles to add.", 0xff0000, data["thumbnail_url"])
	                    embed = embed.addFields(
	                        { name: "Overall Score", value: `${rio}`, inline : true},
	                        { name: "Class", value: `${wow_class}`, inline : true},
	                        { name: '\u200b', value: '\u200b', inline : true },
	                    )
					}

                    await interaction.editReply({embeds: [embed]});
                }
        }).catch(
            async function(e) {
				console.log(e)
				desc = `The character ${name}-${realm} doesn't exist in raider.io`
				embed = em.getEmbed(`${name}-${realm} don't exist`, desc, 0xff0000, interaction.member.displayAvatarURL({ dynamic:true }))
				await interaction.editReply({embeds: [embed]});
            }
        );
	},
};
