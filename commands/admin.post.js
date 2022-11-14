const {SlashCommandBuilder } = require('discord.js');
const em = require('../utils/embedBuilder');
const util = require('../utils/misc');
const lib = require('../utils/lib');

module.exports =
{
	data: new SlashCommandBuilder()
		.setName('post')
		.setDescription('Create a boost channel.')
        .addSubcommand(subcommand =>
            subcommand
            .setName('mythic')
            .setDescription('Mythic + boosts')
            .addIntegerOption(option =>
                option
    			.setName('number')
    			.setDescription('Number of runs')
    			.setRequired(true)
    		)
            .addIntegerOption(option =>
                option
    			.setName('level')
    			.setDescription('Key level')
    			.setRequired(true)
    		)
            .addIntegerOption(option =>
                option
    			.setName('gold')
    			.setDescription('Total pot for the boost. 500 means 500k')
    			.setRequired(true)
    		)
            .addStringOption(option =>
    			option
    			.setName('realm')
    			.setDescription('Realm of the boost.')
    			.setRequired(true)
    		)
            .addStringOption(option =>
    			option
    			.setName('armor')
    			.setDescription('The armor type of the boost. By default, none.')
    			.setRequired(false)
    			.addChoices(
    				{ name: 'No stack', value: 'none' },
                    { name: 'Plate', value: "plate"},
                    { name: 'Mail', value: "mail"},
                    { name: 'Leather', value: "leather"},
                    { name: 'Cloth', value: "cloth"},
    			)
            )
            .addStringOption(option =>
                option
                .setName('notes')
                .setDescription('Additionnal notes for the boost.')
                .setRequired(false)
            )
            .addStringOption(option =>
    			option
    			.setName('options')
    			.setDescription('The armor type of the boost. By default, none.')
    			.setRequired(false)
    			.addChoices(
    				{ name: 'InHouse', value: 'inhouse' },
                    { name: 'No Advertiser Cut', value: "noadvcut"}
    			)
            )
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('leveling')
            .setDescription('Leveling boosts')
            .addIntegerOption(option =>
                option
    			.setName('gold')
    			.setDescription('Total pot for the boost. 500 means 500k')
    			.setRequired(true)
    		)
            .addStringOption(option =>
    			option
    			.setName('realm')
    			.setDescription('Realm of the boost.')
    			.setRequired(true)
    		)
            .addStringOption(option =>
                option
                .setName('notes')
                .setDescription('Additionnal notes for the boost.')
                .setRequired(false)
            )
            .addStringOption(option =>
    			option
    			.setName('options')
    			.setDescription('The armor type of the boost. By default, none.')
    			.setRequired(false)
    			.addChoices(
    				{ name: 'InHouse', value: 'inhouse' },
                    { name: 'No Advertiser Cut', value: "noadvcut"}
    			)
            )
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('torghast')
            .setDescription('Torghast boosts')
            .addIntegerOption(option =>
                option
                .setName('gold')
                .setDescription('Total pot for the boost. 500 means 500k')
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName('realm')
                .setDescription('Realm of the boost.')
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName('notes')
                .setDescription('Additionnal notes for the boost.')
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
            subcommand
            .setName('pvp')
            .setDescription('PvP boosts')
            .addIntegerOption(option =>
                option
                .setName('gold')
                .setDescription('Total pot for the boost. 500 means 500k')
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName('realm')
                .setDescription('Realm of the boost.')
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName('type')
                .setDescription('2v2 or 3v3')
                .setRequired(true)
                .addChoices(
                    { name: '2v2', value: '2v2' },
                    { name: '3v3', value: "3v3"}
                )
            )
            .addStringOption(option =>
                option
                .setName('notes')
                .setDescription('Additionnal notes for the boost.')
                .setRequired(false)
            )
        ),
	async execute(interaction)
    {
        if (interaction.options.getSubcommand() === 'mythic') {
			await interaction.reply(`Mythic + `);
		}
        if (interaction.options.getSubcommand() === 'leveling') {
			await interaction.reply(`Leveling`);
		}
        if (interaction.options.getSubcommand() === 'torghast') {
			await interaction.reply(`Torghast`);
		}
        if (interaction.options.getSubcommand() === 'pvp') {
			await interaction.reply(`PvP`);
		}
    }
}
