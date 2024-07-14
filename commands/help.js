module.exports = {
    name: "help",
    description: "Lists all commands",
    execute(message, args) {
        var embed = simpleEmbed('List of all commands', message.author, '');

        client.commands.forEach((cmd) => {
            embed.addFields({ name: cmd.name, value: cmd.description});
        });

        message.channel.send({ embeds: [ embed ]});
    }
}