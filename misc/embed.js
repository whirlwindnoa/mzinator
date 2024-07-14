const { EmbedBuilder } = require('discord.js');

global.simpleEmbed = (title, user, text, thumbnail = true) => {
    var embed = new EmbedBuilder()
        .setColor(0xffb1e8)
        .setAuthor({
            name: user.username,
            iconURL: user.avatarURL()
        })
        .setTitle(title)
        .setTimestamp()
    
    if (thumbnail) {
        embed = embed.setThumbnail(user.avatarURL());
    }

    if (text) {
        embed = embed.setDescription(text)
    }
    
    return embed;
}