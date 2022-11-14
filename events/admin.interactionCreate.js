const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if(interaction.isAutocomplete())
		{
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				await command.autocomplete(interaction);
			} catch (error) {
				console.error(error);
			}
		}
		if(interaction.isButton())
		{

			const button = interaction.client.buttons.get(interaction.customId);

		    if(!button) {
				console.error(`No button matching ${interaction.customId} was found.`);
				return;
			}
		    try {
		        await button.execute(interaction);
		    } catch (error) {
		        console.error(error);
		        await interaction.reply({ content: 'There was an error while executing the button script !', ephemeral: true});
		    }
		}
		if(interaction.isChatInputCommand())
		{
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
	            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
		return;

	},
};
