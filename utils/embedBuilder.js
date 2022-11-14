const { EmbedBuilder } = require('discord.js');

module.exports = {
    getEmbed(title, description="", color = 0x0099FF,  thumbnail = "", image =""){
        let exampleEmbed = new EmbedBuilder()
        	.setColor(color)
        	.setTitle(title);
        if(description != "")
        	exampleEmbed = exampleEmbed.setDescription(description);
        if(thumbnail != "")
        	exampleEmbed = exampleEmbed.setThumbnail(thumbnail);
        if(image != "")
            exampleEmbed = exampleEmbed.setImage(image);
    	exampleEmbed = exampleEmbed.setTimestamp()
        	.setFooter(
                { text: "Gino's Mercenaries",
                iconURL: 'https://media.discordapp.net/attachments/1039661812867674213/1039937591170044005/gino.png' }
            );
        return exampleEmbed
    },
    embedFromJson(embed_json)
    {
        return new EmbedBuilder(embed_json)
    }
}
