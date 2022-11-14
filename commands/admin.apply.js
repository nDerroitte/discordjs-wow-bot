const fetch = require("node-fetch");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const em = require('../utils/embedBuilder');
const util = require('../utils/misc');
const lib = require('../utils/lib');

module.exports =
{
	data: new SlashCommandBuilder()
		.setName('apply')
		.setDescription('Apply as a MythicPlus booster.')
		.addStringOption(option =>
			option
			.setName('name')
			.setDescription('Please enter your main character name.')
			.setRequired(true)
		)
        .addStringOption(option =>
			option
			.setName('realm')
			.setDescription('Please enter your main character realm.')
			.setRequired(true)
		)
		.setDMPermission(false),
	async execute(interaction)
    {
		await interaction.deferReply({ephemeral: false});
        const region = "eu"
        const realm = util.capitalizeFirstLetter(interaction.options.getString('realm') ?? 'Error');
        const name = util.capitalizeFirstLetter(interaction.options.getString('name') ?? 'Error');
		//const fields = "mythic_plus_scores_by_season%3Acurrent"
		const fields = "mythic_plus_scores_by_season%3Aseason-sl-4"
        url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=${fields}`
		console.log(url)

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
                }
                else
                {
                    role_array = []
                    mention_str = ""
                    role_array.push(util.getRoleByName(interaction.guild, wow_class))
                    role_array.push(util.getRoleByName(interaction.guild, "M+ Prestige"))
					role_array.push(util.getRoleByName(interaction.guild, "Mythic + [EU]"))
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
                    for (role of role_array)
					{
						mention_str += `<@&${role.id}> `
					}
                    embed = em.getEmbed(`${name}-${realm}`, "A moderator will review your request shortly.", 0x33cc33, data["thumbnail_url"])
                    embed = embed.addFields(
                        { name: "Overall Score", value: `${rio}`, inline : true},
                        { name: "Class", value: `${wow_class}`, inline : true},
                        { name: '\u200b', value: '\u200b', inline : true },
                        { name: "<:tank:635165450661003274> Score", value: `${rio_tank}`, inline : true},
                        { name: "<:heal:635165434282508289> Score", value: `${rio_heal}`, inline : true},
                        { name: "<:dps:635165411381477378> Score", value: `${rio_dps}`, inline : true},
                        { name: "Role that would be added:", value: mention_str, inline : true},
                    )
                    const buttons = new ActionRowBuilder().addComponents(
            			new ButtonBuilder()
        					.setCustomId('validate_apply')
        					.setLabel('Validate')
        					.setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
        					.setCustomId('deny_apply')
        					.setLabel('Deny')
        					.setStyle(ButtonStyle.Danger),
            		);
                    await interaction.editReply({embeds: [embed], components: [buttons]});
                }
        }).catch(
            async function(e) {
				console.log(e)
                await interaction.editReply(
                    {
                        content: `The character ${name}-${realm} doesn't exist in raider.io`,
                        ephemeral: false
                    }
                );
            }
        );
		//ephemeral = permet que seul le gars qui a utilisé la commande puisse voir le résultat
	},
};
