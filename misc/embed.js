const { embedBuilder, EmbedBuilder } = require('discord.js');

global.simpleEmbed = (title, user, text) => {
    return new EmbedBuilder()
        .setColor(0xffb1e8)
        .setAuthor({
            name: user.username,
            iconURL: user.avatarURL
        })
        .setTitle(title)
        .setDescription(text)
        .setTimestamp()
}